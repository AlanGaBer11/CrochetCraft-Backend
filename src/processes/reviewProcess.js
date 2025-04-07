const reviewService = require('../services/reviewService')

const getReviews = async () => {
  const reviews = await reviewService.getReviews()
  return reviews
}

const getReviewById = async (id) => {
  const review = await reviewService.getReviewById(id)
  return review
}

const getReviewsByProductId = async (productId) => {
  const review = await reviewService.getReviewsByProductId(productId)
  return review
}

const getReviewsByProductName = async (nombreProducto) => {
  const reviews = await reviewService.getReviewsByProductName(nombreProducto)
  return reviews
}

const createReview = async (userId, nombre, calificacion, comentario) => {
  const newReview = await reviewService.createReview(userId, nombre, calificacion, comentario)
  return newReview
}

const updateReview = async (id, calificacion, comentario) => {
  const updatedReview = await reviewService.updateReview(id, calificacion, comentario)
  return updatedReview
}

const deleteReview = async (id) => {
  const deletedReview = await reviewService.deleteReview(id)
  return deletedReview
}

module.exports = {
  getReviews,
  getReviewById,
  getReviewsByProductId,
  getReviewsByProductName,
  createReview,
  updateReview,
  deleteReview
}
