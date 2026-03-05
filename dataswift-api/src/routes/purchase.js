const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const DataPurchase = require('../models/DataPurchase');
const Settings = require('../models/Settings');
const datamartService = require('../services/datamartService');
const referralService = require('../services/referralService');
const { generateReference } = require('../utils/helpers');

// GET /api/purchase/packages
router.get('/packages', auth, async (req, res) => {
  try {
    const { network } = req.query;
    const settings = await Settings.getSettings();
    const sellingPrices = settings?.pricing?.sellingPrices || {};

    const packages = await datamartService.getPackages(network);

    // Map packages with selling prices
    const result = packages.map(pkg => {
      const networkPrices = sellingPrices[pkg.network] || {};
      const sellingPrice = networkPrices[String(pkg.capacity)];
      return {
        network: pkg.network,
        capacity: pkg.capacity,
        price: sellingPrice || pkg.price,
        costPrice: pkg.price,
        validity: pkg.validity,
      };
    }).filter(pkg => pkg.price > 0);

    res.json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/purchase/buy
router.post('/buy', auth, async (req, res) => {
  try {
    const { network, capacity, phoneNumber } = req.body;
    if (!network || !capacity || !phoneNumber) {
      return res.status(400).json({ status: 'error', message: 'Network, capacity, and phone number are required' });
    }

    const settings = await Settings.getSettings();
    const sellingPrices = settings?.pricing?.sellingPrices || {};
    const networkPrices = sellingPrices[network] || {};
    const price = networkPrices[String(capacity)];

    if (!price) {
      return res.status(400).json({ status: 'error', message: 'Package not available' });
    }

    // Check balance
    const user = await User.findById(req.user._id);
    if (user.walletBalance < price) {
      return res.status(400).json({ status: 'error', message: 'Insufficient balance' });
    }

    // Debit wallet atomically
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, walletBalance: { $gte: price } },
      { $inc: { walletBalance: -price } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ status: 'error', message: 'Insufficient balance' });
    }

    const reference = generateReference('PUR');

    // Create transaction
    await Transaction.create({
      userId: user._id,
      type: 'purchase',
      amount: price,
      balanceBefore: updatedUser.walletBalance + price,
      balanceAfter: updatedUser.walletBalance,
      status: 'completed',
      reference,
      description: `${capacity}GB ${network} data to ${phoneNumber}`,
    });

    // Create purchase record
    const purchase = await DataPurchase.create({
      userId: user._id,
      phoneNumber,
      network,
      capacity,
      price,
      reference,
      status: 'pending',
      purchaseSource: 'direct',
    });

    // Send to DataMart
    try {
      const result = await datamartService.purchaseData({ network, capacity, phoneNumber });
      purchase.datamartReference = result?.reference || result?.orderReference;
      purchase.status = 'processing';
      await purchase.save();
    } catch (err) {
      purchase.status = 'failed';
      await purchase.save();
      // Refund
      await User.findOneAndUpdate(
        { _id: user._id },
        { $inc: { walletBalance: price } }
      );
      await Transaction.create({
        userId: user._id,
        type: 'refund',
        amount: price,
        balanceBefore: updatedUser.walletBalance,
        balanceAfter: updatedUser.walletBalance + price,
        status: 'completed',
        reference: generateReference('RFD'),
        description: `Refund for failed ${capacity}GB ${network} purchase`,
      });
      return res.status(500).json({ status: 'error', message: 'Purchase failed. Your balance has been refunded.' });
    }

    // Process referral commission
    referralService.processCommission(user._id, price, purchase._id);

    res.json({ status: 'success', message: 'Purchase submitted', data: purchase });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/purchase/history
router.get('/history', auth, async (req, res) => {
  try {
    const purchases = await DataPurchase.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ status: 'success', data: purchases });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/purchase/status/:ref
router.get('/status/:ref', auth, async (req, res) => {
  try {
    const purchase = await DataPurchase.findOne({ reference: req.params.ref, userId: req.user._id });
    if (!purchase) {
      return res.status(404).json({ status: 'error', message: 'Purchase not found' });
    }
    res.json({ status: 'success', data: purchase });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
