const router = require('express').Router()

router.use('/', require('./swagger'))
router.get('/', (req, res) => { res.send('Hello World')})
router.use('/companies', require('./companies'))
router.use('/programmers', require('./programmers'))
router.use('/reviews', require('./reviews'))
router.use('/projects', require('./projects'))

module.exports = router