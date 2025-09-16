// Import Three.js from CDN (ES module version)
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";

let scene, camera, renderer, laptop, clock;

function init() {
  const container = document.getElementById("laptop-scene");

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040, 1.2));

  // Laptop group
  laptop = new THREE.Group();

  // Base (keyboard part)
  const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3D8D7A });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);

  // Screen
  const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
  const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.y = 1.1;
  screen.position.z = -0.9;
  screen.rotation.x = -Math.PI / 12; // tilt back slightly

  laptop.add(base);
  laptop.add(screen);

  // Angle laptop (screen facing left)
  laptop.rotation.y = Math.PI / 6;

  scene.add(laptop);

  // Animation clock
  clock = new THREE.Clock();

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Hover animation (smooth up/down)
  laptop.position.y = Math.sin(elapsed * 2) * 0.1;

  // Subtle rotation for life-like feel
  laptop.rotation.y = Math.PI / 6 + Math.sin(elapsed) * 0.05;

  renderer.render(scene, camera);
}

init();
