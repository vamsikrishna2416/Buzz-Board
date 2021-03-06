/*routes of module
Developer Name: R Vamsi krishna*/


const express = require("express");
const router = express.Router();

const { createOrders, updateOrder, getListOfOrders, searchOrdersWithOrderID, deleteOrderWithOrderID } = require('../controllers/orders')

//orders
router.post("/create",createOrders);
router.post("/update",updateOrder);
router.get("/list",getListOfOrders);
router.get("/search",searchOrdersWithOrderID);
router.post("/delete",deleteOrderWithOrderID);

module.exports = router;