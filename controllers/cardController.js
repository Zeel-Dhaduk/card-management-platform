const Card = require('../models/cardModel');

exports.createCard = async (req, res, next) => {
  const card = await Card.create({
    title: req.title,
    description: req.description,
    price: req.price,
    stockQty: req.stockQty,
  });

  res.status(201).json({
    status: 'success',
    data: {
      card,
    },
  });
};

exports.getAll = async (req, res, next) => {
  const cards = await Card.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      cards,
    },
  });
};

exports.getCard = async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    console.log('No card found');
  }

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
};
