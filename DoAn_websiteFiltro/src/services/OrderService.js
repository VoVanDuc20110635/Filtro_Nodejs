const Associations = require('../model/Associations');
const User = require('../model/User');
const Order = require('../model/Order');
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
}
module.exports = OrderService;