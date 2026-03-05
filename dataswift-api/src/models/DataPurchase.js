const mongoose = require('mongoose');

const DataPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  network: {
    type: String,
    enum: ['YELLO', 'TELECEL', 'AT_PREMIUM'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  datamartReference: String,
  datamartOrderId: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  purchaseSource: {
    type: String,
    enum: ['direct', 'store'],
    default: 'direct'
  },
  storeDetails: {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    storeName: String,
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sellingPrice: Number,
    agentProfit: Number,
    customerName: String,
    customerPhone: String
  },
  balanceBefore: Number,
  balanceAfter: Number,
  failureReason: String,
  refundedAt: Date
}, {
  timestamps: true
});

DataPurchaseSchema.index({ userId: 1, createdAt: -1 });
DataPurchaseSchema.index({ reference: 1 });
DataPurchaseSchema.index({ datamartReference: 1 });
DataPurchaseSchema.index({ status: 1 });
DataPurchaseSchema.index({ 'storeDetails.storeId': 1, createdAt: -1 });

module.exports = mongoose.model('DataPurchase', DataPurchaseSchema);
