const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('reviews').find()
    await result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(reviews)
    })
}

const getSingle = async (req, res) => {
    const reviewId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('reviews').find({ _id: reviewId})
    await result.toArray().then((reviews) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(reviews[0])
    })
}

const createReview = async (req, res) => {
    const review = {
        programmerId: req.body.programmerId,
        companyId: req.body.programmerId,
        projectId: req.body.programmerId,
        date: req.body.programmerId,
        feedback: req.body.programmerId,
        rating:req.body.programmerId,
        reviewer: req.body.programmerId,
        position: req.body.programmerId
    }
    const response = await mongodb.getDatabase().db().collection('reviews').insertOne(review)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the review.')
    }
}

const updateReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id)
    const review = {
        programmerId: req.body.programmerId,
        companyId: req.body.programmerId,
        projectId: req.body.programmerId,
        date: req.body.programmerId,
        feedback: req.body.programmerId,
        rating:req.body.programmerId,
        reviewer: req.body.programmerId,
        position: req.body.programmerId
    }
    const response = await mongodb.getDatabase().db().collection('reviews').replaceOne({ _id: reviewId }, review)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the review.')
    }
}

const deleteReview = async (req, res) => {
    const reviewId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: reviewId })
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the review.')
    }
}

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
}