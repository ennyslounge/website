# Enny's Lounge Online-Shop 6.0

Dein Online-Shop zum selbst programmieren und verstehen. **Mit JSON-Datenbank (LowDB)** ✨

## 📁 Projektstruktur

```
ennys-online-shop/
├── backend/              # Node.js + Express Server
│   ├── src/
│   │   ├── server.js         # Hauptserver & API-Routes
│   │   ├── config/
│   │   │   └── database.js   # LowDB Verbindung
│   │   ├── models/       # (später)
│   │   └── routes/       # (später)
│   ├── db.json           # 🎯 DEINE DATENBANK (einfach JSON!)
│   ├── .env              # Konfiguration
│   └── package.json      # Dependencies
├── frontend/             # React App (später)
└── README.md            # Diese Datei
```

## 🚀 Schnelleinstieg (SUPER EINFACH!)

### 1️⃣ Backend starten

```bash
cd backend
npm install
npm start
```

**Das wars!** ✓ Keine Datenbank-Installation nötig!

Server läuft dann auf: http://localhost:3001

### 2️⃣ Testen

```bash
# Health Check
curl http://localhost:3001/api/health

# Alle Produkte abrufen
curl http://localhost:3001/api/products

# Oder im Browser öffnen:
# http://localhost:3001/api/products
```

## 📄 Die Datenbank: `backend/db.json`

Das ist deine ganze Datenbank! **Eine einfache JSON-Datei.**

```json
{
  "categories": [...],
  "products": [...],
  "users": [...],
  "orders": [...]
}
```

**Vorteil**: Du kannst sie mit jedem Editor öffnen und direkt sehen/ändern! 👀

## 🔄 API-Endpoints

### Kategorien
```
GET    /api/categories              # Alle Kategorien
```

### Produkte
```
GET    /api/products                # Alle Produkte
GET    /api/products?online_only=true  # Nur Online-Produkte
GET    /api/products?category_id=1     # Nur Kategorie 1
GET    /api/products/:id            # Ein Produkt
POST   /api/products                # Neues Produkt
PUT    /api/products/:id            # Produkt ändern
DELETE /api/products/:id            # Produkt löschen
```

## 💻 Beispiele (copy-paste)

### Alle Produkte abrufen
```bash
curl http://localhost:3001/api/products
```

### Neues Produkt hinzufügen
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wasserpfeife Classic",
    "description": "Hochwertige Wasserpfeife",
    "price": 29.99,
    "stock": 15,
    "category_id": 1,
    "online_available": true
  }'
```

### Produkt ändern (z.B. Preis)
```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 34.99}'
```

### Produkt löschen
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

## 🎯 Wie die Code funktioniert

### `server.js` – Die Schaltzentrale
- Startet den Server auf Port 3001
- Definiert alle API-Routes (GET, POST, PUT, DELETE)
- Jede Route lädt `db.json`, macht was damit, und speichert es

### `db.json` – Deine Datenbank
- Pure JSON-Datei
- Lädt sich automatisch beim Server-Start
- Alle Änderungen werden sofort gespeichert

### `database.js` – Die Verbindung
- Verbindet Server mit `db.json`
- LowDB macht das ganz einfach

## 🧪 Datenbank direkt bearbeiten

Du kannst `db.json` auch direkt im Editor öffnen und ändern! 
(Aber Vorsicht: Server muss neu gestartet werden, damit er die Änderungen sieht)

Beispiel: Ein Produkt direkt hinzufügen

```json
{
  "products": [
    {
      "id": 4,
      "name": "Neu Hinzugefügt",
      "price": 99.99,
      "stock": 10,
      "category_id": 1,
      "online_available": true
    }
  ]
}
```

Dann Server neu starten: `npm start`

## 🔍 Was steht schon in der Datenbank?

**3 Kategorien:**
1. Smoking Zubehör (Frank-Achse)
2. Premium Pfeifen (Sven-Achse)
3. Growbox Equipment (Frank-Achse)

**3 Beispiel-Produkte:**
1. Griptape XL (4,99€)
2. Meerschaum Pfeife (49,99€)
3. LED Grow Light (189,99€)

## 🎓 Verstehen, wie es läuft

**Beim GET-Request** (z.B. `/api/products`):
1. Route empfängt Request
2. `db.read()` – Lädt `db.json`
3. Filtert die Produkte
4. Sendet JSON zurück

**Beim POST-Request** (neues Produkt):
1. Route empfängt Request + Daten
2. `db.read()` – Lädt `db.json`
3. Neues Produkt erstellen (neue ID)
4. Zu Array hinzufügen
5. `db.write()` – Speichert in `db.json`
6. Sendet neues Produkt zurück

## 🚨 Probleme?

**"Server startet nicht"**
→ Terminal-Fenster mit Fehler-Meldung zeigen

**"API antwortet nicht"**
→ Läuft der Server? (`npm start` im backend-Verzeichnis)

**"Port 3001 wird blockiert"**
→ PORT in `.env` ändern: `PORT=3002`

## 📈 Nächste Schritte

- [ ] **Phase 1**: Benutzer-Authentifizierung (Registrierung, Login)
- [ ] **Phase 2**: Warenkorb (Items hinzufügen, entfernen)
- [ ] **Phase 3**: Checkout & Bestellungen
- [ ] **Phase 4**: Frontend (React) verbinden
- [ ] **Phase 5**: Admin-Panel

---

**💡 Hinweis**: LowDB ist super zum Lernen! Später können wir zu einer echten Datenbank migrieren, aber jetzt lernst du die Logik ohne Komplexität. 🚀
