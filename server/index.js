require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static (optionnel - si tu veux servir site depuis backend)
app.use('/', express.static(path.join(__dirname, '../Senpay')));

// --- Simple "member" in-memory store (for demo) ---
const members = {}; // {username: {name, id}}

app.post('/api/join', (req, res) => {
  const { username, displayName } = req.body;
  if (!username || !displayName) return res.status(400).json({ error:'missing' });
  members[username] = { id: username, name: displayName, joinedAt: Date.now() };
  return res.json({ ok:true, member: members[username] });
});

app.get('/api/members', (req, res) => {
  return res.json(Object.values(members));
});

// --- File upload setup for gallery ---
const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g,'_');
    cb(null, safe);
  }
});
const upload = multer({ storage });
const fs = require('fs');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.post('/api/upload', upload.single('media'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no-file' });
  const url = `/uploads/${req.file.filename}`;
  return res.json({ ok:true, url });
});

app.use('/uploads', express.static(uploadDir));

// --- PayDunya invoice creation (SERVER SIDE) ---
// Note: This is a simple example using (hypothetical) PayDunya endpoints.
// Use the official PayDunya API docs for exact endpoints & required headers.
app.post('/api/paydunya/create', async (req, res) => {
  try {
    const { amount, name, email } = req.body;
    if (!amount || !name || !email) return res.status(400).json({ error:'missing' });

    // Use environment keys
    const PUBLIC_KEY = process.env.PAYDUNYA_PUBLIC;
    const PRIVATE_KEY = process.env.PAYDUNYA_PRIVATE;
    const TOKEN = process.env.PAYDUNYA_TOKEN;

    // Example payload — adapt with PayDunya real API structure
    const payload = {
      total_amount: parseFloat(amount),
      invoice_items: [{ name: 'Paiement Senpay', quantity: 1, unit_price: parseFloat(amount) }],
      payer: { name, email }
    };

    // Example endpoint — replace with real one from PayDunya docs
    const resp = await axios.post('https://app.paydunya.com/v1/checkout-invoice/create', payload, {
      headers: {
        'Authorization': 'Token token='+PUBLIC_KEY,
        'Content-Type': 'application/json'
      }
    });

    // resp.data should contain invoice url
    return res.json({ ok:true, data: resp.data });
  } catch (err) {
    console.error('PayDunya error', err.response?.data || err.message);
    return res.status(500).json({ error:'paydunya-failed', detail: err.response?.data || err.message });
  }
});

// --- Socket.IO chat ---
// Rooms + simple auth (username)
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on('join-room', ({ room, username, displayName }) => {
    socket.join(room);
    socket.username = username;
    socket.displayName = displayName;
    io.to(room).emit('system', { msg:`${displayName} a rejoint la discussion.` });
  });

  socket.on('message', (data) => {
    // data: { room, text }
    io.to(data.room).emit('message', { from: socket.displayName || socket.username, text: data.text, ts: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
});

// Start
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
