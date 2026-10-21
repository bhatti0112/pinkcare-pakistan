import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeRibbonCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setWebGLSupported(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      setWebGLSupported(false);
      return;
    }

    const width = currentMount.clientWidth || 360;
    const height = currentMount.clientHeight || 360;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // Subtle gentle lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const pinkFillLight = new THREE.PointLight(0xe83e8c, 3.5, 12);
    pinkFillLight.position.set(-2, -1, 2);
    scene.add(pinkFillLight);

    const plumRimLight = new THREE.PointLight(0x42152f, 2.0, 10);
    plumRimLight.position.set(0, -3, -2);
    scene.add(plumRimLight);

    // Create 3D Awareness Ribbon using smooth CatmullRomCurve3
    // Points define the looping awareness ribbon in 3D space
    const ribbonPoints = [
      new THREE.Vector3(-0.8, -1.2, 0.1), // Left leg tail
      new THREE.Vector3(-0.4, -0.4, 0.15),
      new THREE.Vector3(-0.1, 0.2, 0.25),  // Crossing front
      new THREE.Vector3(0.5, 0.7, 0.1),    // Right loop top
      new THREE.Vector3(0.0, 1.1, -0.05),  // Crown apex
      new THREE.Vector3(-0.5, 0.7, -0.1),  // Left loop top
      new THREE.Vector3(0.1, 0.2, -0.15),  // Crossing back
      new THREE.Vector3(0.4, -0.4, 0.05),
      new THREE.Vector3(0.8, -1.2, 0.1),   // Right leg tail
    ];

    const ribbonCurve = new THREE.CatmullRomCurve3(ribbonPoints);
    const geometry = new THREE.TubeGeometry(ribbonCurve, 80, 0.12, 16, false);

    // Elegant Pink awareness material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe83e8c,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xfc8181),
    });

    const ribbonMesh = new THREE.Mesh(geometry, material);
    ribbonMesh.position.y = 0.05;
    scene.add(ribbonMesh);

    // Restrained, soft glowing floating particles
    const particleCount = 35;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i + 1] = (Math.random() - 0.5) * 4;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf472b6,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Interaction handling (subtle pointer tilt)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = -y * 0.2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Handle responsive resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when offscreen (IntersectionObserver)
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(currentMount);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating idle breathing movement
      ribbonMesh.position.y = 0.05 + Math.sin(elapsedTime * 1.2) * 0.06;

      // Smooth lerp toward mouse orientation
      ribbonMesh.rotation.y += (targetRotationY + Math.sin(elapsedTime * 0.6) * 0.15 - ribbonMesh.rotation.y) * 0.04;
      ribbonMesh.rotation.x += (targetRotationX + Math.cos(elapsedTime * 0.8) * 0.08 - ribbonMesh.rotation.x) * 0.04;

      // Slow particle rotation
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-48 h-56 rounded-full bg-gradient-to-tr from-[#E83E8C]/20 to-[#FCE7F3]/40 flex items-center justify-center border border-[#E83E8C]/30 shadow-lg">
          <svg viewBox="0 0 100 120" fill="none" className="w-32 h-32 drop-shadow-md">
            <path
              d="M50 35 C40 10, 20 10, 20 35 C20 60, 48 85, 75 115"
              stroke="#C2185B"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M50 35 C60 10, 80 10, 80 35 C80 60, 52 85, 25 115"
              stroke="#E83E8C"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Pink Awareness Ribbon"
      role="img"
    />
  );
};
