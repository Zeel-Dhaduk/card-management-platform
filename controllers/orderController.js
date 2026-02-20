const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItem');
const catchAsync = require('../utils/catchAsync');
const CartItem = require('../models/cartItem');
const Cart = require('../models/cartModel');
const Card = require('../models/cardModel');

exports.checkOut = catchAsync(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cart not found',
    });
  }
  const cartItems = await CartItem.find({ cart: cart._id }).populate('card', {
    stockQty: 1,
    title: 1,
    vendor: 1,
    price: 1,
  });
  if (cartItems.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Cart is empty',
    });
  }
  for (const item of cartItems) {
    // console.log('Type of quantity: ', typeof item.quantity);
    const updateCard = await Card.findOneAndUpdate(
      {
        _id: item.card._id,
        stockQty: { $gte: item.quantity },
      },
      {
        $inc: { stockQty: -item.quantity },
      },
      {
        new: true,
      }
    );

    if (!updateCard) {
      return res.status(400).json({
        status: 'fail',
        message: `Insufficient stock for ${item.card.title}`,
      });
    }
  }
  const filter = {
    user: req.user._id,
    totalAmount: cart.totalAmount,
    items: cartItems.map((item) => item._id),
    status: 'placed',
  };

  let orderItems;
  const order = await Order.create(filter);
  //console.log("Order Id: ", order._id)
  for (const item of cartItems) {
    orderItems = await OrderItem.create({
      order: order._id,
      card: item.card._id,
      vendor: item.card.vendor,
      quantity: item.quantity,
      price: item.card.price,
    });
  }
  await orderItems.save();

  console.log('orderItems: ', orderItems);
  await CartItem.deleteMany({ cart: cart._id });
  cart.totalAmount = 0;
  await cart.save();

  res.status(201).json({
    status: 'success',
    message: 'Order Created',
    data: order,
  });
});
