const router = require('express').Router()

const companiesController = require('../controllers/companies')

router.get('/', companiesController.getAll)

router.get('/:id', companiesController.getSingle)

router.post('/', companiesController.createCompanies)

router.put('/:id', companiesController.updateCompanies)

router.delete('/:id', companiesController.deleteCompanies)

module.exports = router