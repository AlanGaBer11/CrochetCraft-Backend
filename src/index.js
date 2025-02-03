require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send("Bienvenido a CrochetCraft");
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
