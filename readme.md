# SET-UP

<details>
    <summary> &nbsp;&nbsp;1. Installation commands</summary>

```BASH
npm init
npm install express sequelize sequelize-cli
npx sequelize init
npm install mariadb@3.0.2 #This version is compatible with removeColumns in migrations
npm install dotenv #To handle credentials through a .env file
```
</details>

<details>
    <summary> &nbsp;&nbsp;2. Create .env file with port and database credentials</summary>

```BASH
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=
PORT=
```
</details>

<details>
    <summary> &nbsp;&nbsp;3. Create file config/database.js to handle connection with Sequelize</summary>

```JavaScript
const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbDialect = process.env.DB_DIALECT || 'mariadb';

const database = new Sequelize(dbDatabase, dbUser, dbPassword, {dialect:dbDialect,host:dbHost});

module.exports = database;
```
</details>

<details>
    <summary> &nbsp;&nbsp;4. Create index.js file with minimuim information</summary>

```JavaScript
require('dotenv').config();

const database = require('./config/database');
const express = require('express');
const app = express();
const port = process.env.PORT;

database.authenticate()
    .then(function () {
        console.log('DB CONNECTED SUCCESSFULLY');
    })
    .catch(function (error) {
        console.log('DATABASE CONNECTION ERROR:', error);
    });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send('WORKS!');
});
```
</details>

<details>
    <summary> &nbsp;&nbsp;5. Test application running: ``` node index ``` </summary>
 
 - Should log: "DB CONNECTED SUCCESSFULLY" and "Server running on port: ".  
 - Route GET ``` / ``` should show the message "WORKS!".
</details>

<details>
    <summary> &nbsp;&nbsp;6. Create file ".sequelizerc.js" to load configuration for Sequelize CLI</summary>

```JavaScript
// .sequelizerc.js

module.exports = {
    config: "config/config.js"
};
```
</details>

<details>
    <summary> &nbsp;&nbsp;7. Change file "config/config.json" to "config/config.js" to allow using environment variables</summary>

```JavaScript
// config/config.js

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
  }
  ...
};
```
</details>

<br>

# MODELS AND MIGRATIONS

<details>
    <summary> &nbsp;&nbsp;1. Create models and migrations with sequelize:</summary>

```BASH
# Sections
    sequelize model:generate --name Sections --attributes name:string,web:string
# ProductPrices
    sequelize model:generate --name ProductPrices --attributes productId:integer,concept:string,price:float,sectionId:integer
# Categories
    sequelize model:generate --name Categories --attributes name:string
# UserTyes
    sequelize model:generate --name UserTypes --attributes type:string
# OrdersStatus
    sequelize model:generate --name OrdersStatus --attributes name:string
# Users
    sequelize model:generate --name Users --attributes name:string,lastName:string,address:string,email:string,usertypesId:integer
# Products
    sequelize model:generate --name Products --attributes name:string,image:string,categoryId:integer,order:integer
# Orders (This one uses the automatic fields "CreatedAt" and "UpdatedAt")
    sequelize model:generate --name Orders --attributes userId:integer,statusId:integer,points:integer,forDate:dateonly,forTime:time
# OrdersProducts
    sequelize model:generate --name OrdersProducts --attributes orderId:integer,productPricesId:integer,unitPrice:float,quantity:integer
```
</details>

2. Update models to set fields "NOT_NULL" and "timestamps: false" on every model except Orders.

3. Update migrations generated with the models to remove timestamps (createdAt and updatedAt), except for Orders.

4. Run migrations to check status: ``` sequelize db:migrate ```

<details>
    <summary> &nbsp;&nbsp;5. Create migrations to set foreign keys:</summary>

```BASH
# ProductPrices - Sections
	sequelize migration:generate --name FK-ProductPrices-Sections
# ProductPrices - Products
	sequelize migration:generate --name FK-ProductPrices-Products
# Products - Categories
	sequelize migration:generate --name FK-Products-Categories
# Users - UserTypes
	sequelize migration:generate --name FK-Users-UserTypes
# Orders - Users
	sequelize migration:generate --name FK-Orders-Users
# Orders - OrdersStatus
	sequelize migration:generate --name FK-Orders-OrdersStatus
# OrdersProducts - Orders
	sequelize migration:generate --name FK-OrdersProducts-Orders
# OrdersProducts - Products
	sequelize migration:generate --name FK-OrdersProducts-Products
```
</details>

<details>
    <summary> &nbsp;&nbsp;6. Set foreign key</summary>

```JavaScript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('TABLE_NAME', {
      fields: ['TABLE_FIELD'],
      type: 'foreign key',
      name: 'FK_NAME',
      references: {
        table: 'REFERENCED_TABLE_NAME',
        field: 'REFERENCED_TABLE_PK_FIELD',
      },
      onDelete: 'cascade',
    });
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('TABLE_NAME', 'FK_NAME');
  }
};
```
</details>

7. Run migrations to check status: ``` sequelize db:migrate ```

<br>

# SEEDERS

<details>
    <summary> &nbsp;&nbsp;1. Create seeders</summary>

```BASH
# Sections
	sequelize seed:generate --name sections
# Categories
	sequelize seed:generate --name categories
# User types
	sequelize seed:generate --name usertypes
# Orders status
	sequelize seed:generate --name ordersstatuses
# Users
	sequelize seed:generate --name users
# Products
	sequelize seed:generate --name products
# Products prices
	sequelize seed:generate --name productprices
# Orders
	sequelize seed:generate --name orders
# Orders products
	sequelize seed:generate --name ordersproducts
```
</details>

<details>
    <summary> &nbsp;&nbsp;2. Create seeders information</summary>

```JavaScript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TABLE_NAME', [
      {FIELD: VALUE,FIELD: VALUE}, // ROWS
      ...
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TABLE_NAME', null, {});
  }
};
```
</details>

3. Run seeders: ``` sequelize db:seed:all ```

<br>

# ROUTES

1. All the routes are defined by module on "routes/".
2. The index file "routes/index.js" is used to load all the routes in the main "index.js"
3. In the main "index.js" the routes are loaded with a prefix for each module.
4. All the routes are pointing to a controller function to make the code reusable.

# CONTROLLERS

1. All the controllers are defined inside "controllers/" to modularize the code and make it reusable.
2. Each controller represents a module on the application instead of a model.
<!-- 3. All the model relationships were defined upon necessity while building the controllers. -->