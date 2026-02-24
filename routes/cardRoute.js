const express = require('express');
const authController = require('../controllers/authController');
const cardController = require('../controllers/cardController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

router.use(authController.protect);
router.use('/:cardId/reviews', reviewRouter);

router
  .route('/')
  .get(cardController.getAllCards)
  .post(authController.restrictTo('vendor', 'admin'), cardController.createCard);

router
  .route('/:id')
  .get(cardController.getCard)
  .patch(authController.restrictTo('admin'), cardController.updateCard)
  .delete(authController.restrictTo('admin', 'vendor'), cardController.deleteCard);

module.exports = router;
