const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 1. Pega a URL do n8n do docker-compose
const N8N_URL = process.env.N8N_WEBHOOK_URL;
const PORT = process.env.PORT || 3000;

if (!N8N_URL) {
  console.error('Erro: A variável de ambiente N8N_WEBHOOK_URL não foi definida.');
  process.exit(1);
}

// 2. Ouve no endpoint /webhook
app.post('/webhook', async (req, res) => {
  const payload = req.body;

  // 3. A LÓGICA DE FILTRO CORRETA
  if (payload.event === 'message_created' && payload.message_type === 'incoming') {
    
    console.log('Filtro: Mensagem de cliente. Encaminhando para n8n...');
    
    // 4. Envia o payload *inteiro* para o n8n
    axios.post(N8N_URL, payload).catch(err => {
      console.error('Erro ao encaminhar para n8n:', err.message);
    });

  } else {
    console.log('Filtro: Mensagem do bot/sistema ignorada.');
  }

  // Responde imediatamente 200 (OK) para o Chatwoot
  res.status(200).send('OK');
});

// Endpoint de "saúde" só para testar
app.get('/', (req, res) => {
  res.send('Proxy Chatwoot-n8n está rodando.');
});

app.listen(PORT, () => {
  console.log(`Proxy (com filtro) rodando na porta ${PORT}`);
});
