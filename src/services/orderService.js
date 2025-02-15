const orderModel = require("../models/orderModel");

// OBTENER TODAS LAS ORDENES
const getOrders = async () => {
  return await orderModel.find()
    .populate("userId", "nombre email")
    .populate("items.productId", "nombre precio");
};

// OBTENER UNA ORDEN POR ID
const getOrderById = async (id) => {
  return await orderModel.findById(id)
    .populate("userId", "nombre email")
    .populate("items.productId", "nombre precio");
};

// CREAR UNA ORDEN
const createOrder = async (userId, productId, cantidad, precio, precioTotal, status, metodoPago) => {
  let order = await orderModel.findOne({ userId });

  if (!order) {
    order = new orderModel({ userId, items: [{ productId, cantidad, precio}], precioTotal, status, metodoPago });
  } else {
    const existingItem = order.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      order.items.push({ productId, cantidad, precio });
    }
  }
  await order.save();
  return order;
};

// ACTUALIZAR EL ESTADO DE UNA ORDEN
const updateOrderStatus = async (id, status) => {
  return await orderModel.findByIdAndUpdate(id, { status }, { new: true });
};

// ELIMINAR UNA ORDEN
const deleteOrder = async (id) => {
  return await orderModel.findByIdAndDelete(id);
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
};
