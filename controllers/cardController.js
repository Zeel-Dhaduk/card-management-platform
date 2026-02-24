const catchAsync = require('../utils/catchAsync');
const Card = require('../models/cardModel');
const Email = require('../utils/email');

exports.createCard = catchAsync(async (req, res, next) => {
  req.body.vendor = req.user._id;
  const card = await Card.create(req.body);

  const filter = { to: 'card@admin.com', from: req.user.email, name: req.user.name };
  const url = `${req.protocol}://${req.get('host')}/cards/${card._id}`;

  await new Email(filter, url).sendCardCreated(req.user.name);

  res.status(201).json({
    status: 'success',
    data: {
      card,
    },
  });
});

exports.getAllCards = catchAsync(async (req, res, next) => {
  let filter = {};
  let project = {};
  if (req.user.role === 'vendor') {
    filter.vendor = req.user._id;
  } else if (req.user.role === 'user') {
    filter.status = 'approved';
    project.status = 0;
  }

  const cards = await Card.find(filter, project);
  if (!cards) {
    return res.status(404).json({
      status: 'fail',
      message: 'No cards found!',
    });
  }
  res.status(200).json({
    status: 'success',
    result: cards.length,
    data: {
      cards,
    },
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let filter = { _id: id };

  if (req.user.role === 'user') {
    filter.status = 'approved';
  }
  if (req.user.role === 'vendor') {
    filter.vendor = req.user._id;
  }

  const card = await Card.findOne(filter);

  if (!card) {
    return res.status(403).json({
      status: 'fail',
      message: 'Card not found or you are not authorized to access',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

exports.updateCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let filter = { _id: id };

  if (req.user.role === 'vendor') {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this card',
    });
  }

  const card = await Card.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  }).populate('vendor', { name: 1 });

  const filterObj = {
    to: `${card.vendor.name}@card.com`,
    from: req.user.email,
    name: req.user.name,
  };

  const url = `${req.protocol}://${req.get('host')}/cards/${card._id}`;

  if (req.body.status === 'approved') {
    await new Email(filterObj, url).sendCardApproved(card.title);
  } else if (req.body.status === 'rejected') {
    await new Email(filterObj, url).sendCardRejected(card.title);
  }

  if (!card) {
    return res.status(403).json({
      status: 'fail',
      message: 'No card found or you are not authorized to update this card',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let filter = { _id: id };

  if (req.user.role === 'vendor') {
    filter.vendor = req.user._id;
  } else if (req.user.role === 'user') {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to delete the  card',
    });
  }

  const card = Card.findOneAndDelete(filter);

  if (!card) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to delete this  card',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
