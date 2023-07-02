const { Router } = require('express')
const router = Router()
const { Data } = require('../models/data')

router.get('/data', async (req, res) => {
  // #swagger.tags = ['Data']

  try {
    const data = await Data.find().sort({ createdAt: 'asc' })

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.get('/data/:id', async (req, res) => {
  // #swagger.tags = ['Data']

  try {
    const data = await Data.findById(req.params.id)

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.post('/data', async (req, res) => {
  // #swagger.tags = ['Data']

  try {
    const obj = new Data(req.body)
    const data = await obj.save()

    res.status(201).json({
      status: 'Success',
      data,
    })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.patch('/data/:id', async (req, res) => {
  // #swagger.tags = ['Data']

  try {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'Success',
      data,
    })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.delete('/data/:id', async (req, res) => {
  // #swagger.tags = ['Data']
  try {
    const obj = await Data.findByIdAndDelete(req.params.id)

    if (!obj)
      res.status(404).json({
        status: 'No item found',
      })
    res.status(200).json({
      status: 'Success',
    })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

module.exports = router
