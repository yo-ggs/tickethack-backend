const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  console.error("Erreur : CONNECTION_STRING n'est pas définie !");
}

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
