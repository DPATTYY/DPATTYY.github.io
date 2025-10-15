import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Avatar({ modelPath, floatIntensity, rotationIntensity }) {
  const avatarRef = useRef();
  const { scene } = useGLTF(modelPath);

  // Mouse position state
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0.2 });

  // Responsive scaling
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.7 : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate target rotation based on mouse position
      targetRotation.current.y = 0.2 + mouseRef.current.x * rotationIntensity;
      targetRotation.current.x = mouseRef.current.y * rotationIntensity * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotationIntensity]);

  useFrame((state) => {
    if (!avatarRef.current) return;

    const elapsed = state.clock.getElapsedTime();

    // Floating animation (up and down) - base position lowered to show more of the body
    avatarRef.current.position.y = -1.1 + Math.sin(elapsed * 1.2) * floatIntensity;

    // Smooth rotation toward mouse position using lerp
    avatarRef.current.rotation.y = THREE.MathUtils.lerp(
      avatarRef.current.rotation.y,
      targetRotation.current.y,
      0.05
    );

    avatarRef.current.rotation.x = THREE.MathUtils.lerp(
      avatarRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
  });

  return (
    <primitive
      ref={avatarRef}
      object={scene}
      scale={scale * 1.1}
      position={[0, 0, 0]}
    />
  );
}

function Scene({ modelPath, floatIntensity, rotationIntensity }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0}
        color="#ffd4a3"
        castShadow
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.4}
        color="#a3c9ff"
      />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Avatar */}
      <Avatar
        modelPath={modelPath}
        floatIntensity={floatIntensity}
        rotationIntensity={rotationIntensity}
      />

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
        enableDamping={false}
      />
    </>
  );
}

export default function FloatingAvatarHero({
  modelPath = '/models/avatar.glb',
  floatIntensity = 0.25,
  rotationIntensity = 0.3,
  height = '600px',
  width = '100%',
}) {
  return (
    <div
      style={{ width, height }}
      className="flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800"
    >
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 40 }}
        shadows
      >
        <Scene
          modelPath={modelPath}
          floatIntensity={floatIntensity}
          rotationIntensity={rotationIntensity}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/avatar.glb');
