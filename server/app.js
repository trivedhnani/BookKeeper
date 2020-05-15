const express = require("express");
const graphqlHTTP = require("express-graphql");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.use("*", cors());
const schema = require("./schema/schema");
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
const port = process.env.PORT || 5000;
const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
