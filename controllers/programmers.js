const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Obtener todos los programadores
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const programmers = await db.collection('programmers').find().toArray(); // Accede a la colección
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(programmers);
    } catch (err) {
        console.error('Error fetching programmers:', err);
        res.status(500).json({ message: 'Error retrieving programmers' });
    }
};

// Obtener un solo programador por ID
const getSingle = async (req, res) => {
    const programmerId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const programmer = await db.collection('programmers').findOne({ _id: programmerId }); // Busca el programador
        if (!programmer) {
            return res.status(404).json({ message: 'Programmer not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(programmer);
    } catch (err) {
        console.error('Error fetching programmer:', err);
        res.status(500).json({ message: 'Error retrieving programmer' });
    }
};

// Crear un nuevo programador
const createProgrammer = async (req, res) => {
    const programmer = {
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        experienceyears: req.body.experienceyears,
        companyId: req.body.companyId,
        profilePicture: req.body.profilePicture,
        linkedIn: req.body.linkedIn,
        github: req.body.github,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('programmers').insertOne(programmer); // Inserta el programador
        if (response.acknowledged) {
            res.status(201).json({ message: 'Programmer created', programmerId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating programmer' });
        }
    } catch (err) {
        console.error('Error creating programmer:', err);
        res.status(500).json({ message: 'Error creating programmer' });
    }
};

// Actualizar un programador
const updateProgrammer = async (req, res) => {
    const programmerId = new ObjectId(req.params.id);
    const programmer = {
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        experienceyears: req.body.experienceyears,
        companyId: req.body.companyId,
        profilePicture: req.body.profilePicture,
        linkedIn: req.body.linkedIn,
        github: req.body.github,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('programmers').replaceOne({ _id: programmerId }, programmer); // Reemplaza el programador
        if (response.modifiedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Programmer not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating programmer:', err);
        res.status(500).json({ message: 'Error updating programmer' });
    }
};

// Eliminar un programador
const deleteProgrammer = async (req, res) => {
    const programmerId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('programmers').deleteOne({ _id: programmerId }); // Elimina el programador
        if (response.deletedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Programmer not found' });
        }
    } catch (err) {
        console.error('Error deleting programmer:', err);
        res.status(500).json({ message: 'Error deleting programmer' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProgrammer,
    updateProgrammer,
    deleteProgrammer,
};
