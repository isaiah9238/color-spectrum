// ProceduralHarmonicStage.tsx
import React, { useState } from 'react';

interface ProceduralStageProps {
  nodes?: number;
  amplitude?: number;
  layers?: number;
  showRays?: boolean;
}

export const ProceduralHarmonicStage: React.FC<ProceduralStageProps> = ({
  nodes: initialNodes = 6,
  amplitude: initialAmp = 28,
  layers: initialLayers = 4,
  showRays: initialRays = true,
}) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [amplitude, setAmplitude] = useState(initialAmp);
  const [layers, setLayers] = useState(initialLayers);
  const [showRays, setShowRays] = useState(initialRays);

  const cx = 400;
  const cy = 200;
  const baseRadius = 110;
  const steps = 180;

  // Generate harmonic closed loop paths using: r(θ) = R + A * sin(k * θ)
  const generateHarmonicPath = (layerIndex: number, totalLayers: number) => {
    const scale = 0.5 + (layerIndex / totalLayers) * 0.7;
    const layerAmp = amplitude * scale;
    const rBase = baseRadius * scale;
    const phaseOffset = (layerIndex * Math.PI) / nodes;

    const points: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const r = rBase + layerAmp * Math.sin(theta * nodes + phaseOffset);
      const x = cx + r * Math.cos(theta) * 1.5; // Stretched along X to match toroid projection
      const y = cy + r * Math.sin(theta);
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    points.push('Z');
    return points.join(' ');
  };

  // Generate nodal rays connecting core to antinodes
  const renderNodalRays = () => {
    if (!showRays) return null;
    const rayElements = [];
    const totalRays = nodes * 2;

    for (let i = 0; i < totalRays; i++) {
      const theta = (i / totalRays) * Math.PI * 2;
      const r = baseRadius * 1.25 + amplitude;
      const x2 = cx + r * Math.cos(theta) * 1.5;
      const y2 = cy + r * Math.sin(theta);

      rayElements.push(
        <line
          key={`ray-${i}`}
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke={i % 2 === 0 ? '#ff00aa' : '#00ffff'}
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.35"
        />
      );
    }
    return rayElements;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <svg
        viewBox="0 0 800 400"
        width="100%"
        height="240"
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: '#0a0c10', borderRadius: '8px', display: 'block' }}
      >
        <defs>
          <radialGradient id="proc-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id="proc-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Nodal Stream Lines */}
        {renderNodalRays()}

        {/* Procedurally Drawn Harmonic Layers */}
        {Array.from({ length: layers }).map((_, idx) => {
          const hue = (idx / layers) * 280 + 160;
          return (
            <path
              key={`layer-${idx}`}
              d={generateHarmonicPath(idx + 1, layers)}
              fill="none"
              stroke={`hsl(${hue}, 100%, 65%)`}
              strokeWidth={idx === layers - 1 ? '3' : '1.5'}
              filter="url(#proc-glow)"
              opacity={0.35 + (idx / layers) * 0.55}
            />
          );
        })}

        {/* High-Energy Central Singularity */}
        <circle cx={cx} cy={cy} r={28} fill="url(#proc-core)" filter="url(#proc-glow)" />
        <circle cx={cx} cy={cy} r={6} fill="#ffffff" />
      </svg>

      {/* Real-time Generator Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          padding: '12px',
          backgroundColor: '#0f111a',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#94a3b8',
        }}
      >
        <div>
          <label>Harmonic Nodes ($k$): {nodes}</label>
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#a855f7' }}
          />
        </div>
        <div>
          <label>Wave Amplitude: {amplitude}px</label>
          <input
            type="range"
            min="5"
            max="60"
            step="1"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#a855f7' }}
          />
        </div>
        <div>
          <label>Density Layers: {layers}</label>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={layers}
            onChange={(e) => setLayers(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#a855f7' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="rays"
            checked={showRays}
            onChange={(e) => setShowRays(e.target.checked)}
            style={{ accentColor: '#a855f7', cursor: 'pointer' }}
          />
          <label htmlFor="rays" style={{ cursor: 'pointer' }}>Show Nodal Rays</label>
        </div>
      </div>
    </div>
  );
};