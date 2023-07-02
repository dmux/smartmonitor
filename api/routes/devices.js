const { Router } = require('express')
const router = Router()
const { Devices } = require('../models/devices')
const { Data } = require('../models/data')

router.get('/devices/aggregate', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const data = await Devices.find()
      .populate('categoryId')
      .sort({ createdAt: -1 })

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.get('/devices', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const data = await Devices.find().sort({ createdAt: 'asc' })

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.get('/devices/:id', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const obj = await Devices.findById(req.params.id)

    res.status(200).json({ data: obj })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

router.post('/devices', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const obj = new Devices(req.body)
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

router.patch('/devices/:id', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const data = await Devices.findByIdAndUpdate(req.params.id, req.body, {
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

router.delete('/devices/:id', async (req, res) => {
  // #swagger.tags = ['Devices']
  try {
    const obj = await Devices.findByIdAndDelete(req.params.id)

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

router.get('/devices/logs/:id', async (req, res) => {
  // #swagger.tags = ['Devices']

  try {
    const data = await Data.find({ deviceId: req.params.id })
      .sort({
        createdAt: 'desc',
      })
      .limit(480)

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      error: err,
    })
  }
})

module.exports = router
