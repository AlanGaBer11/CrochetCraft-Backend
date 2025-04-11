// PROPIEDAD DE ALAN YAHIR GARCÍA BERNAL
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const fs = require('fs')
const https = require('https')
const connection = require('./config/dbConnection')
connection()

// IMPORTAR RUTAS
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const searchRoutes = require('./routes/searchRoutes')

/* COOKIES */
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
}

// INICIALIZAR EXPRESS
const app = express()

// CAPA DE SEGURIDAD
app.use(helmet())
const PORT = process.env.PORT || 3000

// LÍMITE DE PETICIONES
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 MINUTO
  limit: 100, // 100 PETICIONES POR MINUTO,
  message: '¡Demasiadas peticiones!',
  standardHeaders: true,
  handler: (req, res) => {
    console.log('IP Bloqueada, alcanzo el límite de peticiones')
    res.status(409).json({ error: '¡Demasiaas peticiones!' })
  }
})

app.use(limiter) // APLICAR EL LÍMITE DE PETICIONES A TODAS LAS RUTAS

// CORS
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(bodyParser.json())

// LEE LA CLAVE Y EL CERTIFICADO
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

// RUTA DE BIENVENIDA
app.get('/', (req, res) => {
  res.send('Bienvenido a CrochetCraft')
})

// RUTAS DE APIS
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/search', searchRoutes)

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`)
})

// SERVIDOR HTTPS
/* https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
}); */

// RUTAS QEU NO EXISTEN
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada')
})
