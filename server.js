const { sequelize, Recipe } = require("./models");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/recipes", async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body)
        return res.json(recipe);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})

app.listen({ port: 4000 }, async () => {
    console.log(`Server running at http://localhost:4000`);
    await sequelize.authenticate();
    console.log("running...");
})