const mongoose = require('mongoose')
const { Schema } = mongoose

const DevicesCategoriesSchema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, trim: true },
  },
  { collection: 'devices_categories', timestamps: true }
)

const DevicesSchema = new Schema(
  {
    lastContactAt: {
      type: Date,
    },
    isActive: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'DevicesCategories' },
    name: { type: String, trim: true, required: true },
    ssid: { type: String, trim: true, required: false },
    ipv4: { type: String, trim: true, required: false },
    mac: { type: String, trim: true, required: false },
    firmware: { type: String, trim: true, required: false },
    chipModel: { type: String, trim: true, required: false },
    chipRevision: { type: String, trim: true, required: false },
    local: { type: String, trim: true },
    description: { type: String, trim: true },
    note: { type: String, trim: true },
  },
  { collection: 'devices', timestamps: true }
)

const DevicesCategories = mongoose.model(
  'DevicesCategories',
  DevicesCategoriesSchema
)

const Devices = mongoose.model('Devices', DevicesSchema)

module.exports = {
  DevicesCategories,
  Devices,
}
