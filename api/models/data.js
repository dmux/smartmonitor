const mongoose = require('mongoose')
const { Schema } = mongoose

const DataSchema = new Schema(
  {
    deviceId: { type: Schema.Types.ObjectId, ref: 'Devices', required: true },
    identifier: { type: String, trim: true, required: true },
    value: { type: String, trim: true, required: true },
  },
  { collection: 'data', timestamps: true }
)

const Data = mongoose.model('Data', DataSchema)

module.exports = {
  Data,
}
