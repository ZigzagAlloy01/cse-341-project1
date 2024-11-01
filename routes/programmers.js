const router = require('express').Router()

const programmersController = require('../controllers/programmers')

router.get('/', programmersController.getAll)

router.get('/:id', programmersController.getSingle)

router.post('/', programmersController.createProgrammer)

router.put('/:id', programmersController.updateProgrammer)

router.delete('/:id', programmersController.deleteProgrammer)

module.exports = router