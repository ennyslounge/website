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
  const [expandedParent, setExpandedParent] = useState(null);

  const categories = [
    { id: 1, name: 'Headshop', icon: '🏪', parentId: null },
    { id: 11, name: 'Glas & Rauchgeräte', parentId: 1 },
    { id: 12, name: 'Grinder', parentId: 1 },
    { id: 13, name: 'Vaporizer', parentId: 1 },
    { id: 14, name: 'Premium Pfeifen', parentId: 1 },
    { id: 2, name: 'Growstore', icon: '🌱', parentId: null },
    { id: 21, name: 'Beleuchtung', parentId: 2 },
    { id: 22, name: 'Dünger & Substrate', parentId: 2 },
    { id: 23, name: 'Seeds', parentId: 2 },
    { id: 24, name: 'Growbox Equipment', parentId: 2 },
  ];

  const parentCategories = categories.filter(c => c.parentId === null);
  const getSubcategories = (parentId) => categories.filter(c => c.parentId === parentId);

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
                minWidth: '320px',
                boxShadow: '0 4px 12px rgba(75, 90, 60, 0.15)',
                zIndex: 100,
              }}>
                <div style={{ padding: '0.5rem 0' }}>
                  {parentCategories.map(parent => (
                    <div key={parent.id}>
                      {/* Hauptkategorie */}
                      <button
                        onClick={() => setExpandedParent(expandedParent === parent.id ? null : parent.id)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '1rem 1.5rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          color: colors.dark,
                          fontSize: '1rem',
                          fontWeight: '700',
                          backgroundColor: expandedParent === parent.id ? 'rgba(75, 90, 60, 0.15)' : 'transparent',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => {
                          if (expandedParent !== parent.id) {
                            e.currentTarget.style.backgroundColor = 'rgba(75, 90, 60, 0.08)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (expandedParent !== parent.id) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span>{parent.icon} {parent.name}</span>
                        <span style={{ fontSize: '0.75rem' }}>
                          {expandedParent === parent.id ? '▲' : '▼'}
                        </span>
                      </button>

                      {/* Unterkategorien */}
                      {expandedParent === parent.id && (
                        <div style={{
                          backgroundColor: 'rgba(75, 90, 60, 0.05)',
                          borderLeft: `3px solid ${colors.logoGreen}`,
                        }}>
                          {getSubcategories(parent.id).map(subcat => (
                            <button
                              key={subcat.id}
                              onClick={() => handleCategoryClick(subcat.id)}
                              style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                padding: '0.75rem 1.5rem 0.75rem 2.5rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: colors.textOlive,
                                fontSize: '0.875rem',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(75, 90, 60, 0.1)';
                                e.currentTarget.style.color = colors.dark;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = colors.textOlive;
                              }}
                            >
                              → {subcat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
