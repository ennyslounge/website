import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

export default function App() {
  const [page, setPage] = useState('home'); // home, shop, cart, checkout
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Warenkorb, 2: Versand, 3: Zahlung
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Produkte vom Backend laden
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fehler beim Laden der Produkte:', err);
        setLoading(false);
      });
  }, []);

  // Produkt in Warenkorb hinzufügen
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Aus Warenkorb entfernen
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Menge ändern
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  // Gefilterte Produkte
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_id === selectedCategory)
    : products;

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg text-ennys-dark">Lädt...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f1e8', display: 'flex', flexDirection: 'column' }}>
      <Header
        cartCount={cartItems.length}
        onNavigate={setPage}
        currentPage={page}
        onLogoClick={() => setPage('home')}
      />

      <main className="flex-grow">
        {/* HOME PAGE */}
        {page === 'home' && (
          <>
            <Hero onShopClick={() => setPage('shop')} />
            <Footer onNavigate={setPage} />
          </>
        )}

        {/* SHOP PAGE */}
        {page === 'shop' && (
          <>
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="mb-10">
                <h1 className="text-5xl font-bold font-display text-ennys-dark mb-4">
                  Sortiment
                </h1>
                <p className="text-ennys-brown text-lg mb-6">
                  Entdecke unser Angebot für Eigenversorger und Profis
                </p>

                {/* Kategorie Filter */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === null
                        ? 'bg-ennys-green text-ennys-cream'
                        : 'bg-ennys-cream text-ennys-green border border-ennys-green'
                    }`}
                  >
                    Alle
                  </button>
                  {[1, 2, 3].map(catId => {
                    const catName = {
                      1: 'Smoking Zubehör',
                      2: 'Premium Pfeifen',
                      3: 'Growbox Equipment',
                    }[catId];
                    return (
                      <button
                        key={catId}
                        onClick={() => setSelectedCategory(catId)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          selectedCategory === catId
                            ? 'bg-ennys-green text-ennys-cream'
                            : 'bg-ennys-cream text-ennys-green border border-ennys-green'
                        }`}
                      >
                        {catName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ProductList
                products={filteredProducts}
                onAddToCart={addToCart}
              />
            </div>
            <Footer onNavigate={setPage} />
          </>
        )}

        {/* WARENKORB & CHECKOUT */}
        {(page === 'cart' || page === 'checkout') && (
          <>
            <div className="max-w-5xl mx-auto px-6 py-12">
              {/* Schritt-Indikator */}
              <div className="flex justify-between mb-12">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                        checkoutStep >= step
                          ? 'bg-ennys-green text-ennys-cream'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`font-semibold ${
                        checkoutStep >= step ? 'text-ennys-green' : 'text-gray-400'
                      }`}
                    >
                      {step === 1 ? 'WARENKORB' : step === 2 ? 'VERSAND & ADRESSE' : 'ZAHLUNG'}
                    </span>
                    {step < 3 && <div className="flex-1 h-0.5 bg-gray-300 mx-4 mt-2" />}
                  </div>
                ))}
              </div>

              {/* CHECKOUT CONTENT */}
              {checkoutStep === 1 && (
                <Cart
                  items={cartItems}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  onCheckout={() => setCheckoutStep(2)}
                  isCheckoutMode={true}
                />
              )}

              {checkoutStep === 2 && (
                <Checkout
                  step={2}
                  onBack={() => setCheckoutStep(1)}
                  onNext={() => setCheckoutStep(3)}
                />
              )}

              {checkoutStep === 3 && (
                <Checkout
                  step={3}
                  onBack={() => setCheckoutStep(2)}
                  onNext={() => {
                    alert('Bestellung abgeschlossen! 🎉');
                    setCartItems([]);
                    setCheckoutStep(1);
                    setPage('home');
                  }}
                />
              )}
            </div>
            <Footer onNavigate={setPage} />
          </>
        )}
      </main>
    </div>
  );
}
