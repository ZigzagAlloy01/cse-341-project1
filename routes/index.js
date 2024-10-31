const router = require('express').Router()

router.use('/', require('./swagger'))
router.get('/', (req, res) => { res.send('Hello World')})
router.use('/programmers', require('./programmers'))

module.exports = router