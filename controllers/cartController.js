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
  if (card.status != 'approved') {
    return res.status(400).json({
      status: 'fail',
      message: 'You cant add this card to cart',
    });
  }

  let cartItem = await CartItem.findOne({ cart: cart._id, card: cardId }).populate('card', {
    title: 1,
    price: 1,
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
  cart = await Cart.findOneAndUpdate(
    { _id: cart._id },
    { totalAmount: cart.totalAmount },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Item added to cart',
    data: cartItem,
  });
});

exports.getCart = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'cart not found',
    });
  }

  const cartItems = await CartItem.find({ cart: cart._id });

  const items = cartItems.length;

  res.status(200).json({
    status: 'success',
    items: items,
    data: cart,
  });
});
