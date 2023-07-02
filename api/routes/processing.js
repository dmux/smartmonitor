const { Router } = require('express')
const router = Router()
const { Devices } = require('../models/devices')
const { Data } = require('../models/data')

router.patch('/processing/device/status/:id', async (req, res) => {
  // #swagger.tags = ['Processing']

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

router.post('/processing/data', async (req, res) => {
  // #swagger.tags = ['Processing']

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

module.exports = router
