'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipes.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isMin(value) {
          if (value.length < 3) {
            throw new Error("The minimum characters this field can have is 3");
          }
        },
        isMax(value) {
          if (value.length > 500) {
            throw new Error("The maximum characters this field can have is 500");
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isMax(value) {
          if (value.length > 500) {
            throw new Error("The maximum characters this field can have is 500");
          }
        }
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isMax(value) {
          if (value.length > 1000) {
            throw new Error("The maximum characters this field can have is 1000");
          }
        }
      }
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isMax(value) {
          if (value.length > 5000) {
            throw new Error("The maximum characters this field can have is 5000");
          }
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    underscored: true
  });
  return Recipes;
};