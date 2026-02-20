const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

router.use(authController.protect);
router.get('/cardStats', authController.restrictTo('vendor'), userController.getCardStats);

module.exports = router;
