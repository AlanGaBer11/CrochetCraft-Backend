require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/dbConnection');
connection();

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTAR RUTAS
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(bodyParser.json());


// RUTA DE BIENVENIDA
app.get('/', (req, res) => {
    res.send("Bienvenido a CrochetCraft");
});

// RUTAS DE APIS
app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

// RUTAS QEU NO EXISTEN
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
