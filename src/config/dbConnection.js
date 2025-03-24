const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

// LOCAL
const connection = async () => {
  try {
    console.log('Intentando conectar a:', process.env.MONGO_URI_LOCAL) // CAMBIAR LOCAL POR PROD
    await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Conectado a MongoDB')
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error)
    process.exit(1)
  }
}

module.exports = connection
