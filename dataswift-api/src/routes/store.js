const router = require('express').Router();
const auth = require('../middleware/auth');
const Store = require('../models/Store');
const StoreProduct = require('../models/StoreProduct');
const DataPurchase = require('../models/DataPurchase');

// POST /api/store/create
router.post('/create', auth, async (req, res) => {
  try {
    const existing = await Store.findOne({ agentId: req.user._id });
    if (existing) {
      return res.status(400).json({ status: 'error', message: 'You already have a store' });
    }

    const { storeName, description, contactPhone, theme, momoDetails } = req.body;
    if (!storeName) {
      return res.status(400).json({ status: 'error', message: 'Store name is required' });
    }

    // Generate slug
    let storeSlug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const slugExists = await Store.findOne({ storeSlug });
    if (slugExists) {
      storeSlug += '-' + Date.now().toString(36);
    }

    const store = await Store.create({
      agentId: req.user._id,
      storeName,
      storeSlug,
      description,
      contactPhone,
      theme,
      momoDetails,
    });

    res.status(201).json({ status: 'success', data: store });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/store/my-store
router.get('/my-store', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }
    res.json({ status: 'success', data: store });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PUT /api/store/update
router.put('/update', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }

    const { storeName, description, contactPhone, theme, isActive, momoDetails } = req.body;
    if (storeName) store.storeName = storeName;
    if (description !== undefined) store.description = description;
    if (contactPhone) store.contactPhone = contactPhone;
    if (theme) store.theme = { ...store.theme, ...theme };
    if (isActive !== undefined) store.isActive = isActive;
    if (momoDetails) store.momoDetails = momoDetails;

    await store.save();
    res.json({ status: 'success', data: store });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/store/products
router.get('/products', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }
    const products = await StoreProduct.find({ storeId: store._id });
    res.json({ status: 'success', data: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PUT /api/store/products
router.put('/products', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }

    const { products } = req.body;
    if (!Array.isArray(products)) {
      return res.status(400).json({ status: 'error', message: 'Products must be an array' });
    }

    // Upsert each product
    const ops = products.map(p => ({
      updateOne: {
        filter: { storeId: store._id, network: p.network, capacity: p.capacity },
        update: {
          $set: {
            basePrice: p.basePrice,
            sellingPrice: p.sellingPrice,
            isActive: p.isActive !== false,
          },
        },
        upsert: true,
      },
    }));

    if (ops.length > 0) {
      await StoreProduct.bulkWrite(ops);
    }

    const updated = await StoreProduct.find({ storeId: store._id });
    res.json({ status: 'success', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/store/sales
router.get('/sales', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) return res.status(404).json({ status: 'error', message: 'Store not found' });

    const sales = await DataPurchase.find({ 'storeDetails.storeId': store._id })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ status: 'success', data: sales });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/store/earnings
router.get('/earnings', auth, async (req, res) => {
  try {
    const store = await Store.findOne({ agentId: req.user._id });
    if (!store) return res.status(404).json({ status: 'error', message: 'Store not found' });

    res.json({
      status: 'success',
      data: {
        totalEarnings: store.totalEarnings,
        pendingBalance: store.pendingBalance,
        totalSales: store.totalSales,
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
