// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true,
        minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
        maxlength: [50, 'Le nom ne peut excéder 50 caractères']
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Adresse email invalide']
    },
    subject: {
        type: String,
        required: [true, 'Le sujet est requis'],
        trim: true,
        minlength: [5, 'Le sujet doit contenir au moins 5 caractères'],
        maxlength: [100, 'Le sujet ne peut excéder 100 caractères']
    },
    message: {
        type: String,
        required: [true, 'Le message est requis'],
        trim: true,
        minlength: [10, 'Le message doit contenir au moins 10 caractères'],
        maxlength: [1000, 'Le message ne peut excéder 1000 caractères']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Le genre est requis']
    },
    ipAddress: {
        type: String,
        default: 'unknown'
    },
    userAgent: {
        type: String,
        default: 'unknown'
    },
    easterEggsFound: {
        type: Number,
        default: 0,
        min: 0,
        max: 2
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour mettre à jour updatedAt
submissionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Submission', submissionSchema);