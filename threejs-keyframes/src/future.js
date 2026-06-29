import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

/* ------------------------------------------------------------------ *
 *  컨셉: 미래 도시 투어(Future City Tour) — 사이버펑크 / 스크롤 이동
 *  - 네온 타워 도시(절차적) + 실제 사이버펑크 네온 광고판(사진 텍스처)
 *  - 마우스 휠 "스크롤"로 경로를 따라 앞뒤로 직접 이동
 *  - 마우스로 시선 패럴랙스 · 명소 도착 시 HUD 갱신
 *  - 광고판 이미지만 외부(public/signs), 그 외 전부 코드 생성
 * ------------------------------------------------------------------ */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x070a18, 0.011);

/* ----- 밤하늘 ----- */
(() => {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#02030a');
  g.addColorStop(0.55, '#0a1430');
  g.addColorStop(0.82, '#1d2a5e');
  g.addColorStop(1.0, '#3a2c6e');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 16, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  scene.background = t;
})();

const NEON = ['#16e0ff', '#ff3df0', '#5d6bff', '#39ff9e', '#ff8a3d', '#b14bff'];

/* ----- 투어 경로(닫힌 스플라인) ----- */
const ctrl = [
  [-60, 8, -55], [-20, 6, -64], [24, 10, -50], [58, 14, -18],
  [50, 7, 26], [16, 11, 58], [-26, 9, 52], [-58, 13, 20],
  [-40, 6, -10], [0, 16, 0],
];
const path = new THREE.CatmullRomCurve3(
  ctrl.map((p) => new THREE.Vector3(...p)), true, 'catmullrom', 0.5,
);

const ribbon = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(path.getSpacedPoints(400)),
  new THREE.LineBasicMaterial({ color: 0x16e0ff, transparent: true, opacity: 0.2 }),
);
scene.add(ribbon);

const clearSamples = path.getSpacedPoints(220);

/* ----- 네온 외벽 텍스처 ----- */
function makeNeonFacade(neonHex) {
  const W = 128, H = 512;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const e = document.createElement('canvas');
  e.width = W; e.height = H;
  const ex = e.getContext('2d');
  ex.fillStyle = '#000'; ex.fillRect(0, 0, W, H);

  const wg = ctx.createLinearGradient(0, 0, 0, H);
  wg.addColorStop(0, '#0a0e1c'); wg.addColorStop(1, '#05060f');
  ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);

  for (const sx of [4, W - 9]) {
    ctx.fillStyle = neonHex; ctx.fillRect(sx, 10, 5, H - 20);
    ex.fillStyle = neonHex; ex.fillRect(sx, 10, 5, H - 20);
  }

  const cols = 4, rows = 24, m = 16, gx = 7, gy = 6;
  const cw = (W - m * 2 - gx * (cols - 1)) / cols;
  const ch = (H - m * 2 - gy * (rows - 1)) / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = m + col * (cw + gx);
      const y = m + r * (ch + gy);
      const lit = Math.random() < 0.22;
      const glass = lit ? (Math.random() < 0.5 ? neonHex : '#dff3ff') : '#0d1326';
      ctx.fillStyle = glass; ctx.fillRect(x, y, cw, ch);
      if (lit) { ex.fillStyle = glass; ex.fillRect(x, y, cw, ch); }
    }
  }
  ctx.fillStyle = neonHex; ctx.fillRect(0, 0, W, 4);
  ex.fillStyle = neonHex; ex.fillRect(0, 0, W, 4);

  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
  const emi = new THREE.CanvasTexture(e);
  emi.colorSpace = THREE.SRGBColorSpace;
  return { map, emi };
}

/* ----- 빌딩 배치 ----- */
const geometry = new THREE.BoxGeometry(1, 1, 1);
geometry.translate(0, 0.5, 0);

const GRID = 26, SPACING = 5.2;
const half = ((GRID - 1) * SPACING) / 2;
const CLEAR = 6.5;
const buckets = NEON.map(() => []);
const dummy = new THREE.Object3D();

for (let gx = 0; gx < GRID; gx++) {
  for (let gz = 0; gz < GRID; gz++) {
    const x = gx * SPACING - half + (Math.random() - 0.5) * 1.5;
    const z = gz * SPACING - half + (Math.random() - 0.5) * 1.5;
    let near = false;
    for (let i = 0; i < clearSamples.length; i++) {
      const s = clearSamples[i];
      if ((s.x - x) ** 2 + (s.z - z) ** 2 < CLEAR * CLEAR) { near = true; break; }
    }
    if (near) continue;
    const h = 6 + Math.pow(Math.random(), 1.6) * 46;
    const w = 2.0 + Math.random() * 2.2;
    const d = 2.0 + Math.random() * 2.2;
    dummy.position.set(x, 0, z);
    dummy.scale.set(w, h, d);
    dummy.rotation.y = (Math.random() - 0.5) * 0.5;
    dummy.updateMatrix();
    buckets[(Math.random() * NEON.length) | 0].push(dummy.matrix.clone());
  }
}
NEON.forEach((hex, vi) => {
  const list = buckets[vi];
  if (!list.length) return;
  const { map, emi } = makeNeonFacade(hex);
  const mat = new THREE.MeshStandardMaterial({
    map, emissiveMap: emi, emissive: 0xffffff, emissiveIntensity: 1.7,
    roughness: 0.35, metalness: 0.6,
  });
  const mesh = new THREE.InstancedMesh(geometry, mat, list.length);
  list.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);
});

/* ----- 네온 그리드 바닥 ----- */
(() => {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#03040c'; ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#0e6f86'; ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 256, 256);
  const emi = new THREE.CanvasTexture(c);
  emi.wrapS = emi.wrapT = THREE.RepeatWrapping;
  emi.repeat.set(60, 60);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshStandardMaterial({
      color: 0x05060f, emissive: 0x18b0d0, emissiveMap: emi,
      emissiveIntensity: 1.2, roughness: 0.4, metalness: 0.3,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
})();

/* ----- 실제 사이버펑크 네온 광고판(사진 텍스처) ----- */
const up = new THREE.Vector3(0, 1, 0);
const loader = new THREE.TextureLoader();
const signTextures = [];
for (let i = 1; i <= 10; i++) {
  const t = loader.load(`${import.meta.env.BASE_URL}signs/sign_${i}.jpg`);
  t.colorSpace = THREE.SRGBColorSpace;
  signTextures.push(t);
}

const billboards = [];
function addBillboard(uPos, side) {
  const tex = signTextures[(Math.random() * signTextures.length) | 0];
  const ncol = new THREE.Color(NEON[(Math.random() * NEON.length) | 0]);

  const portrait = Math.random() < 0.6;
  const h = (portrait ? 6 : 4) + Math.random() * 16;
  const w = portrait ? h * (0.62 + Math.random() * 0.18) : h * (1.4 + Math.random() * 0.6);

  const g = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 1.12, h * 1.12),
    new THREE.MeshBasicMaterial({ color: ncol, toneMapped: false, side: THREE.DoubleSide }),
  );
  frame.position.z = -0.08;
  const img = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, side: THREE.DoubleSide }),
  );
  g.add(frame, img);

  const P = path.getPointAt(uPos);
  const A = path.getPointAt((uPos + 0.01) % 1);
  const right = new THREE.Vector3().crossVectors(A.clone().sub(P).normalize(), up).normalize();
  const offset = CLEAR + 1 + Math.random() * 16;
  const height = 3 + Math.random() * 30;
  g.position.copy(P).addScaledVector(right, side * offset);
  g.position.y = height;
  g.lookAt(P.x, height, P.z); // 도로(시청자) 쪽을 향하게
  g.rotateZ((Math.random() - 0.5) * 0.1);

  scene.add(g);
  billboards.push({
    frameMat: frame.material, base: ncol.clone(),
    flicker: Math.random() < 0.35, phase: Math.random() * 10,
  });
}

const SIGN_COUNT = 46;
for (let i = 0; i < SIGN_COUNT; i++) {
  addBillboard(Math.random(), Math.random() < 0.5 ? 1 : -1);
}

/* ----- 홀로 링 랜드마크 + 명소 ----- */
const PLACES = [
  { u: 0.0, name: '네온 게이트', desc: '도시로 들어서는 거대한 발광 관문. 매 순간 색이 흐른다.' },
  { u: 0.18, name: '미러 커널 타워', desc: '거울 유리로 덮인 초고층 데이터 타워 군집.' },
  { u: 0.36, name: '스카이 마켓', desc: '공중에 떠 있는 상업 플랫폼. 광고 홀로그램이 쏟아진다.' },
  { u: 0.54, name: '플럭스 교차로', desc: '여섯 갈래 공중 도로가 교차하는 빛의 인터체인지.' },
  { u: 0.72, name: '바이오 가든 스파이어', desc: '수직 정원으로 뒤덮인 친환경 거주 첨탑.' },
  { u: 0.88, name: '오로라 부두', desc: '도시 외곽의 비행정 정박장. 멀리 오로라가 번진다.' },
];
PLACES.forEach((pl, i) => {
  const p = path.getPointAt(pl.u);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(6 + (i % 3) * 1.5, 0.25, 12, 60),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(NEON[i % NEON.length]), toneMapped: false }),
  );
  ring.position.set(p.x, p.y + 4, p.z);
  ring.rotation.x = Math.PI / 2.4;
  ring.userData.spin = 0.2 + Math.random() * 0.3;
  scene.add(ring);
  pl.ring = ring;
});

/* ----- 공중 교통 ----- */
const TRAFFIC = 600;
const tg = new THREE.BufferGeometry();
const tpos = new Float32Array(TRAFFIC * 3);
const tcol = new Float32Array(TRAFFIC * 3);
const tvel = new Float32Array(TRAFFIC);
const cWarm = new THREE.Color('#ff5a3c');
const cCool = new THREE.Color('#9ad7ff');
for (let i = 0; i < TRAFFIC; i++) {
  tpos[i * 3] = (Math.random() - 0.5) * 280;
  tpos[i * 3 + 1] = 4 + Math.random() * 40;
  tpos[i * 3 + 2] = (Math.random() - 0.5) * 280;
  const dir = Math.random() < 0.5;
  tvel[i] = (dir ? 1 : -1) * (12 + Math.random() * 26);
  const col = dir ? cWarm : cCool;
  tcol[i * 3] = col.r; tcol[i * 3 + 1] = col.g; tcol[i * 3 + 2] = col.b;
}
tg.setAttribute('position', new THREE.BufferAttribute(tpos, 3));
tg.setAttribute('color', new THREE.BufferAttribute(tcol, 3));
const traffic = new THREE.Points(tg, new THREE.PointsMaterial({
  size: 0.7, vertexColors: true, transparent: true, opacity: 0.9,
  blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(traffic);

/* ----- 별 ----- */
(() => {
  const g = new THREE.BufferGeometry();
  const n = 1200; const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    p[i * 3] = (Math.random() - 0.5) * 600;
    p[i * 3 + 1] = 60 + Math.random() * 200;
    p[i * 3 + 2] = (Math.random() - 0.5) * 600;
  }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.6, color: 0x8fa6d0 })));
})();

/* ----- 조명 ----- */
scene.add(new THREE.HemisphereLight(0x3a4f8a, 0x0a0a18, 0.5));
const key = new THREE.DirectionalLight(0x6a7fff, 0.5);
key.position.set(-1, 2, 1);
scene.add(key);

/* ----- 카메라 / 블룸 ----- */
const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 1200);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), 0.85, 0.6, 0.0,
));

/* ----- 이동/줌 상태 / HUD ----- */
let u = 0;             // 경로 진행도(무한, wrap 해서 샘플)
let speed = 0.012;     // 진행 속도(u/초) — 방향키 스로틀, 초기값=데모 전진
const MAX_SPEED = 0.085;
const ACCEL = 0.05;
let fov = 68;          // 현재 FOV
let targetFov = 68;    // 목표 FOV(스크롤 줌)
let curPlace = -1;
const keys = Object.create(null);
const mouse = new THREE.Vector2(0, 0);

const elName = document.getElementById('placeName');
const elDesc = document.getElementById('placeDesc');
const elCount = document.getElementById('counter');
const elFill = document.getElementById('barFill');
const elSpeed = document.getElementById('speed');

const wrap = (x) => ((x % 1) + 1) % 1;
function currentPlaceIndex(uu) {
  let idx = 0;
  for (let i = 0; i < PLACES.length; i++) if (uu >= PLACES[i].u) idx = i;
  return idx;
}
function showPlace(i) {
  const pl = PLACES[i];
  elName.classList.add('swap'); elDesc.classList.add('swap');
  setTimeout(() => {
    elCount.textContent =
      `STOP ${String(i + 1).padStart(2, '0')} / ${String(PLACES.length).padStart(2, '0')}`;
    elName.textContent = pl.name;
    elDesc.textContent = pl.desc;
    elName.classList.remove('swap'); elDesc.classList.remove('swap');
  }, 280);
}

// 스크롤 → 확대/축소(FOV 줌). 위로 스크롤=확대, 아래로=축소
window.addEventListener('wheel', (e) => {
  targetFov = Math.max(25, Math.min(95, targetFov + e.deltaY * 0.03));
}, { passive: true });

// 방향키 → 속도(스로틀). ↑/→ 가속, ↓/← 감속(후진), Space 정지
const SPEED_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (SPEED_KEYS.includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
});

/* ----- 루프 ----- */
const clock = new THREE.Clock();
const tmpPos = new THREE.Vector3();
const tmpAhead = new THREE.Vector3();
const fwd = new THREE.Vector3();
const right = new THREE.Vector3();
const upv = new THREE.Vector3();
const target = new THREE.Vector3();

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);

  // 방향키 스로틀 → 속도
  if (keys['ArrowUp'] || keys['ArrowRight']) speed += ACCEL * dt;
  if (keys['ArrowDown'] || keys['ArrowLeft']) speed -= ACCEL * dt;
  if (keys['Space']) speed *= 1 - Math.min(1, dt * 6); // 브레이크
  speed = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, speed));
  u += speed * dt;

  // 스크롤 줌(FOV) 부드럽게 적용
  fov += (targetFov - fov) * Math.min(1, dt * 6);
  if (Math.abs(camera.fov - fov) > 0.001) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }

  const pu = wrap(u);
  path.getPointAt(pu, tmpPos);
  path.getPointAt(wrap(u + 0.01), tmpAhead);

  fwd.copy(tmpAhead).sub(tmpPos).normalize();
  right.crossVectors(fwd, up).normalize();
  upv.crossVectors(right, fwd).normalize();

  target.copy(tmpPos).add(fwd)
    .addScaledVector(right, mouse.x * 0.6)
    .addScaledVector(upv, -mouse.y * 0.4);

  const bob = Math.sin(clock.elapsedTime * 1.6) * 0.15;
  camera.position.copy(tmpPos).addScaledVector(upv, bob);
  camera.up.copy(upv);
  camera.lookAt(target);

  const pi = currentPlaceIndex(pu);
  if (pi !== curPlace) { curPlace = pi; showPlace(pi); }
  elFill.style.width = `${(pu * 100).toFixed(1)}%`;

  // 속도/줌 HUD
  if (elSpeed) {
    const pct = Math.round((speed / MAX_SPEED) * 100);
    const arrow = pct > 1 ? '▲' : pct < -1 ? '▼' : '■';
    elSpeed.textContent = `${arrow} SPEED ${pct >= 0 ? '+' : ''}${pct}%  ·  ZOOM ${Math.round(fov)}°`;
  }

  // 광고판 네온 프레임 깜빡임
  const tt = clock.elapsedTime;
  for (const b of billboards) {
    if (!b.flicker) continue;
    const f = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(tt * 12 + b.phase))
      * (Math.random() < 0.04 ? 0.3 : 1);
    b.frameMat.color.copy(b.base).multiplyScalar(f);
  }

  PLACES.forEach((pl) => { if (pl.ring) pl.ring.rotation.z += pl.ring.userData.spin * dt; });

  const pos = tg.attributes.position.array;
  for (let i = 0; i < TRAFFIC; i++) {
    pos[i * 3] += tvel[i] * dt;
    if (pos[i * 3] > 150) pos[i * 3] = -150;
    else if (pos[i * 3] < -150) pos[i * 3] = 150;
  }
  tg.attributes.position.needsUpdate = true;

  composer.render();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
