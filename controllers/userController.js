const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...fields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This is not for updating passwords.', 400));

  //update user document
  const data = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deactivateMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
