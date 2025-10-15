import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LaptopScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const laptopGroupRef = useRef(null);
  const clockRef = useRef(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    clockRef.current = new THREE.Clock();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 4);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88c0ff, 0.6);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Laptop group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);
    laptopGroupRef.current = laptopGroup;

    // Base (keyboard section)
    const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.2);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.3,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopGroup.add(base);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(2, 1.2, 0.05);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.6,
      roughness: 0.4,
      emissive: 0x2dd4bf,
      emissiveIntensity: 0.6,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = 0.65;
    screen.position.z = -0.6;
    screen.rotation.x = -Math.PI / 12;
    laptopGroup.add(screen);

    // Background plane
    const bgGeometry = new THREE.PlaneGeometry(20, 20);
    const bgMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      side: THREE.BackSide,
    });
    const background = new THREE.Mesh(bgGeometry, bgMaterial);
    background.position.z = -10;
    scene.add(background);

    // Mouse interaction handler
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetRotationRef.current.y = x * 0.6;
      targetRotationRef.current.x = -y * 0.3;
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const elapsed = clockRef.current.getElapsedTime();

      // Floating animation
      laptopGroup.position.y = Math.sin(elapsed * 1.2) * 0.05;

      // Smooth rotation interpolation
      laptopGroup.rotation.x += (targetRotationRef.current.x - laptopGroup.rotation.x) * 0.05;
      laptopGroup.rotation.y += (targetRotationRef.current.y - laptopGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      baseGeometry.dispose();
      baseMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} id="laptop-scene" style={{ width: '100%', height: '400px' }} />;
}
