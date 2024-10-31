const router = require('express').Router()

const companiesController = require('../controllers/companies')
const programmersController = require('../controllers/programmers')
const projectsController = require('../controllers/projects')
const reviewsController = require('../controllers/reviews')

router.get('/', companiesController.getAll)

router.get('/:id', companiesController.getSingle)

router.post('/', companiesController.createCompanies)

router.put('/:id', companiesController.updateCompanies)

router.delete('/:id', companiesController.deleteCompanies)

router.get('/', programmersController.getAll)

router.get('/:id', programmersController.getSingle)

router.post('/', programmersController.createProgrammer)

router.put('/:id', programmersController.updateProgrammer)

router.delete('/:id', programmersController.deleteProgrammer)

router.get('/', projectsController.getAll)

router.get('/:id', projectsController.getSingle)

router.post('/', projectsController.createProject)

router.put('/:id', projectsController.updateProject)

router.delete('/:id', projectsController.deleteProject)

router.get('/', reviewsController.getAll)

router.get('/:id', reviewsController.getSingle)

router.post('/', reviewsController.createReview)

router.put('/:id', reviewsController.updateReview)

router.delete('/:id', reviewsController.deleteReview)

module.exports = router