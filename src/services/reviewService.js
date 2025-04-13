const ReviewModel = require('../models/reviewModel')
const ProductModel = require('../models/productModel')

// OBTENER TODAS LAS REVIEWS
const getReviews = async () => {
  return await ReviewModel.find()
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')
}

// OBTENER UNA REVIEW POR ID
const getReviewById = async (id) => {
  return await ReviewModel.findById(id)
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')
}
// OBTENER REVIEWS POR NOMBRE PRODUCTO
const getReviewsByProductName = async (nombreProducto) => {
  // Buscar reviews donde algún item tenga el nombre especificado
  const reviews = await ReviewModel.find({ 'items.nombre': { $regex: nombreProducto, $options: 'i' } })
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')

  // Filtrar los items en cada review para mostrar solo los que coinciden con el nombre
  const filteredReviews = reviews.map(review => {
    const filteredItems = review.items.filter(item =>
      item.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    )

    // Crear una copia de la review con solo los items filtrados
    const reviewObj = review.toObject()
    reviewObj.items = filteredItems

    return reviewObj
  })

  return filteredReviews
}

// OBTENER REVIEWS POR CATEGORIA DEL PRODUCTO
const getReviewsByProductCategory = async (categoria) => {
  // Buscar reviews donde algún item tenga la categoría especificada
  const reviews = await ReviewModel.find({ 'items.categoria': categoria })
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')

  // Filtrar los items en cada review para mostrar solo los que coinciden con la categoría
  const filteredReviews = reviews.map(review => {
    const filteredItems = review.items.filter(item =>
      item.categoria === categoria
    )

    // Crear una copia de la review con solo los items filtrados
    const reviewObj = review.toObject()
    reviewObj.items = filteredItems

    return reviewObj
  })

  return filteredReviews
}

// CREAR UNA REVIEW
const createReview = async (userId, nombre, calificacion, comentario) => {
  // Buscar el producto por nombre
  const producto = await ProductModel.findOne({ nombre })

  if (!producto) {
    throw new Error('Producto no encontrado')
  }

  const productId = producto._id
  const categoria = producto.categoria

  // Ver si el usuario ya tiene una review
  let review = await ReviewModel.findOne({ userId })

  if (!review) {
    review = new ReviewModel({
      userId,
      items: [{ productId, nombre, categoria, calificacion, comentario }]
    })
  } else {
    const existingItem = review.items.find(
      (item) => item.productId.toString() === productId.toString()
    )

    if (existingItem) {
      existingItem.calificacion = calificacion
      existingItem.comentario = comentario
    } else {
      review.items.push({ productId, nombre, categoria, calificacion, comentario })
    }
  }

  await review.save()
  return review
}

// ACTUALIZAR UNA REVIEW (actualiza calificación y comentario de un producto en una review)
const updateReview = async (reviewId, productId, calificacion, comentario) => {
  const review = await ReviewModel.findById(reviewId)
  if (!review) return null

  const item = review.items.find(item => item.productId.toString() === productId)
  if (!item) return null

  item.calificacion = calificacion
  item.comentario = comentario

  await review.save()
  return review
}

// ELIMINAR UNA REVIEW
const deleteReview = async (id) => {
  return await ReviewModel.findByIdAndDelete(id)
}

module.exports = {
  getReviews,
  getReviewById,
  getReviewsByProductName,
  getReviewsByProductCategory,
  createReview,
  updateReview,
  deleteReview
}
