require('dotenv').config();

const database = require('./config/database');
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');
const cors = require('cors');

database.authenticate()
    .then(function () { console.log('DB CONNECTED SUCCESSFULLY'); })
    .catch(function (error) { console.log('DATABASE CONNECTION ERROR:', error); });

app.listen(port, () => { console.log(`Server running on port: ${port}`); });

/* - - - - - GLOBAL MIDDLEWARES - - - - - */

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));

/* - - - - - ROUTES - - - - - */

app.get('/', (req, res) => {
    res.send('WORKS!');
});

app.use('/users', routes.userRoutes);
app.use('/categories', routes.categoriesRoutes);
app.use('/ordersstatus', routes.ordersStatusRoutes);
app.use('/userstypes', routes.userTypesRoutes);
app.use('/sections', routes.sectionsRoutes);
app.use('/products', routes.productsRoutes);
app.use('/orders', routes.ordersRoutes);