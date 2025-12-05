const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

app.post('/api/submit', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('cosmic-form');
        const result = await db.collection('submissions').insertOne(req.body);
        
        res.json({ 
            success: true, 
            message: 'Données sauvegardées!',
            id: result.insertedId 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('✅ Serveur prêt sur http://localhost:3000'));