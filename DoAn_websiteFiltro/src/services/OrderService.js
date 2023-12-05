const Associations = require('../model/Associations');
const User = require('../model/User');
const Order = require('../model/Order');
const OrderDetail = require('../model/OrderDetail');
const CartItemService = require('../services/CartItemService');
const cartItemService = new CartItemService();
const CartItem = require('../model/CartItem');
class OrderService {
    constructor() { };
    async getOrderByUserId(userId) {
        try {
            const orders = await Order.findAll({
                where: {
                    userId: userId,
                },
            });
            return orders;
        } catch (error) {
            console.error('Error finding orders by userId:', error);
            throw error;
        }
    }
    async updateCancelOrder(orderId){
        try {
            const updatedOrder = await Order.update(
              { status: 5 },
              { where: { orderId: orderId } }
            );
            return updatedOrder; // Returns the updated order
          } catch (error) {
            throw error;
        }
    }
    async placeOrder(cartId, user, sumOfAllItem, address, city, zip){
        try{
            const newOrder = await Order.create({
                userId: user.userId,
                orderDate: new Date(),
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: address,
                total: sumOfAllItem,
                status: 1,
                paymentMethod:1,
                zip: zip,
                city: city
            });
            let cartItemList = await cartItemService.getCartItemList(cartId);
            for (let cartItem of cartItemList) {
                let orderDetail = await OrderDetail.create({
                    orderId: newOrder.orderId,
                    productDetailId: cartItem.productDetailId,
                    quantity: cartItem.quantity,
                    pricePerProduct: cartItem.price,
                    total: cartItem.total
                })
                let deletedCartItem = await CartItem.destroy({
                    where: {
                        cartId: cartId,
                        productDetailId: cartItem.productDetailId
                    }
                })
            }

        } catch (error){
            console.error('Error creating order:', error);
            throw error;
        }
    }
}
module.exports = OrderService;