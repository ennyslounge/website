import Card from './Card';

const colors = {
  cream: '#D9CCBA',
  dark: '#1a3a2a',
  logoGreen: '#4B5A3C',
  textOlive: '#6D4E2E',
  gold: '#C9A961',
};

export default function Hero({ onShopClick }) {
  return (
    <section style={{ backgroundColor: colors.dark, color: colors.cream, padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Main Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>

          {/* Left: Text & CTAs */}
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '0.1em', color: colors.gold }}>
              EIGENVERSORGUNG · HEADSHOP & GROWSHOP
            </p>

            <h1 style={{
              fontSize: '3.75rem',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              Anbauen, wie du es willst.
            </h1>

            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              lineHeight: 1.6,
              color: colors.cream,
            }}>
              Kurierte Bundles, Anbau-Rezepte in einem Klick und Verbrauchsmaterial im Abo.
              Ehrlich bepreist, diskret versendet — vom ersten Indoor bis zum Profi-Setup.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={onShopClick}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: colors.gold,
                  color: colors.dark,
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                Sortiment ansehen
              </button>

              <button
                onClick={onShopClick}
                style={{
                  padding: '0.75rem 2rem',
                  border: `2px solid ${colors.logoGreen}`,
                  color: colors.cream,
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.logoGreen;
                  e.currentTarget.style.color = colors.dark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.cream;
                }}
              >
                Anbau-Rezepte
              </button>
            </div>
          </div>

          {/* Right: Logo in Card */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '280px', height: '280px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0' }}>
              <img
                src="/logo.png"
                alt="Husky Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9 }}
              />
            </Card>
          </div>
        </div>

        {/* Trust Section */}
        <div style={{ borderTop: `1px solid ${colors.logoGreen}`, paddingTop: '3rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { icon: '✓', title: 'LOYALITÄT', desc: 'Dauerhaft fair bepreist' },
              { icon: '🌿', title: 'NATURVERBUNDENHEIT', desc: 'Nachhaltig & organisch' },
              { icon: '🔓', title: 'FREIHEIT', desc: 'Selbstbestimmtes Wachstum' },
              { icon: '🤝', title: 'EHRLICHKEIT', desc: 'Transparente Kommunikation' },
              { icon: '🌍', title: 'SOUVERÄNITÄT', desc: 'Eigenversorgung fördern' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 'bold', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: colors.gold }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
