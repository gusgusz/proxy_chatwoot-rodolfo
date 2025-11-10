const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    const messages = req.body.messages;
    const incomingMessages = messages.filter(message => message.type === 'incoming');
    
    incomingMessages.forEach(message => {
        axios.post('https://n8n-instance/webhook-url', message)
            .then(response => console.log('Message sent to n8n:', response.data))
            .catch(error => console.error('Error sending message to n8n:', error));
    });

    res.status(200).send('Messages processed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});