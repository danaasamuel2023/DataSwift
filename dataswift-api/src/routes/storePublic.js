const router = require('express').Router();
const Store = require('../models/Store');
const StoreProduct = require('../models/StoreProduct');
const User = require('../models/User');
const DataPurchase = require('../models/DataPurchase');
const paystackService = require('../services/paystackService');
const datamartService = require('../services/datamartService');
const { generateReference } = require('../utils/helpers');

// GET /api/shop/:slug
router.get('/:slug', async (req, res) => {
  try {
    const store = await Store.findOne({ storeSlug: req.params.slug, isActive: true })
      .select('storeName storeSlug description theme contactPhone');
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }
    res.json({ status: 'success', data: store });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/shop/:slug/products
router.get('/:slug/products', async (req, res) => {
  try {
    const store = await Store.findOne({ storeSlug: req.params.slug, isActive: true });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }
    const products = await StoreProduct.find({ storeId: store._id, isActive: true })
      .select('network capacity sellingPrice');
    res.json({ status: 'success', data: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/shop/:slug/buy
router.post('/:slug/buy', async (req, res) => {
  try {
    const { network, capacity, phoneNumber } = req.body;
    if (!network || !capacity || !phoneNumber) {
      return res.status(400).json({ status: 'error', message: 'Network, capacity, and phone number required' });
    }

    const store = await Store.findOne({ storeSlug: req.params.slug, isActive: true });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }

    const product = await StoreProduct.findOne({
      storeId: store._id,
      network,
      capacity,
      isActive: true,
    });
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not available' });
    }

    const reference = generateReference('SHP');
    const agent = await User.findById(store.agentId);

    const callbackUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/shop/${store.storeSlug}?payment=success`;

    const paystack = await paystackService.initializeTransaction({
      email: agent.email,
      amount: product.sellingPrice,
      reference,
      callback_url: callbackUrl,
      metadata: {
        storeId: store._id.toString(),
        network,
        capacity,
        phoneNumber,
        sellingPrice: product.sellingPrice,
        basePrice: product.basePrice,
        type: 'store_purchase',
      },
    });

    res.json({
      status: 'success',
      data: { authorization_url: paystack.authorization_url, reference },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/shop/:slug/verify-payment
router.get('/:slug/verify-payment', async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ status: 'error', message: 'Reference required' });
    }

    const verification = await paystackService.verifyTransaction(reference);
    if (verification.status !== 'success') {
      return res.status(400).json({ status: 'error', message: 'Payment not verified' });
    }

    const meta = verification.metadata;
    const store = await Store.findById(meta.storeId);
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }

    // Check if already processed
    const existing = await DataPurchase.findOne({ reference });
    if (existing) {
      return res.json({ status: 'success', message: 'Already processed', data: existing });
    }

    const agentProfit = meta.sellingPrice - meta.basePrice;

    // Create purchase
    const purchase = await DataPurchase.create({
      userId: store.agentId,
      phoneNumber: meta.phoneNumber,
      network: meta.network,
      capacity: meta.capacity,
      price: meta.sellingPrice,
      costPrice: meta.basePrice,
      reference,
      status: 'pending',
      purchaseSource: 'store',
      storeDetails: {
        storeId: store._id,
        agentProfit,
        sellingPrice: meta.sellingPrice,
      },
    });

    // Send to DataMart
    try {
      const result = await datamartService.purchaseData({
        network: meta.network,
        capacity: meta.capacity,
        phoneNumber: meta.phoneNumber,
      });
      purchase.datamartReference = result?.reference || result?.orderReference;
      purchase.status = 'processing';
      await purchase.save();

      // Credit agent
      await Store.findOneAndUpdate(
        { _id: store._id },
        {
          $inc: {
            totalEarnings: agentProfit,
            pendingBalance: agentProfit,
            totalSales: 1,
          },
        }
      );
    } catch (err) {
      purchase.status = 'failed';
      await purchase.save();
    }

    res.json({ status: 'success', data: purchase });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
