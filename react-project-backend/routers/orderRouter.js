import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is Empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems, //req.body.orderItems => it is the value or parameter that the user passes
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemPrice: req.body.itemPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      // creating order databsae
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder }); //order:createdOrder passes order to frontend
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req, res)=>{
  const order= await Order.findById(req.params.id)
  if(order){
    order.isPaid=true;
    order.paidAt=Date.now()
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.email_address
    }
    const updatedOrder= await order.save()
    res.send({message:'Order Paid', order:updatedOrder})
  }
  else{
  res.status(404).send({message: 'Order Not Found'})
}
}))

export default orderRouter;
