const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Obtener todas las empresas
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const companies = await db.collection('companies').find().toArray(); // Accede a la colección
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(companies);
    } catch (err) {
        console.error('Error fetching companies:', err);
        res.status(500).json({ message: 'Error retrieving companies' });
    }
};

// Obtener una sola empresa por ID
const getSingle = async (req, res) => {
    const id = req.params.id;
    const companyId = new ObjectId(id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const company = await db.collection('companies').findOne({ _id: companyId }); // Busca la empresa
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(company);
    } catch (err) {
        console.error('Error fetching company:', err);
        res.status(500).json({ message: 'Error retrieving company' });
    }
};

// Crear una nueva empresa
const createCompanies = async (req, res) => {
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        website: req.body.website,
        programmerIds: req.body.programmerIds,
        size: req.body.size,
        description: req.body.description,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('companies').insertOne(company); // Inserta la empresa
        if (response.acknowledged) {
            res.status(201).json({ message: 'Company created', companyId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating company' });
        }
    } catch (err) {
        console.error('Error creating company:', err);
        res.status(500).json({ message: 'Error creating company' });
    }
};

// Actualizar una empresa
const updateCompanies = async (req, res) => {
    const companyId = new ObjectId(req.params.id);
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        website: req.body.website,
        programmerIds: req.body.programmerIds,
        size: req.body.size,
        description: req.body.description,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('companies').updateOne(
            { _id: companyId },
            { $set: company }
        );
        if (response.modifiedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Company not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating company:', err);
        res.status(500).json({ message: 'Error updating company' });
    }
};

// Eliminar una empresa
const deleteCompanies = async (req, res) => {
    const companyId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('companies').deleteOne({ _id: companyId }); // Elimina la empresa
        if (response.deletedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (err) {
        console.error('Error deleting company:', err);
        res.status(500).json({ message: 'Error deleting company' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createCompanies,
    updateCompanies,
    deleteCompanies,
};
