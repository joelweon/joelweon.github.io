import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

/* ------------------------------------------------------------------ *
 *  컨셉: 절차적 은하(Galaxy)
 *  - 수만 개의 파티클을 나선 팔(spiral arm) 형태로 배치
 *  - 중심은 뜨겁게(insideColor), 바깥은 차갑게(outsideColor) 그라데이션
 *  - 천천히 회전 + UnrealBloom 으로 별빛 발광
 *  - 외부 에셋 없이 전부 코드로 생성 → 오프라인 동작
 * ------------------------------------------------------------------ */

const params = {
  count: 120000,
  radius: 6,
  branches: 5,
  spin: 1.1,
  randomness: 0.45,
  randomnessPower: 3,
  insideColor: '#ff9a3c',
  outsideColor: '#3a6bff',
  rotationSpeed: 0.08,
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060d);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(4, 4, 6);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 18;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.4;

/* ----- 은하 생성 ----- */
let galaxy = null;

function generateGalaxy() {
  if (galaxy) {
    galaxy.geometry.dispose();
    galaxy.material.dispose();
    scene.remove(galaxy);
  }

  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  const inside = new THREE.Color(params.insideColor);
  const outside = new THREE.Color(params.outsideColor);

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * params.radius;
    const branchAngle =
      ((i % params.branches) / params.branches) * Math.PI * 2;
    const spinAngle = radius * params.spin;

    const rand = () =>
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rand();
    positions[i3 + 1] = rand() * 0.5;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rand();

    const mixed = inside.clone().lerp(outside, radius / params.radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.025,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  galaxy = new THREE.Points(geometry, material);
  scene.add(galaxy);
}

generateGalaxy();

/* ----- 배경 별 ----- */
const starGeo = new THREE.BufferGeometry();
const starCount = 1500;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
  starPos[i] = (Math.random() - 0.5) * 60;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({ size: 0.04, color: 0x8899bb }),
);
scene.add(stars);

/* ----- 포스트프로세싱(블룸) ----- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.9, // strength
  0.6, // radius
  0.1, // threshold
);
composer.addPass(bloom);

/* ----- 루프 / 리사이즈 ----- */
const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  if (galaxy) galaxy.rotation.y = t * params.rotationSpeed;
  stars.rotation.y = t * 0.01;
  controls.update();
  composer.render();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
