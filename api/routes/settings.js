const { Router } = require('express')
const router = Router()
const { DevicesCategories } = require('../models/devices')

router.get('/settings/devices/categories', async (req, res) => {
  // #swagger.tags = ['Settings']

  try {
    const data = await DevicesCategories.find().sort({ createdAt: 'asc' })

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.get('/settings/devices/categories/:id', async (req, res) => {
  // #swagger.tags = ['Settings']

  try {
    const data = await DevicesCategories.findById(req.params.id)
    
    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.post('/settings/devices/categories', async (req, res) => {
  // #swagger.tags = ['Settings']

  try {
    const obj = new DevicesCategories(req.body)
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

router.patch('/settings/devices/categories/:id', async (req, res) => {
  // #swagger.tags = ['Settings']

  try {
    const data = await DevicesCategories.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

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

router.delete('/settings/devices/categories/:id', async (req, res) => {
  // #swagger.tags = ['Settings']

  try {
    const obj = await DevicesCategories.findByIdAndDelete(req.params.id)

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
