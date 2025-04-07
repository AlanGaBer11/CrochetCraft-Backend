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
  // Primero buscar el producto por nombre
  const producto = await ProductModel.findOne({ nombre: nombreProducto })

  if (!producto) {
    return []
  }

  // Luego buscar las reviews que contengan ese producto
  const reviews = await ReviewModel.find({ 'items.nombre': nombreProducto })
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')

  return reviews
}

// OBTENER REVIEWS POR PRODUCTO ID
const getReviewsByProductId = async (productId) => {
  const reviews = await ReviewModel.find({ 'items.productId': productId })
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')
  return reviews
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
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview
}
