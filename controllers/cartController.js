const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItem');
const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');

exports.addToCart = catchAsync(async (req, res) => {
  const { cardId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id });
  }
  const card = await Card.findById(cardId);
  let cartItem = await CartItem.findOne({ cart: cart._id, card: cardId }).populate('card', {
    title: 1,
  });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({
      cart: cart._id,
      card: cardId,
      quantity: quantity,
    });
  }

  cart.totalAmount += card.price * quantity;

  res.status(200).json({
    status: 'success',
    message: 'Item added to cart',
    data: cartItem,
  });
});
