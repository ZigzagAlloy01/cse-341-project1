const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('programmers').find()
    await result.toArray().then((programmers) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(programmers)
    })
}

const getSingle = async (req, res) => {
    const programmerId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('programmers').find({ _id: programmerId})
    await result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(clients[0])
    })
}

const createProgrammer = async (req, res) => {
    const programmer = {
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        experienceyears: req.body.experienceyears,
        companyId: req.body.companyId,
        profilePicture: req.body.profilePicture,
        linkedIn: req.body.linkedIn,
        github: req.body.github
    }
    const response = await mongodb.getDatabase().db().collection('programmers').insertOne(programmer)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the programmer.')
    }
}

const updateProgrammer = async (req, res) => {
    const programmerId = new ObjectId(req.params.id)
    const programmer = {
        name: req.body.name,
        email: req.body.email,
        skills: req.body.skills,
        experienceyears: req.body.experienceyears,
        companyId: req.body.companyId,
        profilePicture: req.body.profilePicture,
        linkedIn: req.body.linkedIn,
        github: req.body.github
    }
    const response = await mongodb.getDatabase().db().collection('programmers').replaceOne({ _id: programmerId }, programmer)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the programmer.')
    }
}

const deleteProgrammer = async (req, res) => {
    const programmerId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('programmers').deleteOne({ _id: programmerId })
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the programmer.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createProgrammer,
    updateProgrammer,
    deleteProgrammer
}