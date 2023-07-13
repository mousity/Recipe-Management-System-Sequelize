'use strict';
// Playing around with unique IDs
const { v4: uuidv4 } = require('uuid');
const { UUID, UUIDV4 } = require('sequelize');

// Seeder to intiialize database with set data
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipes', [{
      uuid: uuidv4(),
      title: "Cereal",
      description: "A nice, fresh, meaty bowl of cereal",
      ingredients: "1/2 cup of milk, 1 cup of cereal",
      instructions: "Pour cereal in bowl. Microwave milk for 30 seconds, and add to bowl. Lightly salt, add red pepper flakes as needed.",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      uuid: uuidv4(),
      title: "Fried Eggs",
      description: "Savory eggs to heal the soul. Serves 4. One egg per person for 3, and the 4th is simply there to admire your cooking.",
      ingredients: "3 Large Eggs, 1/2 Tbsp of butter, Salt",
      instructions: "Melt butter onto pan. Crack all 3 eggs in pan, and cover. Wait for eggs to finish cooking. Put an egg on each plate and salt heavily. Very heavily. A very large coat of salt.",
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};
