import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

let scene, camera, renderer, laptop, clock;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / 400, 0.1, 1000);
  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth * 0.4, 400);
  document.getElementById('laptop-scene').appendChild(renderer.domElement);

  // Basic lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040, 1.2));

  // Laptop group
  laptop = new THREE.Group();

  // Base
  const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3D8D7A });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);

  // Screen
  const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
  const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.y = 1.1;
  screen.position.z = -0.9;
  screen.rotation.x = -Math.PI / 12; // angled slightly

  laptop.add(base);
  laptop.add(screen);

  // Initial angle (screen facing left)
  laptop.rotation.y = Math.PI / 6;

  scene.add(laptop);

  clock = new THREE.Clock();
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  laptop.position.y = Math.sin(elapsed * 2) * 0.1; // hover animation

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = (window.innerWidth * 0.4) / 400;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.4, 400);
});

init();
