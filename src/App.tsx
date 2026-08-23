import ToroidalColorMatrix from './components/ToroidalColorMatrix';

export default function App() {
  const title = import.meta.env.VITE_APP_TITLE || 'Color Spectrum';
  const isDev = import.meta.env.DEV;

  return (
    <main style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <header>
        <h1>{title}</h1>
        <p style={{ margin: '8px 0', opacity: 0.85 }}>
          Module: Chromatic Synthesis & The Toroidal Color Matrix Protocol
        </p>
        {isDev && <span className="badge">Development Mode</span>}
      </header>

      <section style={{ maxWidth: '850px', width: '100%', margin: '0 auto' }}>
        <ToroidalColorMatrix majorRadius={2.2} tubeRadius={0.8} layers={7} />
      </section>
    </main>
  );
}