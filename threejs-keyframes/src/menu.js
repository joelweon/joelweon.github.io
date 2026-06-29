import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

/* ------------------------------------------------------------------ *
 *  CSS3D 데모 메뉴 — 실제 보유 페이지만 카드로 표시
 *  - 카드 클릭(드래그 아님) → 해당 데모 페이지로 이동
 *  - TABLE / SPHERE / HELIX / GRID 배열 모핑
 * ------------------------------------------------------------------ */

const DEMOS = [
  { sym: 'Gx', full: 'Galaxy', desc: '나선 은하 파티클', href: 'galaxy.html', c: '255,154,60' },
  { sym: 'Ct', full: 'City', desc: '황혼 야경 도시', href: 'city.html', c: '192,108,170' },
  { sym: 'Fu', full: 'Future', desc: '네온 미래도시 투어', href: 'future.html', c: '22,224,255' },
  { sym: 'He', full: 'Heli', desc: '헬기 비행 시뮬레이터', href: 'heli.html', c: '255,216,107' },
];

let camera, scene, renderer, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

// 드래그와 클릭(탭) 구분 → TrackballControls가 click 이벤트를 가로채므로
// pointerup 시점에 커서 아래 카드를 직접 찾아 이동한다.
let downPos = null;
let dragDist = 0;
window.addEventListener('pointerdown', (e) => { downPos = { x: e.clientX, y: e.clientY }; dragDist = 0; });
window.addEventListener('pointermove', (e) => {
  if (downPos) dragDist = Math.max(dragDist, Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y));
});
window.addEventListener('pointerup', (e) => {
  if (downPos && dragDist < 6) {
    const hit = document.elementFromPoint(e.clientX, e.clientY);
    const card = hit && hit.closest('.element');
    if (card && card.dataset.href) {
      window.location.href = card.dataset.href;
      return;
    }
  }
  downPos = null;
});

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1800;

  scene = new THREE.Scene();

  const N = DEMOS.length;
  const SPACING = 220;

  for (let i = 0; i < N; i++) {
    const demo = DEMOS[i];

    const el = document.createElement('div');
    el.className = 'element';
    el.dataset.href = demo.href;
    el.style.backgroundColor = `rgba(${demo.c},0.18)`;
    el.style.borderColor = `rgba(${demo.c},0.5)`;
    el.style.boxShadow = `0 0 18px rgba(${demo.c},0.45)`;

    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = String(i + 1).padStart(2, '0');
    el.appendChild(number);

    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = demo.sym;
    symbol.style.textShadow = `0 0 14px rgba(${demo.c},0.95)`;
    el.appendChild(symbol);

    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `<b>${demo.full}</b><br>${demo.desc}<br><span class="enter">ENTER →</span>`;
    el.appendChild(details);

    const obj = new CSS3DObject(el);
    obj.position.set(
      Math.random() * 3000 - 1500,
      Math.random() * 3000 - 1500,
      Math.random() * 3000 - 1500,
    );
    scene.add(obj);
    objects.push(obj);

    // TABLE: 가운데 정렬된 한 줄
    const t = new THREE.Object3D();
    t.position.x = i * SPACING - ((N - 1) * SPACING) / 2;
    t.position.y = 0;
    targets.table.push(t);
  }

  // SPHERE
  const vector = new THREE.Vector3();
  for (let i = 0, l = objects.length; i < l; i++) {
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;
    const o = new THREE.Object3D();
    o.position.setFromSphericalCoords(450, phi, theta);
    vector.copy(o.position).multiplyScalar(2);
    o.lookAt(vector);
    targets.sphere.push(o);
  }

  // HELIX
  for (let i = 0, l = objects.length; i < l; i++) {
    const theta = i * 0.9 + Math.PI;
    const y = -(i * 90) + ((l - 1) * 90) / 2;
    const o = new THREE.Object3D();
    o.position.setFromCylindricalCoords(380, theta, y);
    vector.set(o.position.x * 2, o.position.y, o.position.z * 2);
    o.lookAt(vector);
    targets.helix.push(o);
  }

  // GRID (2열)
  for (let i = 0; i < objects.length; i++) {
    const o = new THREE.Object3D();
    o.position.x = (i % 2) * 280 - 140;
    o.position.y = -Math.floor(i / 2) * 280 + 140;
    o.position.z = 0;
    targets.grid.push(o);
  }

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 600;
  controls.maxDistance = 4000;
  controls.rotateSpeed = 0.6;
  controls.staticMoving = true;
  controls.addEventListener('change', render);

  document.getElementById('btn-table').addEventListener('click', () => transform(targets.table, 1600));
  document.getElementById('btn-sphere').addEventListener('click', () => transform(targets.sphere, 1600));
  document.getElementById('btn-helix').addEventListener('click', () => transform(targets.helix, 1600));
  document.getElementById('btn-grid').addEventListener('click', () => transform(targets.grid, 1600));

  transform(targets.table, 2000);

  window.addEventListener('resize', onResize);
}

function transform(t, duration) {
  TWEEN.removeAll();
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    const target = t[i];
    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut).start();
    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut).start();
  }
  new TWEEN.Tween({}).to({}, duration * 2).onUpdate(render).start();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}
