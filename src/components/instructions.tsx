// instructions.tsx
import React from 'react';

// Stage 1: Discrete Orbital Toroid (Dual Emitter Stream)
export const Stage1DiscreteOrbital: React.FC = () => (
  <svg
    viewBox="0 0 800 400"
    width="100%"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: '#0a0c10', borderRadius: '8px', display: 'block' }}
  >
    <defs>
      <radialGradient id="s1-blue" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#0066ff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#000033" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="s1-amber" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff4cc" stopOpacity="1" />
        <stop offset="45%" stopColor="#ffaa00" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#331100" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="s1-green" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#00aa44" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#001a0d" stopOpacity="0" />
      </radialGradient>
    </defs>

    <ellipse cx="260" cy="200" rx="130" ry="55" fill="url(#s1-blue)" />
    <ellipse cx="400" cy="200" rx="52" ry="52" fill="url(#s1-amber)" />
    <ellipse cx="540" cy="200" rx="130" ry="55" fill="url(#s1-green)" />
  </svg>
);

export const ToroidalSvg: React.FC = () => {
  return (
    <svg
      viewBox="0 0 800 400"
      width="100%"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: '#0a0c10', borderRadius: '8px' }}
    >
      <defs>
        <radialGradient id="amberCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4cc" />
          <stop offset="70%" stopColor="#e6a100" />
          <stop offset="100%" stopColor="#2a1b00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="redLobe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff0000" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#330000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blueLobe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7000ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="greenLobe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff66" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#003311" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Orbiting streams */}
      <ellipse cx="100" cy="200" rx="90" ry="40" fill="url(#redLobe)" />
      <ellipse cx="300" cy="200" rx="90" ry="40" fill="url(#blueLobe)" />
      <ellipse cx="500" cy="200" rx="90" ry="40" fill="url(#greenLobe)" />

      {/* Central core */}
      <circle cx="400" cy="200" r="45" fill="#1b122c" />
      <circle cx="400" cy="200" r="30" fill="url(#amberCore)" />
    </svg>
  );


// Stage 2: Additive Corona Blend (Magenta / Cyan Overlap)
export const Stage2CoronaBlend: React.FC = () => (
  <svg
    viewBox="0 0 800 400"
    width="100%"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: '#0a0c10', borderRadius: '8px', display: 'block' }}
  >
    <defs>
      <radialGradient id="s2-magenta" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff00cc" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#aa0088" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#330022" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="s2-cyan" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#00aaaa" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#002222" stopOpacity="0" />
      </radialGradient>
      <clipPath id="s2-left-half">
        <rect x="0" y="0" width="400" height="400" />
      </clipPath>
      <clipPath id="s2-right-half">
        <rect x="400" y="0" width="400" height="400" />
      </clipPath>
    </defs>

    <ellipse cx="320" cy="200" rx="140" ry="95" fill="url(#s2-magenta)" />
    <ellipse cx="480" cy="200" rx="140" ry="95" fill="url(#s2-cyan)" />

    {/* Central white lens */}
    <ellipse cx="400" cy="200" rx="95" ry="48" fill="#ffffff" fillOpacity="0.9" />

    {/* Split core */}
    <circle cx="400" cy="200" r="28" fill="#ff00cc" clipPath="url(#s2-left-half)" />
    <circle cx="400" cy="200" r="28" fill="#00ffff" clipPath="url(#s2-right-half)" />
  </svg>
);

// Stage 3: Dipole Standing Wave Envelope (k = 1)
export const Stage3WaveEnvelope: React.FC = () => (
  <svg
    viewBox="0 0 800 400"
    width="100%"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: '#0a0c10', borderRadius: '8px', display: 'block' }}
  >
    <defs>
      <linearGradient id="s3-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0055" />
        <stop offset="16%" stopColor="#ffaa00" />
        <stop offset="33%" stopColor="#aaff00" />
        <stop offset="50%" stopColor="#00ffaa" />
        <stop offset="66%" stopColor="#00aaff" />
        <stop offset="83%" stopColor="#aa00ff" />
        <stop offset="100%" stopColor="#ff00aa" />
      </linearGradient>
      <linearGradient id="s3-rainbow-vert" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff0055" stopOpacity="0.7" />
        <stop offset="25%" stopColor="#ffaa00" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#00ffaa" stopOpacity="0.3" />
        <stop offset="75%" stopColor="#00aaff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.7" />
      </linearGradient>
      <radialGradient id="s3-center" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ddff77" />
        <stop offset="100%" stopColor="#88aa33" stopOpacity="0.9" />
      </radialGradient>
      <filter id="s3-glow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Outer interference halos */}
    <rect
      x="200"
      y="100"
      width="400"
      height="200"
      rx="100"
      ry="100"
      fill="none"
      stroke="url(#s3-rainbow)"
      strokeWidth="45"
      filter="url(#s3-glow)"
      opacity="0.25"
    />
    <rect
      x="200"
      y="100"
      width="400"
      height="200"
      rx="100"
      ry="100"
      fill="none"
      stroke="url(#s3-rainbow-vert)"
      strokeWidth="35"
      filter="url(#s3-glow)"
      opacity="0.3"
    />

    {/* Main envelope body */}
    <rect
      x="200"
      y="100"
      width="400"
      height="200"
      rx="100"
      ry="100"
      fill="#ffffff"
      fillOpacity="0.08"
      stroke="url(#s3-rainbow)"
      strokeWidth="14"
    />

    {/* Inner wave bands */}
    <rect
      x="225"
      y="125"
      width="350"
      height="150"
      rx="75"
      ry="75"
      fill="none"
      stroke="url(#s3-rainbow)"
      strokeWidth="5"
      opacity="0.45"
    />
    <rect
      x="250"
      y="150"
      width="300"
      height="100"
      rx="50"
      ry="50"
      fill="#ffffff"
      fillOpacity="0.12"
      stroke="url(#s3-rainbow-vert)"
      strokeWidth="3"
      opacity="0.5"
    />

    {/* Central node */}
    <circle cx="400" cy="200" r="38" fill="url(#s3-center)" filter="url(#s3-glow)" />
  </svg>
);