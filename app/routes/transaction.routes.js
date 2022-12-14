module.exports = app => {
  const transactions = require("../controllers/transaction.controller.js");

  var router = require("express").Router();

  // Create a new Transaction
  router.post("/", transactions.create);

  // Retrieve all Transactions
  router.get("/", transactions.findAll);

  // Retrieve User's Transactions
  router.get("/:userId", transactions.findUserTransactions);

  app.use('/api/transactions', router);
};
