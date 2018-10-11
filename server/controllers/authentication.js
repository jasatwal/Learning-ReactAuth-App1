const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return next(error);
    }

    if (existingUser) {
      return res.status(400).send({ error: 'Email is in use' });
    }

    var user = new User({ email, password });
    user.save((error) => {
      if (error) {
        return next(error);
      }
      res.status(201).send();
    });
  });
};