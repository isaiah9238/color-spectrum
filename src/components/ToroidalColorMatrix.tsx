import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface TorusProps {
  majorRadius?: number;
  tubeRadius?: number;
}

function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function ToroidalColorMatrix({
  majorRadius = 3.2,
  tubeRadius = 1.1,
}: TorusProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Dynamic Telemetry & Harmonic States
  const [isRotating, setIsRotating] = useState(true);
  const [amplitude, setAmplitude] = useState(0.12);
  const [harmonicNodes, setHarmonicNodes] = useState(4);
  const [waveSpeed, setWaveSpeed] = useState(2.0);
  const [particleSize, setParticleSize] = useState(0.12);

  // Refs to feed real-time values into the WebGL animation loop without remounting
  const paramsRef = useRef({
    isRotating,
    amplitude,
    harmonicNodes,
    waveSpeed,
  });

  useEffect(() => {
    paramsRef.current = {
      isRotating,
      amplitude,
      harmonicNodes,
      waveSpeed,
    };
  }, [isRotating, amplitude, harmonicNodes, waveSpeed]);

  const cloudMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    if (cloudMaterialRef.current) {
      cloudMaterialRef.current.size = particleSize;
      cloudMaterialRef.current.needsUpdate = true;
    }
  }, [particleSize]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 8.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // 2. Central Stellar Core
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffdd88,
      transparent: true,
      opacity: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    const coronaGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff66cc,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(coronaMesh);

    // 3. Toroidal Particle Cloud Allocation
    const particleCount = 60000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const thetas = new Float32Array(particleCount);
    const phis = new Float32Array(particleCount);
    const rOffsets = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    const glowTexture = createGlowTexture();

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const rOffset = tubeRadius * (0.2 + 0.8 * Math.sqrt(Math.random()));

      const hue = theta / (Math.PI * 2);
      const energyFactor = 1.0 + hue * 2.2;

      thetas[i] = theta;
      phis[i] = phi;
      rOffsets[i] = rOffset;
      speeds[i] = energyFactor;

      const layerIndex = Math.floor((phi / (Math.PI * 2)) * 7);
      const phiFactor = layerIndex / 6;

      const saturation = 0.65 + 0.35 * Math.sin(phiFactor * Math.PI);
      const value = 0.55 + 0.45 * phiFactor;

      let r = Math.max(0, Math.min(1, Math.abs(hue * 6.0 - 3.0) - 1.0));
      let g = Math.max(0, Math.min(1, 2.0 - Math.abs(hue * 6.0 - 2.0)));
      let b = Math.max(0, Math.min(1, 2.0 - Math.abs(hue * 6.0 - 4.0)));

      colors[i * 3] = r * saturation * value;
      colors[i * 3 + 1] = g * saturation * value;
      colors[i * 3 + 2] = b * saturation * value;
    }

    const cloudGeometry = new THREE.BufferGeometry();
    const posAttribute = new THREE.BufferAttribute(positions, 3);
    cloudGeometry.setAttribute('position', posAttribute);
    cloudGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const cloudMaterial = new THREE.PointsMaterial({
      size: particleSize,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    cloudMaterialRef.current = cloudMaterial;

    const cloudMesh = new THREE.Points(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // 4. Harmonic Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const { isRotating, amplitude, harmonicNodes, waveSpeed } = paramsRef.current;

      if (isRotating) {
        cloudMesh.rotation.y += 0.003;
        coreMesh.rotation.y += 0.006;
      }

      const posArray = posAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const theta = thetas[i];
        const phi = phis[i];
        const baseR = rOffsets[i];
        const energy = speeds[i];

        // Dynamic Harmonic Standing Wave Equation
        const wave = Math.sin(theta * harmonicNodes - time * waveSpeed * energy) * (amplitude * energy);
        const currentR = baseR + wave;

        const x = (majorRadius + currentR * Math.cos(phi)) * Math.cos(theta);
        const yVerticalScale = 1.0 + 0.6 * (energy / 3.2);
        const y = currentR * Math.sin(phi) * yVerticalScale;
        const z = (majorRadius + currentR * Math.cos(phi)) * Math.sin(theta);

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
      }

      posAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 5. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      glowTexture.dispose();
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [majorRadius, tubeRadius]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* WebGL Viewport Container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '520px',
          minHeight: '520px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'radial-gradient(circle at center, #0e1017 0%, #050608 100%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
        }}
      />

      {/* Dynamic Telemetry Control Deck */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '20px',
          backgroundColor: '#0f111a',
          border: '1px solid #1e2433',
          borderRadius: '12px',
          fontFamily: 'var(--mono)',
        }}
      >
        {/* Wave Amplitude */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
            <span>Pinch / Amplitude</span>
            <span style={{ color: '#c084fc' }}>{amplitude.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.30"
            step="0.01"
            value={amplitude}
            onChange={(e) => setAmplitude(parseFloat(e.target.value))}
            style={{ accentColor: '#a855f7', cursor: 'pointer' }}
          />
        </div>

        {/* Harmonic Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
            <span>Harmonic Nodes ($k$)</span>
            <span style={{ color: '#c084fc' }}>{harmonicNodes}</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={harmonicNodes}
            onChange={(e) => setHarmonicNodes(parseInt(e.target.value))}
            style={{ accentColor: '#a855f7', cursor: 'pointer' }}
          />
        </div>

        {/* Wave Speed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
            <span>Wave Speed ($\omega$)</span>
            <span style={{ color: '#c084fc' }}>{waveSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="6.0"
            step="0.2"
            value={waveSpeed}
            onChange={(e) => setWaveSpeed(parseFloat(e.target.value))}
            style={{ accentColor: '#a855f7', cursor: 'pointer' }}
          />
        </div>

        {/* Particle Size */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
            <span>Particle Glow Size</span>
            <span style={{ color: '#c084fc' }}>{particleSize.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.04"
            max="0.35"
            step="0.01"
            value={particleSize}
            onChange={(e) => setParticleSize(parseFloat(e.target.value))}
            style={{ accentColor: '#a855f7', cursor: 'pointer' }}
          />
        </div>

        {/* Play/Pause Button */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isRotating ? '#1e1b4b' : '#312e81',
              color: '#e0e7ff',
              border: '1px solid #4338ca',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              fontSize: '13px',
              transition: 'background 0.2s ease',
            }}
          >
            {isRotating ? '⏸ Pause Orbital Rotation' : '▶ Resume Orbital Rotation'}
          </button>
        </div>
      </div>
    </div>
  );
}
React