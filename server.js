const { sequelize, Recipe } = require("./models");
const express = require("express");
require('dotenv').config();
const app = express();
const port = 4000;
app.use(express.json());

// Copied from job_app_tracker to make errors and requests easier to see
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
  });

// Get function
app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.findAll(); // Find ALL rows of data within this model
        return res.json(recipes);
    } catch (err) {
        return res.status(404).send({ message: "Recipes not found"});
    }
})

// Gets a specific recipe
app.get("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        const recipe = await Recipe.findOne({ where: {id: recipeId }}); // Find one record where our ID matches the parameter we parsed
        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(404).send({ message: "Recipe not found"});
    }
})

// Patch function
app.patch("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
        // Update records where the id matches our parameter with our request body
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

// Delete function
app.delete("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        // Destroy a recipe specified by the id
        const recipe = await Recipe.destroy({ where: {id: recipeId} });
        console.log("Record deleted");
        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(404).send({ message: "Recipe not found"});
    }
})

// Post function
app.post("/recipes", async (req, res) => {
    try {
        // Create a recipe, IDs are generated automatically
        const recipe = await Recipe.create(req.body)
        return res.json(recipe);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})

// Put function
app.put("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    try {
        // Find a recipe with our matched ID
        const recipe = await Recipe.findOne({where: {id: recipeId}});
        // Replace the recipe with our updated recipe
        await recipe.update(req.body);

        return res.json(recipe);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})


app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    // Safer to use than sync() while still performing the same function
    await sequelize.authenticate();
    console.log("running...");
})