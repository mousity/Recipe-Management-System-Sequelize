const { sequelize, Recipe } = require("./models");
const express = require("express");
require('dotenv').config();
const app = express();
const port = 4000;
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });

app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.findAll();

        return res.json(recipes);
    } catch (err) {
        return res.status(404).send({ message: "Recipes not found"});
    }
})

app.get("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        const recipe = await Recipe.findOne({ where: {id: recipeId }});
        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(404).send({ message: "Recipe not found"});
    }
})

app.patch("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const [numberOfAffectedRows, affectedRows] = await JobApplication.update(req.body, { where: { id: recipeId }, returning: true });
  
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
      console.error(err);
    }
  });

app.delete("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        const recipe = await Recipe.destroy({ where: {id: recipeId} });
        console.log("Record deleted");
        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(404).send({ message: "Recipe not found"});
    }
})

app.post("/recipes", async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body)
        return res.json(recipe);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})

app.put("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        const recipe = await Recipe.findOne({where: {id: recipeId}});
        await recipe.update(req.body);

        return res.json(recipe);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})


app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    await sequelize.authenticate();
    console.log("running...");
})