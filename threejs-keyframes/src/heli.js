import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  헬리콥터 시뮬레이터 (아케이드 물리)
 *  - 헬기는 프리미티브로 절차 생성(동체/테일붐/메인·테일로터/스키드)
 *  - 컬렉티브(W/S 상승) · 사이클릭(화살표 기울임) · 페달(A/D 요)
 *  - 체이스/콕핏 카메라(C) · 도시 위 비행 · 계기판 HUD
 *  - 외부 에셋 없이 전부 코드 생성 → 오프라인 동작
 * ------------------------------------------------------------------ */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(loop);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

/* ----- 하늘(석양 그라데이션) + 안개 ----- */
(() => {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#1f4e8c');
  g.addColorStop(0.5, '#5b8fc7');
  g.addColorStop(0.78, '#c9a98b');
  g.addColorStop(1.0, '#ffd9a0');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 16, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  scene.background = t;
})();
scene.fog = new THREE.Fog(0x9fb6cf, 120, 620);

/* ----- 조명 ----- */
scene.add(new THREE.HemisphereLight(0xcfe6ff, 0x4a4636, 0.85));
const sun = new THREE.DirectionalLight(0xfff0d8, 1.2);
sun.position.set(80, 140, 40);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 10;
sun.shadow.camera.far = 400;
const sc = 140;
sun.shadow.camera.left = -sc; sun.shadow.camera.right = sc;
sun.shadow.camera.top = sc; sun.shadow.camera.bottom = -sc;
scene.add(sun);

/* ----- 창문 텍스처 ----- */
function makeWindowTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#3a4456'; ctx.fillRect(0, 0, 64, 128);
  const cols = 4, rows = 9, pad = 4;
  const wW = (64 - pad * (cols + 1)) / cols;
  const wH = (128 - pad * (rows + 1)) / rows;
  const lit = ['#cfe2ff', '#9fb6d6', '#e8eef7', '#8aa0c0'];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = lit[(Math.random() * lit.length) | 0];
      ctx.fillRect(pad + col * (wW + pad), pad + r * (wH + pad), wW, wH);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ----- 도시(인스턴스 빌딩) ----- */
const GROUND_Y = 0;
const CITY_GRID = 40;
const CITY_SPACING = 14;
const CITY_HALF = ((CITY_GRID - 1) * CITY_SPACING) / 2;
const HELIPAD_CLEAR = 28; // 중앙 헬리패드 주변은 비움

// 승객 픽업/배달 패드 위치(서로 떨어뜨려 배치)
const PAD_COUNT = 8;
const PAD_CLEAR = 16;
const padPos = [];
while (padPos.length < PAD_COUNT) {
  const ang = Math.random() * Math.PI * 2;
  const r = 48 + Math.random() * 150;
  const x = Math.cos(ang) * r;
  const z = Math.sin(ang) * r;
  if (padPos.some((p) => Math.hypot(p.x - x, p.z - z) < 55)) continue;
  padPos.push(new THREE.Vector3(x, GROUND_Y, z));
}

const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
buildingGeo.translate(0, 0.5, 0);
const buildingMat = new THREE.MeshStandardMaterial({
  map: makeWindowTexture(), roughness: 0.8, metalness: 0.1,
});

const transforms = [];
const dummy = new THREE.Object3D();
const col = new THREE.Color();
const colors = [];
for (let gx = 0; gx < CITY_GRID; gx++) {
  for (let gz = 0; gz < CITY_GRID; gz++) {
    const x = gx * CITY_SPACING - CITY_HALF + (Math.random() - 0.5) * 4;
    const z = gz * CITY_SPACING - CITY_HALF + (Math.random() - 0.5) * 4;
    if (Math.hypot(x, z) < HELIPAD_CLEAR) continue;
    if (padPos.some((p) => Math.hypot(p.x - x, p.z - z) < PAD_CLEAR)) continue;
    const h = 6 + Math.pow(Math.random(), 1.7) * 58;
    const w = 5 + Math.random() * 5;
    const d = 5 + Math.random() * 5;
    dummy.position.set(x, GROUND_Y, z);
    dummy.scale.set(w, h, d);
    dummy.rotation.y = (Math.random() - 0.5) * 0.4;
    dummy.updateMatrix();
    transforms.push(dummy.matrix.clone());
    col.setHSL(0.58 + Math.random() * 0.08, 0.18, 0.45 + Math.random() * 0.22);
    colors.push(col.clone());
  }
}
const city = new THREE.InstancedMesh(buildingGeo, buildingMat, transforms.length);
city.castShadow = true; city.receiveShadow = true;
transforms.forEach((m, i) => { city.setMatrixAt(i, m); city.setColorAt(i, colors[i]); });
city.instanceMatrix.needsUpdate = true;
scene.add(city);

/* ----- 지면 + 헬리패드 ----- */
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshStandardMaterial({ color: 0x39424f, roughness: 1 }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = GROUND_Y;
ground.receiveShadow = true;
scene.add(ground);

(() => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#20262e'; ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#f2c63a'; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(128, 128, 96, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#f2c63a'; ctx.font = 'bold 150px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('H', 128, 138);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const pad = new THREE.Mesh(
    new THREE.CircleGeometry(14, 48),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }),
  );
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = GROUND_Y + 0.05;
  pad.receiveShadow = true;
  scene.add(pad);
})();

/* ----- 승객 패드 / 사람 / 로케이터 빔 ----- */
function makePerson() {
  const g = new THREE.Group();
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.55, 1.6, 12),
    new THREE.MeshStandardMaterial({ color: 0x2ec27e, roughness: 0.7 }),
  );
  torso.position.y = 1.4; torso.castShadow = true;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0xe6b88f, roughness: 0.8 }),
  );
  head.position.y = 2.5; head.castShadow = true;
  g.add(torso, head);
  g.scale.setScalar(1.7);
  return g;
}

const pads = [];
padPos.forEach((p) => {
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 8, 0.3, 32),
    new THREE.MeshStandardMaterial({ color: 0x18222e, emissive: 0x0c3a44, emissiveIntensity: 0.6, roughness: 0.6 }),
  );
  disc.position.set(p.x, GROUND_Y + 0.15, p.z);
  disc.receiveShadow = true;
  scene.add(disc);

  const person = makePerson();
  person.position.set(p.x, GROUND_Y, p.z);
  person.visible = false;
  scene.add(person);

  pads.push({ pos: p, person });
});

// 목표 위치를 알려주는 빛기둥
const beam = new THREE.Mesh(
  new THREE.CylinderGeometry(2.4, 2.4, 90, 24, 1, true),
  new THREE.MeshBasicMaterial({
    color: 0x39ff9e, transparent: true, opacity: 0.16,
    side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  }),
);
beam.position.y = GROUND_Y + 45;
scene.add(beam);

function setBeam(idx, color) {
  const p = pads[idx].pos;
  beam.position.set(p.x, GROUND_Y + 45, p.z);
  beam.material.color.set(color);
}

/* ----- 미션 상태 ----- */
const mission = { phase: 'toPickup', pickup: 0, dropoff: -1, cooldown: 0 };
let score = 0;
let delivered = 0;
let onboard = false;

function randPadExcept(except) {
  let i;
  do { i = (Math.random() * pads.length) | 0; } while (except.includes(i));
  return i;
}
function startPickup() {
  mission.phase = 'toPickup';
  mission.pickup = randPadExcept([mission.dropoff]);
  pads.forEach((pd, i) => { pd.person.visible = (i === mission.pickup); });
  setBeam(mission.pickup, '#39ff9e');
}
function startDropoff() {
  mission.phase = 'toDropoff';
  mission.dropoff = randPadExcept([mission.pickup]);
  setBeam(mission.dropoff, '#16e0ff');
}
startPickup();

/* ----- 헬리콥터 모델 ----- */
const heli = new THREE.Group();   // 요(heading) 프레임 (월드 위치)
const body = new THREE.Group();   // 피치/롤 틸트 프레임
heli.add(body);

const matBody = new THREE.MeshStandardMaterial({ color: 0xd0342c, roughness: 0.5, metalness: 0.3 });
const matDark = new THREE.MeshStandardMaterial({ color: 0x20242e, roughness: 0.6, metalness: 0.4 });
const matGlass = new THREE.MeshStandardMaterial({ color: 0x0d1320, roughness: 0.15, metalness: 0.6 });
const matMetal = new THREE.MeshStandardMaterial({ color: 0x4a4f57, roughness: 0.4, metalness: 0.7 });

function part(geo, mat, x, y, z) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

// 동체 (노즈 = +Z)
const cabin = part(new THREE.SphereGeometry(1.25, 24, 18), matBody, 0, 0, 0.3);
cabin.scale.set(1.05, 0.95, 1.7);
body.add(cabin);
// 캐노피(전면 유리)
const canopy = part(new THREE.SphereGeometry(1.02, 20, 16), matGlass, 0, 0.18, 1.25);
canopy.scale.set(0.95, 0.85, 1.0);
body.add(canopy);

// 테일붐
const boom = part(new THREE.CylinderGeometry(0.22, 0.12, 3.6, 14), matBody, 0, 0.25, -2.4);
boom.rotation.x = Math.PI / 2;
body.add(boom);
// 테일 핀
const fin = part(new THREE.BoxGeometry(0.12, 1.0, 0.7), matBody, 0, 0.7, -4.0);
body.add(fin);

// 메인 로터 마스트 + 로터
const mast = part(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 10), matMetal, 0, 1.25, 0.2);
body.add(mast);
const mainRotor = new THREE.Group();
mainRotor.position.set(0, 1.55, 0.2);
body.add(mainRotor);
const hub = part(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 12), matDark, 0, 0, 0);
mainRotor.add(hub);
for (let i = 0; i < 4; i++) {
  const blade = part(new THREE.BoxGeometry(7.2, 0.05, 0.42), matDark, 0, 0, 0);
  blade.rotation.y = (i / 4) * Math.PI * 2;
  mainRotor.add(blade);
}

// 테일 로터 (측면 디스크, X축 회전)
const tailRotor = new THREE.Group();
tailRotor.position.set(0.28, 0.7, -4.0);
body.add(tailRotor);
for (let i = 0; i < 2; i++) {
  const tb = part(new THREE.BoxGeometry(0.08, 1.5, 0.2), matDark, 0, 0, 0);
  tb.rotation.x = (i / 2) * Math.PI;
  tailRotor.add(tb);
}

// 스키드(착륙 다리)
for (const sx of [-0.85, 0.85]) {
  const skid = part(new THREE.CylinderGeometry(0.09, 0.09, 3.4, 10), matMetal, sx, -1.15, 0);
  skid.rotation.x = Math.PI / 2;
  body.add(skid);
  for (const sz of [-0.9, 0.9]) {
    body.add(part(new THREE.CylinderGeometry(0.06, 0.06, 1.05, 8), matMetal, sx, -0.65, sz));
  }
}

scene.add(heli);

/* ----- 카메라 ----- */
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.5, 2000);
let camMode = 0; // 0=체이스, 1=콕핏
camera.position.set(0, 8, -18);

/* ----- 비행 상태 / 입력 ----- */
const GRAVITY = 9.8;
const MAX_THRUST = 19.6;   // throttle 0.5 에서 호버
const MAX_TILT = 0.5;      // 사이클릭 최대 기울임(rad)
const H_ACCEL = 16;        // 기울임당 수평 가속
const H_DRAG = 0.5;        // 수평 항력
const V_DRAG = 0.35;       // 수직 항력
const YAW_RATE = 1.3;      // 요 각속도
const MIN_Y = GROUND_Y + 1.2;

const state = {
  pos: new THREE.Vector3(0, MIN_Y, 0),
  vel: new THREE.Vector3(),
  yaw: 0,
  throttle: 0.5,
  pitch: 0, // 현재 틸트(부드럽게)
  roll: 0,
};
const keys = Object.create(null);

const HANDLED = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (HANDLED.includes(e.code)) e.preventDefault();
  if (e.code === 'KeyC') camMode = (camMode + 1) % 2;
  if (e.code === 'KeyR') reset();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

function reset() {
  state.pos.set(0, MIN_Y, 0);
  state.vel.set(0, 0, 0);
  state.yaw = 0; state.throttle = 0.5; state.pitch = 0; state.roll = 0;
  onboard = false; mission.cooldown = 0;
}

/* ----- HUD ----- */
const elAlt = document.getElementById('alt');
const elSpd = document.getElementById('spd');
const elHdg = document.getElementById('hdg');
const elVs = document.getElementById('vs');
const elColl = document.getElementById('collFill');
const elScore = document.getElementById('score');
const elStatus = document.getElementById('status');
const elPopup = document.getElementById('popup');

let popupT = 0;
function showPopup(text) {
  elPopup.textContent = text;
  elPopup.style.color = mission.phase === 'toDropoff' ? '#39ff9e' : '#ffd86b';
  popupT = 1.2;
}

/* ----- 루프 ----- */
const clock = new THREE.Clock();
const fwd = new THREE.Vector3();
const right = new THREE.Vector3();
const camTarget = new THREE.Vector3();
const camDesired = new THREE.Vector3();

function loop() {
  const dt = Math.min(clock.getDelta(), 0.04);

  // 입력 → 사이클릭 목표 틸트
  let tPitch = 0, tRoll = 0;
  if (keys['ArrowUp']) tPitch += MAX_TILT;
  if (keys['ArrowDown']) tPitch -= MAX_TILT;
  if (keys['ArrowLeft']) tRoll -= MAX_TILT;   // ← 왼쪽으로 이동
  if (keys['ArrowRight']) tRoll += MAX_TILT;  // → 오른쪽으로 이동
  state.pitch += (tPitch - state.pitch) * Math.min(1, dt * 4);
  state.roll += (tRoll - state.roll) * Math.min(1, dt * 4);

  // 컬렉티브(W/S) → throttle
  if (keys['KeyW']) state.throttle += 0.5 * dt;
  if (keys['KeyS']) state.throttle -= 0.5 * dt;
  state.throttle = Math.max(0, Math.min(1, state.throttle));

  // 페달(A/D) → 요
  if (keys['KeyA']) state.yaw += YAW_RATE * dt;
  if (keys['KeyD']) state.yaw -= YAW_RATE * dt;

  // 방향 벡터(노즈=+Z, 요 회전)
  fwd.set(Math.sin(state.yaw), 0, Math.cos(state.yaw));
  right.set(Math.cos(state.yaw), 0, -Math.sin(state.yaw));

  // 수평 가속 = 기울임 방향
  const ax = fwd.x * state.pitch * H_ACCEL + right.x * state.roll * H_ACCEL;
  const az = fwd.z * state.pitch * H_ACCEL + right.z * state.roll * H_ACCEL;
  state.vel.x += ax * dt;
  state.vel.z += az * dt;
  state.vel.x *= 1 - H_DRAG * dt;
  state.vel.z *= 1 - H_DRAG * dt;

  // 수직: 추력 - 중력
  const vAcc = state.throttle * MAX_THRUST - GRAVITY;
  state.vel.y += vAcc * dt;
  state.vel.y *= 1 - V_DRAG * dt;

  // 적분
  state.pos.addScaledVector(state.vel, dt);

  // 지면 충돌
  if (state.pos.y <= MIN_Y) {
    state.pos.y = MIN_Y;
    if (state.vel.y < 0) state.vel.y = 0;
    state.vel.x *= 1 - Math.min(1, dt * 3); // 접지 마찰
    state.vel.z *= 1 - Math.min(1, dt * 3);
  }

  // 헬기 트랜스폼 적용
  heli.position.copy(state.pos);
  heli.rotation.y = state.yaw;
  body.rotation.x = state.pitch;   // 노즈 다운 = 전진
  body.rotation.z = -state.roll;   // 우뱅크

  // 로터 회전(스로틀 비례 + 기본 회전)
  const rpm = 12 + state.throttle * 18;
  mainRotor.rotation.y += rpm * dt;
  tailRotor.rotation.x += (rpm + 6) * dt;

  // 카메라
  if (camMode === 0) {
    // 체이스(뒤+위)
    camDesired.copy(state.pos)
      .addScaledVector(fwd, -16)
      .addScaledVector(right, 0)
      .add(new THREE.Vector3(0, 6, 0));
    camera.position.lerp(camDesired, Math.min(1, dt * 3));
    camTarget.copy(state.pos).addScaledVector(fwd, 6).add(new THREE.Vector3(0, 1, 0));
    camera.lookAt(camTarget);
  } else {
    // 콕핏(노즈)
    camDesired.copy(state.pos).addScaledVector(fwd, 1.4).add(new THREE.Vector3(0, 0.8, 0));
    camera.position.copy(camDesired);
    camTarget.copy(state.pos).addScaledVector(fwd, 20).add(new THREE.Vector3(0, 0.4, 0));
    camera.lookAt(camTarget);
  }

  // 그림자 광원이 헬기를 따라가도록
  sun.position.set(state.pos.x + 80, 140, state.pos.z + 40);
  sun.target.position.copy(state.pos);
  sun.target.updateMatrixWorld();

  // 미션: 승객 픽업 → 배달
  mission.cooldown = Math.max(0, mission.cooldown - dt);
  const spd = Math.hypot(state.vel.x, state.vel.z) * 3.6;
  const tgt = (mission.phase === 'toPickup' ? pads[mission.pickup] : pads[mission.dropoff]).pos;
  const tgtDist = Math.hypot(state.pos.x - tgt.x, state.pos.z - tgt.z);
  const altM = state.pos.y - GROUND_Y;
  if (tgtDist < 10 && altM < 5 && spd < 20 && mission.cooldown <= 0) {
    if (mission.phase === 'toPickup') {
      pads[mission.pickup].person.visible = false;
      onboard = true; score += 50; mission.cooldown = 0.9;
      showPopup('＋50  승객 탑승!');
      startDropoff();
    } else {
      onboard = false; delivered += 1; score += 100; mission.cooldown = 0.9;
      showPopup('＋100  배달 완료!');
      startPickup();
    }
  }
  // 빔 펄스 + 점수 팝업 페이드
  beam.material.opacity = 0.12 + 0.07 * Math.sin(clock.elapsedTime * 3);
  beam.rotation.y += dt * 0.4;
  if (popupT > 0) { popupT -= dt; elPopup.style.opacity = Math.max(0, popupT / 1.2).toFixed(2); }

  // HUD
  let hdg = Math.round((-state.yaw * 180) / Math.PI) % 360;
  if (hdg < 0) hdg += 360;
  elAlt.innerHTML = `${Math.round(state.pos.y - GROUND_Y)}<span> m</span>`;
  elSpd.innerHTML = `${Math.round(spd)}<span> km/h</span>`;
  elHdg.innerHTML = `${String(hdg).padStart(3, '0')}<span>°</span>`;
  elVs.innerHTML = `${state.vel.y >= 0 ? '+' : ''}${state.vel.y.toFixed(1)}<span> m/s</span>`;
  elColl.style.height = `${(state.throttle * 100).toFixed(0)}%`;
  elScore.textContent = score;
  elStatus.textContent = mission.phase === 'toPickup'
    ? `🧍 승객 픽업까지 ${Math.round(tgtDist)} m · 낮고 느리게 호버하세요`
    : `🎯 목적지까지 ${Math.round(tgtDist)} m · 파란 빛기둥에 착지하세요`;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
