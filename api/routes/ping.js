const { Router } = require('express')

const router = Router()

router.get('/test', (req, res) => {
  res.json({ ping: 'pong' })
})

module.exports = router
