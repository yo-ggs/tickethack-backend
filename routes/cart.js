const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.post("/", (req, res) => {
  const newCart = new Cart({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
    booking: false,
  });

  newCart.save().then(() => {
    res.json({ result: true });
  });
});

router.get("/", (req, res) => {
  Cart.find({ booking: false }).then((data) => {
    res.json({ result: true, carts: data });
  });
});

router.delete("/:id", (req, res) => {
  Cart.deleteOne({ _id: req.params.id }).then(() => {
    res.json({ result: true });
  });
});

module.exports = router;
