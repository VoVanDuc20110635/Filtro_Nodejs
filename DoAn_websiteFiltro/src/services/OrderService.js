const Associations = require('../model/Associations');
const User = require('../model/User');
const Order = require('../model/Order');
const Product = require('../model/Product');
const OrderDetail = require('../model/OrderDetail');
const CartItemService = require('../services/CartItemService');
const cartItemService = new CartItemService();
const CartItem = require('../model/CartItem');
const ProductDetail = require('../model/ProductDetail');
class OrderService {
    constructor() { };
    async getOrderByUserId(userId) {
        try {
            const orders = await Order.findAll({
                where: {
                    userId: userId,
                },
                order: [['orderDate', 'DESC']],
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
                    productId: cartItem.productId,
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
    async getInvoiceByOrderId(orderId) {
        try {
          const order = await Order.findOne({
            where: {
              orderId: orderId,
            },
            include: [
              {
                model: OrderDetail,
                include: [Product, ProductDetail],
              },
            ],
          });
          
          // Modify the image field for each Product in each OrderDetail
            if (order && order.OrderDetails) {
                order.OrderDetails.forEach((orderDetail) => {
                if (orderDetail.Product) {
                    if (orderDetail.Product.image) {
                        // Update the image field with the desired path
                        orderDetail.Product.image = '/image/upload/' + orderDetail.Product.image;
                    }
                }
                });
            }

          return order;
        } catch (error) {
          console.error('Error finding order by orderId:', error);
          throw error;
        }
      }
}
module.exports = OrderService;