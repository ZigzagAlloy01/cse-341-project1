const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Obtener todos los proyectos
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const projects = await db.collection('projects').find().toArray(); // Accede a la colección
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
};

// Obtener un solo proyecto por ID
const getSingle = async (req, res) => {
    const projectId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const project = await db.collection('projects').findOne({ _id: projectId }); // Busca el proyecto
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(project);
    } catch (err) {
        console.error('Error fetching project:', err);
        res.status(500).json({ message: 'Error retrieving project' });
    }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    const project = {
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        programmerIds: req.body.programmerIds,
        companyId: req.body.companyId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('projects').insertOne(project); // Inserta el proyecto
        if (response.acknowledged) {
            res.status(201).json({ message: 'Project created', projectId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating project' });
        }
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Error creating project' });
    }
};

// Actualizar un proyecto
const updateProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id);
    const project = {
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        programmerIds: req.body.programmerIds,
        companyId: req.body.companyId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
    };
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('projects').replaceOne({ _id: projectId }, project); // Reemplaza el proyecto
        if (response.modifiedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Project not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: 'Error updating project' });
    }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDatabase(); // Obtén la base de datos
        const response = await db.collection('projects').deleteOne({ _id: projectId }); // Elimina el proyecto
        if (response.deletedCount > 0) {
            res.status(204).send(); // Sin contenido
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ message: 'Error deleting project' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProject,
    updateProject,
    deleteProject,
};
