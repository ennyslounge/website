import { useState } from 'react';

export default function Checkout({ step, onBack, onNext }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-12">
      {step === 2 && (
        <div>
          <h2 className="text-3xl font-bold font-display text-ennys-dark mb-8">
            Versand & Adresse
          </h2>

          <form onSubmit={handleSubmit} className="max-w-2xl">
            {/* Persönliche Daten */}
            <div className="mb-8">
              <h3 className="font-bold text-ennys-dark mb-4 text-lg">Persönliche Daten</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Vorname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Nachname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
              </div>
            </div>

            {/* Lieferadresse */}
            <div className="mb-8">
              <h3 className="font-bold text-ennys-dark mb-4 text-lg">Lieferadresse</h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Straße & Hausnummer"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zip"
                    placeholder="PLZ"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Stadt"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                  />
                </div>
              </div>
            </div>

            {/* Versandinfo */}
            <div className="mb-8 p-4 bg-ennys-cream rounded-lg">
              <p className="text-ennys-brown text-sm">
                <span className="font-bold">✓ Kostenlos Versand</span> ab 35 € Bestellwert
              </p>
              <p className="text-ennys-brown text-sm mt-2">
                2-5 Werktage Lieferzeit. Diskreter Versand.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 border-2 border-ennys-green text-ennys-green font-bold rounded-lg hover:bg-ennys-cream transition"
              >
                ← Zurück
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-ennys-green text-ennys-cream font-bold rounded-lg hover:bg-ennys-dark transition"
              >
                Zur Zahlung →
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-3xl font-bold font-display text-ennys-dark mb-8">
            Zahlung
          </h2>

          <form onSubmit={handleSubmit} className="max-w-2xl">
            {/* Kartendaten */}
            <div className="mb-8">
              <h3 className="font-bold text-ennys-dark mb-4 text-lg">Kreditkarte</h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Karteninhaber"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green font-mono"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-ennys-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-ennys-green"
                  />
                </div>
              </div>
            </div>

            {/* Sicherheitsinfo */}
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-ennys-light">
              <p className="text-ennys-green text-sm font-bold mb-2">
                ✓ SSL-verschlüsselt & sicher
              </p>
              <p className="text-ennys-brown text-sm">
                Deine Zahlungsdaten werden sicher übertragen und nicht gespeichert.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 border-2 border-ennys-green text-ennys-green font-bold rounded-lg hover:bg-ennys-cream transition"
              >
                ← Zurück
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-ennys-green text-ennys-cream font-bold rounded-lg hover:bg-ennys-dark transition text-lg"
              >
                Bestellung abschließen ✓
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
