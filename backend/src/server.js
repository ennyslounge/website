import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import db from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// DATENBANK INITIALISIEREN (beim Start)
// ==========================================
async function start() {
  await db.init();

  // ==========================================
  // API ROUTES
  // ==========================================

  // 1️⃣ HEALTH CHECK (Server läuft?)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'Server läuft! ✓', timestamp: new Date() });
  });

  // 2️⃣ KATEGORIEN
  app.get('/api/categories', async (req, res) => {
    try {
      await db.read();
      res.json(db.data.categories);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Kategorien' });
    }
  });

  // 3️⃣ PRODUKTE
  app.get('/api/products', async (req, res) => {
    try {
      await db.read();
      const { online_only, category_id } = req.query;

      let products = db.data.products;

      // Filter: Nur Online-Produkte?
      if (online_only === 'true') {
        products = products.filter(p => p.online_available);
      }

      // Filter: Nach Kategorie?
      if (category_id) {
        products = products.filter(p => p.category_id === parseInt(category_id));
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen der Produkte' });
    }
  });

  // 4️⃣ EINZELNES PRODUKT
  app.get('/api/products/:id', async (req, res) => {
    try {
      await db.read();
      const product = db.data.products.find(p => p.id === parseInt(req.params.id));

      if (!product) {
        return res.status(404).json({ error: 'Produkt nicht gefunden' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Abrufen des Produkts' });
    }
  });

  // 5️⃣ NEUES PRODUKT HINZUFÜGEN
  app.post('/api/products', async (req, res) => {
    try {
      await db.read();

      const newProduct = {
        id: Math.max(...db.data.products.map(p => p.id), 0) + 1,
        name: req.body.name,
        description: req.body.description || '',
        price: parseFloat(req.body.price),
        stock: req.body.stock || 0,
        category_id: req.body.category_id || null,
        online_available: req.body.online_available !== false,
        offline_available: req.body.offline_available !== false,
        persona_tags: req.body.persona_tags || [],
      };

      db.data.products.push(newProduct);
      await db.write();

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Erstellen des Produkts' });
    }
  });

  // 6️⃣ PRODUKT AKTUALISIEREN
  app.put('/api/products/:id', async (req, res) => {
    try {
      await db.read();
      const productIndex = db.data.products.findIndex(p => p.id === parseInt(req.params.id));

      if (productIndex === -1) {
        return res.status(404).json({ error: 'Produkt nicht gefunden' });
      }

      // Nur die Felder updaten, die geschickt wurden
      db.data.products[productIndex] = {
        ...db.data.products[productIndex],
        ...req.body,
        id: parseInt(req.params.id), // ID nicht ändern!
      };

      await db.write();
      res.json(db.data.products[productIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Aktualisieren des Produkts' });
    }
  });

  // 7️⃣ PRODUKT LÖSCHEN
  app.delete('/api/products/:id', async (req, res) => {
    try {
      await db.read();
      const productIndex = db.data.products.findIndex(p => p.id === parseInt(req.params.id));

      if (productIndex === -1) {
        return res.status(404).json({ error: 'Produkt nicht gefunden' });
      }

      const deleted = db.data.products.splice(productIndex, 1);
      await db.write();

      res.json({ message: 'Produkt gelöscht', deleted: deleted[0] });
    } catch (error) {
      res.status(500).json({ error: 'Fehler beim Löschen des Produkts' });
    }
  });

  // ==========================================
  // ERROR HANDLER
  // ==========================================
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server-Fehler' });
  });

  // ==========================================
  // SERVER STARTEN
  // ==========================================
  app.listen(PORT, () => {
    console.log(`\n🚀 Server läuft auf http://localhost:${PORT}`);
    console.log(`📄 Datenbank: backend/db.json`);
    console.log(`\n💡 Test mit:\n   curl http://localhost:${PORT}/api/health\n`);
  });
}

start().catch(console.error);
