import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

    cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'carts'},

    orderDate:       {type: Date, default: Date.now},

    shippingAddress: {
        street:     {type: String},
        city:       {type: String},
        postalCode: {type: String},
        country:    {type: String},
    },

    paymentMethod: {type: String},
    transactionId: {type: String},

    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'completed', 'cancelled'],
        default: "processing",
      },
});

const schema = mongoose.model('orders', orderSchema);
export default schema