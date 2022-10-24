const db = require('../../models');
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name field must be present in the body"
    });
    return;
  }
  const balance = (req.body.balance ? req.body.balance : 0);

  // Create a User
  const user = {
    name: req.body.name,
    balance: balance
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.addBalance = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!req.body.topup) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  User.findByPk(id).then(user => {
    user.increment('balance', { by: req.body.topup }).then(num => {
      if (num == 1) {
        res.status(201).send({
          message: "User was updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    });
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } }).then(() => {
    res.status(200).send({
      message: "User was deleted successfully."
    });
  });
};
