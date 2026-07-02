import { useState } from 'react';
import Card from './Card';

const colors = {
  cream: '#D9CCBA',
  dark: '#1a3a2a',
  logoGreen: '#4B5A3C',
  textOlive: '#6D4E2E',
  gold: '#C9A961',
};

export default function Header({ cartCount, onNavigate, currentPage, onLogoClick, user, onCategorySelect }) {
  const [showCatalogMenu, setShowCatalogMenu] = useState(false);

  const categories = [
    { id: 1, name: 'Smoking Zubehör', axis: 'Frank-Achse' },
    { id: 2, name: 'Premium Pfeifen', axis: 'Sven-Achse' },
    { id: 3, name: 'Growbox Equipment', axis: 'Frank-Achse' },
  ];

  const handleCategoryClick = (categoryId) => {
    onCategorySelect?.(categoryId);
    onNavigate('shop');
    setShowCatalogMenu(false);
  };
  return (
    <header style={{
      backgroundColor: colors.cream,
      borderBottom: `2px solid ${colors.logoGreen}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>

        {/* Top Row: Logo + Search + Account */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>

          {/* Logo in Card */}
          <Card style={{ padding: '0.5rem 0.75rem', backgroundColor: colors.cream }}>
            <button
              onClick={onLogoClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              <img
                src="/logo.png"
                alt="Enny's Logo"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: colors.logoGreen }}>
                  Enny's
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: colors.textOlive }}>
                  LOUNGE & GROW STORE
                </div>
              </div>
            </button>
          </Card>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
            <input
              type="text"
              placeholder="🔍 Marke, Produkt oder Kategorie suchen..."
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: colors.cream,
                border: `1px solid ${colors.logoGreen}`,
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: colors.dark,
              }}
            />
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <button
                onClick={() => onNavigate('account')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.logoGreen,
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.dark}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.logoGreen}
              >
                👤 {user.name}
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.dark,
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.gold}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.dark}
              >
                🔐 Login
              </button>
            )}

            <button
              onClick={() => onNavigate('cart')}
              style={{
                position: 'relative',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                border: 'none',
                backgroundColor: colors.logoGreen,
                color: colors.cream,
              }}
            >
              🛒 Warenkorb
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ea580c',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Row - Customer Friendly */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>

          {/* Left: Catalog Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowCatalogMenu(!showCatalogMenu)}
              style={{
                background: 'none',
                border: 'none',
                color: colors.dark,
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s',
                backgroundColor: showCatalogMenu ? colors.cream : 'transparent',
              }}
              onMouseEnter={(e) => !showCatalogMenu && (e.currentTarget.style.backgroundColor = 'rgba(201, 169, 97, 0.1)')}
              onMouseLeave={(e) => !showCatalogMenu && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              📚 Katalog {showCatalogMenu ? '▲' : '▼'}
            </button>

            {/* Dropdown Menu */}
            {showCatalogMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: colors.cream,
                border: `2px solid ${colors.logoGreen}`,
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                minWidth: '280px',
                boxShadow: '0 4px 12px rgba(75, 90, 60, 0.15)',
                zIndex: 100,
              }}>
                <div style={{ padding: '0.75rem 0' }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        color: colors.dark,
                        fontSize: '0.875rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(75, 90, 60, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        {cat.name}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: colors.textOlive,
                      }}>
                        {cat.axis}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Bundles & Guides Button */}
          <button
            onClick={() => onNavigate('shop')}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: colors.logoGreen,
              color: colors.gold,
              fontWeight: '600',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.textOlive;
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(75, 90, 60, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.logoGreen;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            📚 Bundles & Anbauanleitungen
          </button>
        </nav>
      </div>
    </header>
  );
}
