const router = require('express').Router()

const projectsController = require('../controllers/projects')

router.get('/', projectsController.getAll)

router.get('/:id', projectsController.getSingle)

router.post('/', projectsController.createProject)

router.put('/:id', projectsController.updateProject)

router.delete('/:id', projectsController.deleteProject)

module.exports = router
