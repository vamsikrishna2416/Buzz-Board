/*

Developer Name: R Vamsi krishna
*/

let config = require("../config");
const logger = require("../logger");
const request = require('request');

exports.createOrders = async(req, res) => {
    let order_id = req.body.order_id || req.params.order_id || req.query.order_id;
    let item_name = req.body.item_name || req.params.item_name || req.query.item_name;
    let cost = req.body.cost || req.params.cost || req.query.cost;
    let order_date = req.body.order_date || req.params.order_date || req.query.order_date;
    let delivery_date = req.body.delivery_date || req.params.delivery_date || req.query.delivery_date;
	
    if(!order_id || !item_name || !cost || !order_date || !delivery_date){
        res.send({error:"All fields are mandatory."});
    } else {
        try {
			let checkOrders = await config.database.collection("orders").find({order_id}).toArray();
			if(checkOrders.length>0){
				res.send({error:`Order with ${order_id} already exist.`})
			}else{
				let jsonObject = {};
				jsonObject['order_id'] = order_id;
				jsonObject['item_name'] = item_name;
				jsonObject['cost'] = cost;
				jsonObject['order_date'] = order_date;
				jsonObject['delivery_date'] = delivery_date;
				let insertOrderDetails = await config.database.collection("orders").insertOne(jsonObject);
				if(insertOrderDetails.insertedCount > 0){
					res.send({success:"Created order details successfully."});
				}else{
					res.send({error:"Unable to insert order details"});
				}
			}
		} catch (error) {
            res.send({error:"Not able to process your request. Please try again.",error});
		}
    };
};

exports.updateOrder = async(req, res) => {
    let order_id = req.body.order_id || req.params.order_id || req.query.order_id;
   
    let delivery_date = req.body.delivery_date || req.params.delivery_date || req.query.delivery_date;
	
    if(!order_id || !delivery_date){
        res.send({error:"All fields are mandatory."});
    } else {
        try {
			let checkOrders = await config.database.collection("orders").find({order_id}).toArray();
			if(checkOrders.length>0){
				let updateOrder = await config.database.collection("orders").updateOne({order_id},{$set:{delivery_date}});
				if(updateOrder.modifiedCount > 0){
					res.send({success:"Updated order details successfully."});
				}else{
					res.send({error:"Unable to update order details"});
				}
			}else{
				res.send({error:`Order with ${order_id} is not found.`})
			}
		} catch (error) {
            res.send({error:"Not able to process your request. Please try again.",error});
		}
    };
};

exports.getListOfOrders = async(req, res) => {
    let order_date = req.body.order_date || req.params.order_date || req.query.order_date;
	let json = {};
    if(order_date){
		json["order_date"] = order_date;
	}
	try {
		let checkOrders = await config.database.collection("orders").find(json).toArray();
		if(checkOrders.length>0){
			
			res.send({success:checkOrders});
			
		}else{
			res.send({error:`No orders for given date.`})
		}
	} catch (error) {
		res.send({error:"Not able to process your request. Please try again.",error});
	}
   
};

exports.searchOrdersWithOrderID = async(req, res) => {
    let order_id = req.body.order_id || req.params.order_id || req.query.order_id;
   
    if(!order_id){
        res.send({error:"All fields are mandatory."});
    } else {
        try {
			let checkOrders = await config.database.collection("orders").find({order_id:{$regex:new RegExp(order_id), '$options' : 'i'}}).toArray();
			if(checkOrders.length>0){
				
				res.send({success:checkOrders});
				
			}else{
				res.send({error:`No orders found.`})
			}
		} catch (error) {
            res.send({error:"Not able to process your request. Please try again.",error});
		}
    };
};

exports.deleteOrderWithOrderID = async(req, res) => {
    let order_id = req.body.order_id || req.params.order_id || req.query.order_id;
   
    if(!order_id){
        res.send({error:"All fields are mandatory."});
    } else {
        try {
			let checkOrders = await config.database.collection("orders").find({order_id}).toArray();
			if(checkOrders.length>0){
				let deleteOrder = await config.database.collection("orders").deleteOne({order_id});
				if(deleteOrder.deletedCount > 0){
					res.send({success:"Deleted order details successfully."});
				}else{
					res.send({error:"Unable to delete order details"});
				}
			}else{
				res.send({error:`Order with ${order_id} is not found.`})
			}
		} catch (error) {
            res.send({error:"Not able to process your request. Please try again.",error});
		}
    };
};

