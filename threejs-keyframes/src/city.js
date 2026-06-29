import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

/* ------------------------------------------------------------------ *
 *  컨셉: 절차적 도시(Procedural City) — 황혼 야경 / 다양한 아파트 외벽
 *  - 8종의 서로 다른 외벽 텍스처(유리타워·벽돌·콘크리트·발코니형 등)를
 *    캔버스로 생성하고, 빌딩마다 무작위로 다른 외벽을 입힘
 *  - 변종별 InstancedMesh 1개 → 다양함과 성능을 동시에 확보
 *  - 황혼 그라데이션 하늘 + 안개 + UnrealBloom 발광
 *  - 외부 에셋 없이 전부 코드 생성 → 오프라인 동작
 * ------------------------------------------------------------------ */

const GRID = 22; // 한 변당 빌딩 수
const SPACING = 2.4; // 빌딩 간격

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

/* ----- 황혼 그라데이션 하늘 ----- */
function makeSkyTexture() {
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#241a4d');
  g.addColorStop(0.45, '#5b3a82');
  g.addColorStop(0.7, '#c0588b');
  g.addColorStop(0.88, '#ff9d5c');
  g.addColorStop(1.0, '#ffd9a0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
scene.background = makeSkyTexture();
scene.fog = new THREE.Fog(0x6a4a82, 18, 70);

/* ----- 색 밝기 조절 헬퍼 ----- */
function shade(hex, f) {
  const c = new THREE.Color(hex);
  c.r = Math.min(1, c.r * f);
  c.g = Math.min(1, c.g * f);
  c.b = Math.min(1, c.b * f);
  return '#' + c.getHexString();
}

/* ----- 외벽 텍스처 생성기 -----
 * 옵션에 따라 창문 격자, 발코니, 유리/패널 스타일을 그려
 * map(외벽)과 emissive(불 켜진 창문) 두 장을 반환 */
const LIT = ['#ffd27a', '#ffba5c', '#9ad7ff', '#fff1c9', '#ffcf99'];

function makeFacade(o) {
  const W = 256;
  const H = 512;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');

  const e = document.createElement('canvas');
  e.width = W;
  e.height = H;
  const ex = e.getContext('2d');
  ex.fillStyle = '#000';
  ex.fillRect(0, 0, W, H);

  // 외벽 바탕(세로 그라데이션)
  const wg = ctx.createLinearGradient(0, 0, 0, H);
  wg.addColorStop(0, shade(o.wall, 1.12));
  wg.addColorStop(1, shade(o.wall, 0.88));
  ctx.fillStyle = wg;
  ctx.fillRect(0, 0, W, H);

  const margin = o.margin ?? 14;
  const gapx = o.gapx ?? 8;
  const gapy = o.gapy ?? 10;
  const { cols, rows } = o;
  const cellW = (W - margin * 2 - gapx * (cols - 1)) / cols;
  const cellH = (H - margin * 2 - gapy * (rows - 1)) / rows;
  const litColors = o.litColors ?? LIT;

  for (let r = 0; r < rows; r++) {
    const y = margin + r * (cellH + gapy);
    const winH = o.balcony ? cellH * 0.6 : cellH;

    // 발코니 슬래브
    if (o.balcony) {
      ctx.fillStyle = o.balconyColor;
      ctx.fillRect(margin - 5, y + winH + 1, W - margin * 2 + 10, cellH - winH);
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      for (let bx = margin; bx < W - margin; bx += 7) {
        ctx.fillRect(bx, y + winH + 3, 2, cellH - winH - 4);
      }
    }

    for (let col = 0; col < cols; col++) {
      const x = margin + col * (cellW + gapx);
      const lit = Math.random() < o.litProb;

      // 창틀
      ctx.fillStyle = o.frame;
      ctx.fillRect(x - 2, y - 2, cellW + 4, winH + 4);

      // 유리(불 켜짐/꺼짐 또는 패널)
      let glass;
      if (lit) glass = litColors[(Math.random() * litColors.length) | 0];
      else if (o.panel) glass = o.panel[(Math.random() * o.panel.length) | 0];
      else glass = o.winColor;
      ctx.fillStyle = glass;
      ctx.fillRect(x, y, cellW, winH);

      // 유리 반사 하이라이트
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(x, y, cellW * 0.42, winH);

      if (lit) {
        ex.fillStyle = glass;
        ex.fillRect(x, y, cellW, winH);
      }
    }
  }

  // 때/얼룩 노이즈로 사실감
  for (let i = 0; i < 260; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.06})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const emi = new THREE.CanvasTexture(e);
  emi.colorSpace = THREE.SRGBColorSpace;
  return { map, emi };
}

/* ----- 8종 외벽 변종 정의 ----- */
const VARIANTS = [
  { name: 'glass-blue', wall: '#2a3b5c', cols: 5, rows: 14, winColor: '#6f93c4', frame: '#1d2b45', litProb: 0.26, metalness: 0.6, roughness: 0.25 },
  { name: 'brick-balcony', wall: '#9c5b40', cols: 4, rows: 12, balcony: true, balconyColor: '#c8a27a', winColor: '#2a2e3a', frame: '#5e3826', litProb: 0.42, metalness: 0.05, roughness: 0.85 },
  { name: 'white-modern', wall: '#d8dde3', cols: 6, rows: 16, winColor: '#43506a', frame: '#b9c0c8', litProb: 0.3, metalness: 0.2, roughness: 0.6 },
  { name: 'concrete-gray', wall: '#8a8f96', cols: 7, rows: 18, gapx: 6, gapy: 7, winColor: '#38414e', frame: '#6d727a', litProb: 0.2, metalness: 0.1, roughness: 0.9 },
  { name: 'green-office', wall: '#25433f', cols: 5, rows: 15, winColor: '#4f9d8e', frame: '#16302c', litProb: 0.28, metalness: 0.5, roughness: 0.3 },
  { name: 'korean-apt', wall: '#c9bda0', cols: 4, rows: 13, balcony: true, balconyColor: '#ddd2bb', winColor: '#34506b', frame: '#8f8367', litProb: 0.46, metalness: 0.05, roughness: 0.8 },
  { name: 'dark-gold', wall: '#20232b', cols: 5, rows: 16, winColor: '#2c2f3a', frame: '#14161c', litColors: ['#ffd27a', '#ffba5c', '#ffe2a8'], litProb: 0.36, metalness: 0.4, roughness: 0.35 },
  { name: 'panel-pop', wall: '#3c4768', cols: 5, rows: 12, panel: ['#5b6b9a', '#8c5f8f', '#5f8c86', '#b08a5a', '#7a8fb8'], winColor: '#5b6b9a', frame: '#2c3346', litProb: 0.3, metalness: 0.3, roughness: 0.5 },
];

const geometry = new THREE.BoxGeometry(1, 1, 1);
geometry.translate(0, 0.5, 0); // 바닥(y=0) 기준 위로 자람

/* ----- 빌딩 배치(변종별 버킷에 모음) ----- */
const buckets = VARIANTS.map(() => []);
const dummy = new THREE.Object3D();
const half = ((GRID - 1) * SPACING) / 2;

for (let gx = 0; gx < GRID; gx++) {
  for (let gz = 0; gz < GRID; gz++) {
    const x = gx * SPACING - half;
    const z = gz * SPACING - half;

    const distFalloff = 1 - Math.hypot(x, z) / (half * 1.6);
    const h = 1.5 + Math.random() * 9 * Math.max(0.25, distFalloff);
    const w = 1.2 + Math.random() * 0.6;
    const d = 1.2 + Math.random() * 0.6;

    dummy.position.set(x, 0, z);
    dummy.scale.set(w, h, d);
    dummy.rotation.y = (Math.random() - 0.5) * (Math.PI / 6);
    dummy.updateMatrix();

    const vi = (Math.random() * VARIANTS.length) | 0;
    buckets[vi].push(dummy.matrix.clone());
  }
}

/* ----- 변종별 InstancedMesh 생성 ----- */
VARIANTS.forEach((v, vi) => {
  const list = buckets[vi];
  if (list.length === 0) return;

  const { map, emi } = makeFacade(v);
  const material = new THREE.MeshStandardMaterial({
    map,
    emissiveMap: emi,
    emissive: 0xffffff,
    emissiveIntensity: 1.4,
    roughness: v.roughness ?? 0.7,
    metalness: v.metalness ?? 0.2,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, list.length);
  list.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);
});

/* ----- 바닥 ----- */
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x141226, roughness: 1 }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
scene.add(ground);

/* ----- 조명 ----- */
scene.add(new THREE.HemisphereLight(0xffb27a, 0x1a1030, 0.65));
const dir = new THREE.DirectionalLight(0xffd9a0, 0.85);
dir.position.set(-10, 14, 6);
scene.add(dir);

/* ----- 카메라 / 컨트롤 ----- */
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.set(20, 12, 24);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 8;
controls.maxDistance = 55;
controls.maxPolarAngle = Math.PI / 2.15;
controls.target.set(0, 3, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;

/* ----- 포스트프로세싱(블룸) ----- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(
  new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.65,
    0.5,
    0.25,
  ),
);

/* ----- 루프 / 리사이즈 ----- */
function animate() {
  controls.update();
  composer.render();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
