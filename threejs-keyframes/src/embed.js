import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

/* ------------------------------------------------------------------ *
 *  CSS3D 데모 메뉴 — 블로그 프로젝트 영역에 인라인으로 마운트되는 버전
 *  - 전체 화면(window)이 아니라 #threejs-gallery 컨테이너 크기에 맞춤
 *  - 포인터 이벤트를 컨테이너 안으로 한정(페이지 스크롤/클릭과 충돌 방지)
 *  - 카드 클릭 → 해당 데모를 새 탭으로 오픈
 * ------------------------------------------------------------------ */

const container = document.getElementById('threejs-gallery');
if (container) initGallery(container);

function initGallery(root) {
  const BASE = root.dataset.base || '/threejs/';

  const DEMOS = [
    { sym: 'Gx', full: 'Galaxy', desc: '나선 은하 파티클', href: 'galaxy.html', c: '255,154,60' },
    { sym: 'Ct', full: 'City', desc: '황혼 야경 도시', href: 'city.html', c: '192,108,170' },
    { sym: 'Fu', full: 'Future', desc: '네온 미래도시 투어', href: 'future.html', c: '22,224,255' },
    { sym: 'He', full: 'Heli', desc: '헬기 비행 시뮬레이터', href: 'heli.html', c: '255,216,107' },
  ];

  injectStyles();

  // --- 내부 DOM 구성 (렌더 레이어 + 버튼 바) ---
  const stage = document.createElement('div');
  stage.className = 'tjg-stage';
  root.appendChild(stage);

  const menu = document.createElement('div');
  menu.className = 'tjg-menu';
  root.appendChild(menu);

  const w = () => root.clientWidth;
  const h = () => root.clientHeight;

  const camera = new THREE.PerspectiveCamera(40, w() / h(), 1, 10000);
  camera.position.z = 1800;

  const scene = new THREE.Scene();
  const objects = [];
  const targets = { table: [], sphere: [], helix: [], grid: [] };

  const N = DEMOS.length;
  const SPACING = 220;

  for (let i = 0; i < N; i++) {
    const demo = DEMOS[i];

    const el = document.createElement('div');
    el.className = 'element';
    el.dataset.href = BASE + demo.href;
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

    const t = new THREE.Object3D();
    t.position.x = i * SPACING - ((N - 1) * SPACING) / 2;
    targets.table.push(t);
  }

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

  for (let i = 0, l = objects.length; i < l; i++) {
    const theta = i * 0.9 + Math.PI;
    const y = -(i * 90) + ((l - 1) * 90) / 2;
    const o = new THREE.Object3D();
    o.position.setFromCylindricalCoords(380, theta, y);
    vector.set(o.position.x * 2, o.position.y, o.position.z * 2);
    o.lookAt(vector);
    targets.helix.push(o);
  }

  for (let i = 0; i < objects.length; i++) {
    const o = new THREE.Object3D();
    o.position.x = (i % 2) * 280 - 140;
    o.position.y = -Math.floor(i / 2) * 280 + 140;
    targets.grid.push(o);
  }

  const renderer = new CSS3DRenderer();
  renderer.setSize(w(), h());
  stage.appendChild(renderer.domElement);

  const controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 600;
  controls.maxDistance = 4000;
  controls.rotateSpeed = 0.6;
  controls.staticMoving = true;
  controls.noZoom = true; // 페이지 스크롤과 충돌 방지
  controls.noPan = true;
  controls.addEventListener('change', render);

  // 버튼 바
  [['TABLE', 'table'], ['SPHERE', 'sphere'], ['HELIX', 'helix'], ['GRID', 'grid']].forEach(([label, key]) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.addEventListener('click', () => transform(targets[key], 1600));
    menu.appendChild(btn);
  });

  // 드래그/클릭 구분 → 클릭이면 데모를 새 탭으로 오픈
  let downPos = null;
  let dragDist = 0;
  stage.addEventListener('pointerdown', (e) => { downPos = { x: e.clientX, y: e.clientY }; dragDist = 0; });
  stage.addEventListener('pointermove', (e) => {
    if (downPos) dragDist = Math.max(dragDist, Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y));
  });
  stage.addEventListener('pointerup', (e) => {
    if (downPos && dragDist < 6) {
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const card = hit && hit.closest('.element');
      if (card && card.dataset.href) window.open(card.dataset.href, '_blank', 'noopener');
    }
    downPos = null;
  });

  // 리사이즈 대응
  const ro = new ResizeObserver(() => {
    if (!w() || !h()) return;
    camera.aspect = w() / h();
    camera.updateProjectionMatrix();
    renderer.setSize(w(), h());
    controls.handleResize();
    render();
  });
  ro.observe(root);

  // 갤러리가 뷰포트에 들어올 때 진입 애니메이션 시작 + 렌더 루프 가동.
  // 화면 밖이면 루프를 멈춰 자원을 아낀다.
  let rafId = null;
  let entered = false;
  function startLoop() { if (rafId === null) animate(); }
  function stopLoop() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        startLoop();
        if (!entered) { entered = true; transform(targets.table, 2000); }
      } else {
        stopLoop();
      }
    }
  }, { threshold: 0.15 });
  io.observe(root);

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

  function animate() {
    rafId = requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function injectStyles() {
    if (document.getElementById('tjg-style')) return;
    const s = document.createElement('style');
    s.id = 'tjg-style';
    s.textContent = `
      #threejs-gallery { color:#fff; font-family:'Helvetica Neue', system-ui, sans-serif; }
      #threejs-gallery .tjg-stage { position:absolute; inset:0; }
      #threejs-gallery .element {
        width:160px; height:220px; box-sizing:border-box;
        border:1px solid rgba(120,200,255,0.3); border-radius:8px;
        text-align:center; cursor:pointer; backdrop-filter:blur(1px);
        transition:box-shadow .18s, transform .18s;
      }
      #threejs-gallery .element:hover { transform:scale(1.05); }
      #threejs-gallery .element .number { position:absolute; top:16px; right:18px; font-size:13px; color:rgba(220,240,255,0.6); }
      #threejs-gallery .element .symbol { position:absolute; top:52px; left:0; right:0; font-size:58px; font-weight:700; color:rgba(255,255,255,0.95); }
      #threejs-gallery .element .details { position:absolute; bottom:20px; left:0; right:0; font-size:12px; line-height:1.6; color:rgba(210,232,255,0.85); letter-spacing:.5px; }
      #threejs-gallery .element .details b { font-size:15px; color:#fff; }
      #threejs-gallery .element .details .enter { font-size:11px; color:rgba(160,210,255,0.9); letter-spacing:2px; }
      #threejs-gallery .tjg-menu { position:absolute; bottom:14px; left:0; width:100%; text-align:center; z-index:10; }
      #threejs-gallery .tjg-menu button {
        color:#cfe6ff; background:rgba(10,20,40,0.5);
        border:1px solid rgba(120,200,255,0.4); border-radius:6px;
        padding:8px 16px; margin:0 4px; font-size:12px; letter-spacing:2px;
        cursor:pointer; backdrop-filter:blur(4px); transition:all .15s;
      }
      #threejs-gallery .tjg-menu button:hover { color:#fff; border-color:#fff; background:rgba(40,80,140,0.5); }
    `;
    document.head.appendChild(s);
  }
}
