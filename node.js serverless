// Fichier: api/chat.js  (Serverless Node.js) // Déployer sur Render, Vercel, ou Netlify // Objectif: protéger ta clé OpenAI et répondre aux requêtes Chatbot

const fetch = require('node-fetch'); // ou utiliser global fetch si supporté

module.exports = async (req, res) => { if(req.method !== 'POST') { res.status(405).json({error:'Méthode non autorisée'}); return; }

try { const { message } = req.body; if(!message) return res.status(400).json({error:'Message manquant'});

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages:[{role:'user', content:message}],
    max_tokens:500
  })
});

const data = await response.json();
res.status(200).json(data);

} catch(err) { console.error(err); res.status(500).json({error:'Erreur serveur'}); } };
