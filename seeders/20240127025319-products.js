'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      /* - - - - - SPECIALS - - - - - */
      {id: 1,name: "Cannelloni",image:"default.png",categoryId:2,order:10},
      {id: 2,name: "Lasagna",image:"default.png",categoryId:2,order:20},
      {id: 3,name: "Chicken Alfredo",image:"default.png",categoryId:2,order:30},
      {id: 4,name: "Lemon Chicken",image:"default.png",categoryId:2,order:40},
       /* - - - - - PIZZAS - - - - - */
      {id: 5,name: "Cheese",image:"default.png",categoryId:1,order:10},
      {id: 6,name: "Pepperoni",image:"default.png",categoryId:1,order:20},
      {id: 7,name: "Hawaiian",image:"default.png",categoryId:1,order:30},
      {id: 8,name: "Meatlovers",image:"default.png",categoryId:1,order:40},
      {id: 9,name: "Burger Bacon Brie (BBB)",image:"default.png",categoryId:1,order:50},
      {id: 10,name: "Donair",image:"default.png",categoryId:1,order:60},
      {id: 11,name: "Canadian",image:"default.png",categoryId:1,order:70},
      {id: 12,name: "Mushroom & Bacon & Sausage",image:"default.png",categoryId:1,order:80},
      {id: 13,name: "Chicken",image:"default.png",categoryId:1,order:90},
      {id: 14,name: "Mushroom & Meatball",image:"default.png",categoryId:1,order:100},
      {id: 15,name: "Vegetarian",image:"default.png",categoryId:1,order:110},
      {id: 16,name: "Mexican",image:"default.png",categoryId:1,order:120},
      {id: 17,name: "Prosciutto",image:"default.png",categoryId:1,order:130},
      /* - - - - - PAGNOTTA - - - - - */
      {id: 18,name: "Chicken",image:"default.png",categoryId:3,order:10},
      {id: 19,name: "Steak",image:"default.png",categoryId:3,order:20},
      {id: 20,name: "Prosciutto",image:"default.png",categoryId:3,order:30},
      /* - - - - - SALADS - - - - - */
      {id: 21,name: "Mediterranean",image:"default.png",categoryId:4,order:10},
      {id: 22,name: "Capresse",image:"default.png",categoryId:4,order:20},
      {id: 23,name: "Greek",image:"default.png",categoryId:4,order:30},
      {id: 24,name: "Caesar",image:"default.png",categoryId:4,order:40},
      /* - - - - - COMBOS - - - - - */
      {id: 25,name: "1 - 2 Slices of pizza + Drink",image:"default.png",categoryId:5,order:10},
      {id: 26,name: "2 - Pizza + Salad + Drink",image:"default.png",categoryId:5,order:20},
      {id: 27,name: "3 - 2 Slices of pizza + Salad",image:"default.png",categoryId:5,order:30},
      {id: 28,name: "4 - 1/2 Pasta of the day + Salad",image:"default.png",categoryId:5,order:40},
      {id: 29,name: "5 - 1/2 Pasta + Salad + Drink",image:"default.png",categoryId:5,order:50},
      {id: 30,name: "6 - Salad + Grilled Chicken + Drink",image:"default.png",categoryId:5,order:60},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};