require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://data-swift-drab.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200,
  message: { status: 'error', message: 'Too many requests. Please try again later.' }
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'dataswift-api', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/user', require('./src/routes/user'));
app.use('/api/wallet', require('./src/routes/wallet'));
app.use('/api/purchase', require('./src/routes/purchase'));
app.use('/api/store', require('./src/routes/store'));
app.use('/api/shop', require('./src/routes/storePublic'));
app.use('/api/withdrawal', require('./src/routes/withdrawal'));
app.use('/api/referral', require('./src/routes/referral'));
app.use('/api/webhook', require('./src/routes/webhook'));
app.use('/api/admin', require('./src/routes/admin'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`DataSwift API running on port ${PORT}`);

  // Start background jobs
  const { startOrderStatusChecker } = require('./src/jobs/orderStatusChecker');
  startOrderStatusChecker();
});
