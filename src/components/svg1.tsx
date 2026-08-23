<svg viewBox="0 0 800 400" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" viewTarget="background:#0a0c10; border-radius:8px;">
  <defs>
    <radialGradient id="amberCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff4cc" />
      <stop offset="70%" stop-color="#e6a100" />
      <stop offset="100%" stop-color="#2a1b00" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="blueLobe" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7000ff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#00ffff" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="greenLobe" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00ff66" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#003311" stop-opacity="0" />
    </radialGradient>
  </defs>
  !-- Orbiting streams --
  <ellipse cx="100" cy="200" rx="90" ry="40" fill="url(#redLobe)" />
  <ellipse cx="300" cy="200" rx="90" ry="40" fill="url(#blueLobe)" />
  <ellipse cx="500" cy="200" rx="90" ry="40" fill="url(#greenLobe)" />
  !-- Central core --
  <circle cx="400" cy="200" r="45" fill="#1b122c" />
  <circle cx="400" cy="200" r="30" fill="url(#amberCore)" />
</svg>