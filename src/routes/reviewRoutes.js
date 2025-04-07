const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/getReviews/', reviewController.getReviews)
  .get('/getReviewById/:id', reviewController.getReviewById)
  .get('/getReviewsByProductId/:productId', reviewController.getReviewsByProductId)
  .get('/getReviewsByProductName/:nombreProducto', reviewController.getReviewsByProductName)
  .post('/createReview/', authenticateUser, reviewController.createReview)
  .patch('/updateReview/:id', authenticateUser, reviewController.updateReview)
  .delete('/deleteReview/:id', authenticateUser, checkRole(['ADMIN']), reviewController.deleteReview)

module.exports = router
