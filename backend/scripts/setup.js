// scripts/setup.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmic-form';

async function setupDatabase() {
    try {
        console.log('🔧 Configuration de la base de données...');
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connecté à MongoDB');
        
        // Vérifier si la collection existe
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(col => col.name === 'submissions');
        
        if (collectionExists) {
            console.log('📁 Collection "submissions" existe déjà');
        } else {
            console.log('📁 Collection "submissions" sera créée automatiquement');
        }
        
        // Ajouter des données de test (optionnel)
        const Submission = require('../models/submissionModel');
        
        const testCount = await Submission.countDocuments();
        if (testCount === 0) {
            console.log('📝 Ajout de données de test...');
            
            await Submission.create([
                {
                    name: "Alice Dubois",
                    email: "alice@example.com",
                    subject: "Premier contact cosmique",
                    message: "Bonjour, je suis intéressée par les voyages interstellaires!",
                    gender: "female",
                    easterEggsFound: 1
                },
                {
                    name: "Bob Martin",
                    email: "bob@example.com",
                    subject: "Question technique",
                    message: "Comment fonctionne le système de propulsion?",
                    gender: "male",
                    easterEggsFound: 0
                }
            ]);
            
            console.log('✅ Données de test ajoutées');
        }
        
        console.log('✨ Configuration terminée avec succès!');
        console.log(`📊 Base de données: ${mongoURI}`);
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Erreur lors de la configuration:', error.message);
        process.exit(1);
    }
}

setupDatabase();