require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/dbConnection');
connection();

/* AGREGAR CORS PARA LAS COOKIES */

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTAR RUTAS
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(cors());
app.use(bodyParser.json());


// RUTA DE BIENVENIDA
app.get('/', (req, res) => {
    res.send("Bienvenido a CrochetCraft");
});

// RUTAS DE APIS
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

// RUTAS QEU NO EXISTEN
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
