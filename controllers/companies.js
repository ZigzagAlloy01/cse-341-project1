const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('companies').find()
    await result.toArray().then((companies) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(companies)
    })
}

const getSingle = async (req, res) => {
    const id = req.params.id
    const companyId = new ObjectId(id)
    const result = await mongodb.getDatabase().db().collection('companies').find({ _id: companyId})
    await result.toArray().then((companies) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(companies[0])
    })
}

const createCompanies = async (req, res) => {
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        website: req.body.website,
        programmerIds: req.body.programmerIds,
        size: req.body.size,
        description: req.body.description
    }
    const response = await mongodb.getDatabase().db().collection('companies').insertOne(company)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the company.')
    }
}

const updateCompanies = async (req, res) => {
    const companyId = new ObjectId(req.params.id)
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        website: req.body.website,
        programmerIds: req.body.programmerIds,
        size: req.body.size,
        description: req.body.description
    }
    const response = await mongodb.getDatabase().db().collection('companies').replaceOne({ _id: companyId }, company)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the company.')
    }
}

const deleteCompanies = async (req, res) => {
    const companyId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('companies').deleteOne({ _id: companyId })
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the company.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createCompanies,
    updateCompanies,
    deleteCompanies
}