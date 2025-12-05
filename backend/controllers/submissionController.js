// controllers/submissionController.js
const Submission = require('../models/submissionModel');

// Créer une nouvelle soumission
exports.createSubmission = async (req, res) => {
    try {
        const { name, email, subject, message, gender, easterEggsFound } = req.body;
        
        // Validation supplémentaire
        if (!name || !email || !subject || !message || !gender) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont requis'
            });
        }

        // Créer la soumission
        const submission = new Submission({
            name,
            email,
            subject,
            message,
            gender,
            easterEggsFound: easterEggsFound || 0,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown'
        });

        // Sauvegarder dans la base de données
        const savedSubmission = await submission.save();

        // Retourner la réponse
        res.status(201).json({
            success: true,
            message: 'Formulaire soumis avec succès !',
            data: {
                id: savedSubmission._id,
                name: savedSubmission.name,
                email: savedSubmission.email,
                subject: savedSubmission.subject,
                gender: savedSubmission.gender,
                easterEggsFound: savedSubmission.easterEggsFound,
                submittedAt: savedSubmission.createdAt
            }
        });

    } catch (error) {
        console.error('❌ Erreur création soumission:', error);
        
        // Gestion des erreurs Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Erreur de validation',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Erreur lors de la soumission du formulaire',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Récupérer toutes les soumissions (admin)
exports.getAllSubmissions = async (req, res) => {
    try {
        const { page = 1, limit = 20, gender, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        
        // Construire la requête
        const query = {};
        if (gender) query.gender = gender;
        
        // Options de pagination
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
        };
        
        // Exécuter la requête avec pagination
        const submissions = await Submission.find(query)
            .sort(options.sort)
            .skip((options.page - 1) * options.limit)
            .limit(options.limit);
        
        // Compter le total
        const total = await Submission.countDocuments(query);
        
        res.json({
            success: true,
            data: submissions,
            pagination: {
                page: options.page,
                limit: options.limit,
                total,
                pages: Math.ceil(total / options.limit)
            }
        });
        
    } catch (error) {
        console.error('❌ Erreur récupération soumissions:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des données'
        });
    }
};

// Obtenir les statistiques
exports.getStats = async (req, res) => {
    try {
        // Statistiques générales
        const total = await Submission.countDocuments();
        
        // Statistiques par genre
        const genderStats = await Submission.aggregate([
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 },
                    avgEasterEggs: { $avg: '$easterEggsFound' }
                }
            }
        ]);
        
        // Statistiques par date (7 derniers jours)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const dailyStats = await Submission.aggregate([
            {
                $match: {
                    createdAt: { $gte: weekAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        
        // Easter eggs totaux
        const totalEasterEggs = await Submission.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$easterEggsFound' }
                }
            }
        ]);
        
        res.json({
            success: true,
            data: {
                total,
                gender: genderStats,
                daily: dailyStats,
                easterEggs: {
                    totalFound: totalEasterEggs[0]?.total || 0,
                    averagePerSubmission: total > 0 ? (totalEasterEggs[0]?.total || 0) / total : 0
                },
                lastSubmission: await Submission.findOne().sort({ createdAt: -1 })
            }
        });
        
    } catch (error) {
        console.error('❌ Erreur statistiques:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des statistiques'
        });
    }
};

// Rechercher une soumission par ID
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Soumission non trouvée'
            });
        }
        
        res.json({
            success: true,
            data: submission
        });
        
    } catch (error) {
        console.error('❌ Erreur récupération soumission:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de la soumission'
        });
    }
};