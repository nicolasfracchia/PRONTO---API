'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {id: 1,name: "Admin", lastName: "Owner", email:"admin@server.com", address: "Some address", usertypesId: 1},
      {id: 2,name: "Employee name 1", lastName: "Employee last name 1", email:"employee1@server.com", address: "Some address 111", usertypesId: 2},
      {id: 3,name: "Employee name 2", lastName: "Employee last name 2", email:"employee2@server.com", address: "Some address 222", usertypesId: 2},
      {id: 4,name: "Employee name 3", lastName: "Employee last name 3", email:"employee3@server.com", address: "Some address 333", usertypesId: 2},
      {id: 5,name: "Customer name 1", lastName: "Customer last name 1", email:"customer1@server.com", address: "Other address 111", usertypesId: 3},
      {id: 6,name: "Customer name 2", lastName: "Customer last name 2", email:"customer2@server.com", address: "Other address 222", usertypesId: 3},
      {id: 7,name: "Customer name 3", lastName: "Customer last name 3", email:"customer3@server.com", address: "Other address 333", usertypesId: 3},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};