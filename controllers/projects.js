const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('projects').find()
    await result.toArray().then((programmers) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(programmers)
    })
}

const getSingle = async (req, res) => {
    const projectId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('projects').find({ _id: projectId})
    await result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(clients[0])
    })
}

const createProject = async (req, res) => {
    const project = {
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        programmerIds: req.body.programmerIds,
        companyId: req.body.companyId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status
    }
    const response = await mongodb.getDatabase().db().collection('projects').insertOne(project)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the project.')
    }
}

const updateProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id)
    const project = {
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        programmerIds: req.body.programmerIds,
        companyId: req.body.companyId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status
    }
    const response = await mongodb.getDatabase().db().collection('projects').replaceOne({ _id: projectId }, project)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the project.')
    }
}

const deleteProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('projects').deleteOne({ _id: projectId })
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the project.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createProject,
    updateProject,
    deleteProject
}