const { sequelize } = require("./models");
const express = require("express");

const app = express();

app.post("/recipes", async (req, res) => {
app.use(express.json());
})