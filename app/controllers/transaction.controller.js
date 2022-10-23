const db = require('../../models');
const user = require('../../models/user');
const Transaction = db.Transaction;
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.sender) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.receiver) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const transaction = {
    name: req.body.amount,
    sender: req.body.sender,
    receiver: req.body.receiver,
    amount: req.body.amount
  };

  // Save User in the database
  Transaction.create(transaction)
    .then(data => {
      User.findByPk(transaction.receiver).then(user => {
        user.increment('balance', { by: transaction.amount });
        User.findByPk(transaction.sender).then(user => {
          user.increment('balance', { by: -transaction.amount });
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: "Error updating balance of receiver User with id=" + id
          });
        });
      }).catch(err => {
        res.status(500).send({
          message: "Error updating balance of receiver User with id=" + id
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};

exports.findAll = (req, res) => {
  Transaction.findAll({
    order: [
      ["createdAt", "DESC"],
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
};

exports.findUserTransactions = (req, res) => {
  const userId = req.params.userId;

  Transaction.findAll({
    where: { sender: userId },
    order: [
      ["createdAt", "DESC"],
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    });
}
