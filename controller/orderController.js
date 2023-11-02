import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
import {transporter} from '../utils/email.js'

// create order
export const createOrder = async (req,res) => {
    try{
        const {cartId, shippingAddress,
            paymentMethod, transactionId} = req.body;
        
        const {userId} = req.user;
   
        if (userId && cartId && shippingAddress && paymentMethod
                && transactionId){
            
            const order = new Order({userId, cartId, shippingAddress,
                paymentMethod, transactionId});
        
            await order.save();
            return res.status(200).json(order)
    
        } else{
            return res.status(400).json({message: "Please provide all required fields."})
        }

    } catch (error){
        res.status(400).json(error.message)
    }
}

export const orderStatusUpdate = async (req,res) => {
    try{
        const {orderId} = req.params;
        const {userId, orderStatus} = req.body;
        
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({message: "Order doesn't exist"})
        }
        order.orderStatus = orderStatus;
        await order.save();

        let user = await User.findById(userId)

        const mailOptions = {
            from: process.env.TRANS_EMAIL,
            to: user.email,
            subject: 'Order Status',
            text: `Your order status is: ${orderStatus}`
        };
    
        transporter.sendMail(mailOptions, (error)=>{
            if(error){
            console.error('Error sending email:', error);
            return res.status(500).json({error: 'Internal server error'});
            } 
        });
        
        res.status(200).json({message: "Order status updated successfully", order})

    } catch(error){
        res.status(400).json({message: error.message})
    }
}

export const getUserOrders = async (req,res) => {
    try {
        const {userId} = req.user;
        let page = req.query.page;
        let pageLimit = req.query.limit

        const orders = await Order.find({userId})
        .populate('userId', 'username email firstName lastName')
        .populate('cartId', 'items totalCartPrice')
        .skip((page-1)*pageLimit)
        .limit(pageLimit);
        
        res.status(200).json(orders);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

