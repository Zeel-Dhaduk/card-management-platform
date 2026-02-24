const express = require('express');
const statsController = require('../controllers/statsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router
  .get('/vendor/cardStats', authController.restrictTo('vendor'), statsController.getCardStats)
  .get('/vendor/monthlyStats', authController.restrictTo('vendor'), statsController.getMonthlyStats)
  .get(
    '/vendor/cardCategoryStats',
    authController.restrictTo('vendor'),
    statsController.getCardsCategoryStats
  );

router
  .get(
    '/admin/monthlyRevenue',
    authController.restrictTo('admin'),
    statsController.getMonthlyRevenue
  )
  .get(
    '/admin/vendorPerformance',
    authController.restrictTo('admin'),
    statsController.getVendorPerformance
  )
  .get(
    '/admin/cardCategoryStats',
    authController.restrictTo('admin'),
    statsController.getCardCategoryStatsAdmin
  );

module.exports = router;
