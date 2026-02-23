const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

router.use(authController.protect);
router
  .get('/vendor/cardStats', authController.restrictTo('vendor'), userController.getCardStats)
  .get('/vendor/monthlyStats', authController.restrictTo('vendor'), userController.getMonthlyStats);

router
  .get(
    '/admin/monthlyRevenue',
    authController.restrictTo('admin'),
    userController.getMonthlyRevenue
  )
  .get(
    '/admin/vendorPerformance',
    authController.restrictTo('admin'),
    userController.getVendorPerformance
  );

module.exports = router;
