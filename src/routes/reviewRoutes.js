const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authenticateUser = require('../middlewares/authMiddleware')
const { checkRole } = require('../middlewares/rolMiddleware')

router
  .get('/', reviewController.getReviews)
  .get('/:id', reviewController.getReviewById)
  .post('/', authenticateUser, reviewController.createReview)
  .patch('/:id', authenticateUser, reviewController.updateReview)
  .delete('/:id', authenticateUser, checkRole(['ADMIN']), reviewController.deleteReview)

module.exports = router
