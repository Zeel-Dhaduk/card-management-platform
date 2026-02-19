const CartItem = require('../models/cartItem');
const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllCartItems = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: "You are trying to access another user's cart or add items to cart",
    });
  }
  const items = await CartItem.find({ cart: cart._id }).populate('card', {
    title: 1,
    price: 1,
    stockQty: 1,
  });

  if (items.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Your cart feels light! No items',
    });
  }
  const formattedItems = items.map((item) => {
    const obj = item.toObject();

    const stockStatus =
      obj.card.stockQty === 0
        ? 'OUT_OF_STOCK'
        : obj.card.stockQty < obj.quantity
          ? 'INSUFFICIENT_STOCK'
          : obj.card.stockQty <= 5
            ? 'Hurry Up Stock is running'
            : 'AVAILABLE';

    delete obj.card.stockQty;

    return {
      ...obj,
      stockStatus,
    };
  });

  res.status(200).json({
    status: 'success',
    result: items.length,
    data: formattedItems,
  });
});

exports.getCartItem = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const { id } = req.params;

  let filter = { _id: id, cart: cart._id };

  const cartItem = await CartItem.findOne(filter).populate('card', {
    title: 1,
    price: 1,
    stockQty: 1,
  });

  if (!cartItem) {
    return res.status(404).json({
      status: 'fail',
      message: 'CartItem not found',
    });
  }
  let message = '';
  if (cartItem.card.stockQty <= 5) {
    message = 'Hurry Up stock is running low';
  }
  delete cartItem.card.stockQty;

  res.status(200).json({
    status: 'success',
    message: message ? message : 'Nice Item go for it',
    data: cartItem,
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const { id } = req.params;

  let filter = { _id: id, cart: cart._id };

  const cartItem = await CartItem.findOneAndUpdate(
    filter,
    { quantity: req.body.quantity },
    {
      new: true,
      runValidators: true,
    }
  ).populate('card', {
    title: 1,
    price: 1,
  });

  if (!cartItem) {
    return res.status(404).json({
      status: 'fail',
      message: 'CartItem not found or you are trying to access another users cart',
    });
  }

  res.status(200).json({
    status: 'success',
    data: cartItem,
  });
});

exports.removeCartItem = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const { id } = req.params;

  let filter = { _id: id, cart: cart._id };

  const cartItem = await CartItem.findOneAndDelete(filter);

  if (!cartItem) {
    return res.status(404).json({
      status: 'fail',
      message: 'CartItem not found',
    });
  }

  res.status(204).json({
    status: 'success',
  });
});
