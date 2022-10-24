const db = require('../../models');
const user = require('../../models/user');
const Transaction = db.Transaction;
const User = db.User;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.amount) {
    res.status(400).send({
      message: "Amount field must be present in the body"
    });
    return;
  }

  if (!req.body.sender) {
    res.status(400).send({
      message: "Sender field must be present in the body"
    });
    return;
  }

  if (!req.body.receiver) {
    res.status(400).send({
      message: "Receiver field must be present in the body"
    });
    return;
  }

  const transaction = {
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
          res.status(201).send(data);
        }).catch(err => {
          res.status(500).send({
            message: "Error updating balance of sender User with id=" + user.id
          });
        });
      }).catch(err => {
        res.status(500).send({
          message: "Error updating balance of receiver User with id=" + user.id
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
