const { Router } = require('express')
const { Auth0 } = require('../utils/auth0')

const router = Router()
const auth0 = new Auth0()

router.get('/users', async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const token = await auth0.getToken()
    const data = await auth0.getUsers(token)
    res.json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.get('/users/:id', async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const token = await auth0.getToken()
    const data = await auth0.getUser(token, req.params.id)
    res.json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.post('/users', async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const token = await auth0.getToken()
    const data = await auth0.createUser(token, req.body)

    res.json(data)
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.patch('/users/:id', async (req, res) => {
  // #swagger.tags = ['Users']

  try {
    const token = await auth0.getToken()
    const data = await auth0.updateUser(token, req.params.id, req.body)
    res.json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

module.exports = router
