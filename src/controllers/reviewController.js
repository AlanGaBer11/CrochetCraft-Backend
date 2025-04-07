const reviewProcess = require('../processes/reviewProcess')

// OBTENER TODAS LAS RESEÑAS
const getReviews = async (req, res) => {
  try {
    const reviews = await reviewProcess.getReviews()
    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: 'No Hay Reseñas' })
    }
    res
      .status(200)
      .json({ success: true, message: 'Reseñas Obtenidas', reviews })
  } catch (error) {
    console.error('Error Al Obtener Las Reseñas:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

// OBTENER RESEÑA POR ID DE USUARIO
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params
    const review = await reviewProcess.getReviewById(id)
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: 'Reseña No Encontrada' })
    }
    res.status(200).json({ success: true, message: 'Reseña Obtenida', review })
  } catch (error) {
    console.error('Error Al Obtener La Reseña:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

// OBTENER RESEÑA POR PRODUCTO
const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params
    const reviews = await reviewProcess.getReviewsByProductId(productId)

    res.status(200).json({
      success: true,
      message: 'Reseñas Del Producto Obtenidas',
      reviews
    })
  } catch (error) {
    console.error('Error Al Obtener Reseñas Del Producto:', error)
    res.status(500).json({
      success: false,
      message: 'Error Al Obtener Reseñas Del Producto'
    })
  }
}

// CREAR RESEÑA
const createReview = async (req, res) => {
  try {
    const { nombre, calificacion, comentario } = req.body
    const userId = req.user.id

    if (!nombre || !calificacion || !comentario) {
      return res
        .status(400)
        .json({ success: false, message: 'Todos Los Campos Son Obligatorios' })
    }

    const review = await reviewProcess.createReview(
      userId,
      nombre,
      calificacion,
      comentario
    )

    res.status(201).json({ success: true, message: 'Reseña Creada', review })
  } catch (error) {
    console.error('Error Al Crear La Reseña:', error.message)
    res
      .status(500)
      .json({ success: false, message: 'Error Interno Del Servidor' })
  }
}


// ACTUALIZAR ESTADO DE ORDEN
const updateReview = async (req, res) => {
  try {
    const { id } = req.params
    const { calificacion, comentario } = req.body

    if (!calificacion || !comentario) {
      return res
        .status(400)
        .json({ success: false, message: 'Todos Los Campos Son Obligatorios' })
    }

    const review = await reviewProcess.updateReview(
      id,
      calificacion,
      comentario
    )
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: 'Orden no encontrada' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Reseña Actualizada', review })
  } catch (error) {
    console.error('Error al actualizar estado de orden:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

// ELIMINAR ORDEN
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    const review = await reviewProcess.deleteReview(id)
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: 'Reseña No Encontrada' })
    }
    res.status(200).json({ success: true, message: 'Reseña Eliminada' })
  } catch (error) {
    console.error('Error Al Eliminar La Reseña:', error)
    res
      .status(500)
      .json({ success: false, message: 'Error Interno Del Servidor' })
  }
}

module.exports = {
  getReviews,
  getReviewById,
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview
}
