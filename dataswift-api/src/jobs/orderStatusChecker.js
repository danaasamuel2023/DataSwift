const DataPurchase = require('../models/DataPurchase');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const datamartService = require('../services/datamartService');
const { generateReference } = require('../utils/helpers');

async function checkPendingOrders() {
  try {
    const pending = await DataPurchase.find({
      status: { $in: ['pending', 'processing'] },
      datamartReference: { $exists: true, $ne: null },
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
    }).limit(50);

    for (const order of pending) {
      try {
        const result = await datamartService.checkOrderStatus(order.datamartReference);
        if (!result) continue;

        const newStatus = result.status?.toLowerCase();
        if (newStatus === 'completed' || newStatus === 'success') {
          order.status = 'completed';
          await order.save();
        } else if (newStatus === 'failed' || newStatus === 'rejected') {
          order.status = 'failed';
          await order.save();

          // Refund for direct purchases
          if (order.purchaseSource === 'direct') {
            const user = await User.findOneAndUpdate(
              { _id: order.userId },
              { $inc: { walletBalance: order.price } },
              { new: true }
            );
            if (user) {
              await Transaction.create({
                userId: order.userId,
                type: 'refund',
                amount: order.price,
                balanceBefore: user.walletBalance - order.price,
                balanceAfter: user.walletBalance,
                status: 'completed',
                reference: generateReference('RFD'),
                description: `Auto-refund: failed ${order.capacity}GB ${order.network} order`,
              });
            }
          }
        }
      } catch (err) {
        // Skip individual order errors
      }
    }
  } catch (err) {
    console.error('Order status checker error:', err.message);
  }
}

// Run every 2 minutes
function startOrderStatusChecker() {
  console.log('Order status checker started');
  setInterval(checkPendingOrders, 2 * 60 * 1000);
  // Run immediately on startup
  setTimeout(checkPendingOrders, 10000);
}

module.exports = { startOrderStatusChecker };
