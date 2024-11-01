const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Obtener todas las reseñas
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const reviews = await db.collection('reviews').find().toArray(); // Accede a la colección
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Error retrieving reviews' });
    }
};

// Obtener una sola reseña por ID
const getSingle = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const review = await db.collection('reviews').findOne({ _id: reviewId }); // Busca la reseña
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(review);
    } catch (err) {
        console.error('Error fetching review:', err);
        res.status(500).json({ message: 'Error retrieving review' });
    }
};

// Crear una nueva reseña
const createReview = async (req, res) => {
    const review = {
        programmerId: req.body.programmerId,
        companyId: req.body.companyId,
        projectId: req.body.projectId,
        date: req.body.date,
        feedback: req.body.feedback,
        rating: req.body.rating,
        reviewer: req.body.reviewer,
        position: req.body.position,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('reviews').insertOne(review); // Inserta la reseña
        if (response.acknowledged) {
            res.status(201).json({ message: 'Review created', reviewId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating review' });
        }
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Error creating review' });
    }
};

// Actualizar una reseña
const updateReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    const review = {
        programmerId: req.body.programmerId,
        companyId: req.body.companyId,
        projectId: req.body.projectId,
        date: req.body.date,
        feedback: req.body.feedback,
        rating: req.body.rating,
        reviewer: req.body.reviewer,
        position: req.body.position,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('reviews').replaceOne({ _id: reviewId }, review); // Reemplaza la reseña
        if (response.modifiedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Review not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Error updating review' });
    }
};

// Eliminar una reseña
const deleteReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('reviews').deleteOne({ _id: reviewId }); // Elimina la reseña
        if (response.deletedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Error deleting review' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview,
};
