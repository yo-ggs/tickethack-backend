var express = require("express");
var router = express.Router();
const moment = require("moment");

const Trips = require("../models/trips");

/* GET users listing. */

router.get("/departure/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const searchedCity = await Trips.find({
      departure: new RegExp(`^${cityName}$`, "i"),
    });
    if (searchedCity) {
      res.json({ result: true, trips: searchedCity });
    } else {
      res.json({ result: false, error: "City of departure not found" });
    }
  } catch {
    res.status(500).json({
      error:
        "Erreur lors de la récupération de la recherche de ville de départ",
    });
  }
});

router.get("/arrival/:cityName", async (req, res) => {
  try {
    const { cityName } = req.params;
    const searchedCity = await Trips.find({
      arrival: new RegExp(`^${cityName}$`, "i"),
    });
    if (searchedCity) {
      res.json({ result: true, trips: searchedCity });
    } else {
      res.json({ result: false, error: "City of arrival not found" });
    }
  } catch {
    res.status(500).json({
      error: "Erreur lors de la récupération de la recherche de ville d'arrivé",
    });
  }
});

router.get("/date/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = moment(date).startOf("day").toDate();
    const endDate = moment(date).endOf("day").toDate();

    const searchedDate = await Trips.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (searchedDate.length > 0) {
      res.json({ result: true, trips: searchedDate });
    } else {
      res.json({ result: false, error: "Date not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de la recherche de la date",
    });
  }
});


module.exports = router;
