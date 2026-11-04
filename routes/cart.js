const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Trips = require("../models/trips");

router.post("/", async (req, res) => {
  try {
    const { tripId } = req.body;
    const tripToCart = await Trips.findById(tripId);
    if (!tripToCart) {
      return res.json({ result: false, error: "Trip not found" });
    }
    const newCart = new Cart({
      departure: tripToCart.departure,
      arrival: tripToCart.arrival,
      date: tripToCart.date,
      price: tripToCart.price,
      booking: false,
    });
    await newCart.save();
    const allCarts = await Cart.find({ booking: false });
    res.json({ result: true, carts: allCarts });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout au panier" });
  }
});

router.get("/", (req, res) => {
  Cart.find({ booking: false }).then((data) => {
    res.json({ result: true, carts: data });
  });
});

module.exports = router;
