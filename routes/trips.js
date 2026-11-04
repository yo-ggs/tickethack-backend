var express = require("express");
var router = express.Router();
const moment = require("moment");

const Trips = require("../models/trips");

router.get("/", async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    if (!departure) {
      return res
        .status(400)
        .json({ error: "La ville de départ est obligatoire" });
    }

    const query = {};

    if (departure) {
      query.departure = new RegExp(`^${departure}$`, "i");
    }
    if (arrival) {
      query.arrival = new RegExp(`^${arrival}$`, "i");
    }
    if (date) {
      const startDate = moment(date).startOf("day").toDate();
      const endDate = moment(date).endOf("day").toDate();
      query.date = { $gte: startDate, $lte: endDate };
    }

    const trips = await Trips.find(query);

    if (trips.length > 0) {
      res.json({ result: true, trips });
    } else {
      res.json({
        result: false,
        error: "No trips found matching your criteria",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la recherche des trajets",
    });
  }
});

module.exports = router;
