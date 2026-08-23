import React from 'react';
import {
  Stage1DiscreteOrbital,
  Stage2CoronaBlend,
  Stage3WaveEnvelope,
} from './instructions';

export const MainInstrutions: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '32px',
        background: '#050608',
        minHeight: '100vh',
      }}
    >
      <section>
        <h2
          style={{
            color: '#c0c0d0',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontSize: '16px',
            marginBottom: '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Stage 1: Discrete Orbital Toroid (Dual Emitter Stream)
        </h2>
        <Stage1DiscreteOrbital />
      </section>

      <section>
        <h2
          style={{
            color: '#c0c0d0',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontSize: '16px',
            marginBottom: '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Stage 2: Additive Corona Blend (Magenta / Cyan Overlap)
        </h2>
        <Stage2CoronaBlend />
      </section>

      <section>
        <h2
          style={{
            color: '#c0c0d0',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
            fontSize: '16px',
            marginBottom: '12px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Stage 3: Dipole Standing Wave Envelope (k = 1)
        </h2>
        <Stage3WaveEnvelope />
      </section>
    </div>
  );
};
