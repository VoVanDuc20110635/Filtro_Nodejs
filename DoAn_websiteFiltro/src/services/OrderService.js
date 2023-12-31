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
                order: [['orderId', 'DESC']],
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
    async getOrderById(orderId){
      try {
          const order = await Order.findOne(
            { where: { orderId: orderId } }
          );
          return order; // Returns the updated order
        } catch (error) {
          throw error;
      }
  }
    async placeOrder(cartId, user, sumOfAllItem, address, city, zip, productDetailIdArray, deliveryFee){
        try{
            const newOrder = await Order.create({
                userId: user.userId,
                orderDate: new Date(),
                phoneNumber: user.phoneNumber,
                email: user.email,
                address: address,
                total: sumOfAllItem + deliveryFee,
                status: 1,
                paymentMethod:1,
                zip: zip,
                city: city,
                deliveryFee: deliveryFee
            });
            let cartItemList = await cartItemService.getCartItemListWithTheseId(cartId, productDetailIdArray);
            for (let cartItem of cartItemList) {
                let orderDetail = await OrderDetail.create({
                    orderId: newOrder.orderId,
                    productDetailId: cartItem.productDetailId,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    pricePerProduct: cartItem.price,
                    total: cartItem.total
                })
                let productDatabase = await Product.findOne({
                  where:{
                    productId: cartItem.productId
                  }
                })
                productDatabase.sold = productDatabase.sold + 1;
                productDatabase.quantity = productDatabase.quantity -1 ;
                productDatabase.save();
                let productDetailDatabase = await ProductDetail.findOne({
                  where:{
                    productDetailId: cartItem.productDetailId
                  }
                })
                productDetailDatabase.sold = productDetailDatabase.sold + 1;
                productDetailDatabase.stock = productDetailDatabase.stock -1 ;
                productDetailDatabase.save();
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
                        orderDetail.Product.image = '/upload/' + orderDetail.Product.image;
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

    async getListAllOrder() {
      const listOrder = await Order.findAll({
        include: [
          { model: User },
          {
            model: OrderDetail,
            include: [Product, ProductDetail],
          },
        ],
      });
    
      return listOrder;
    }
    async getListAllOrderByStatus(status) {
      const listOrder = await Order.findAll({
        include: [
          { model: User },
          {
            model: OrderDetail,
            include: [Product, ProductDetail],
          },
        ],
        where: {
          status: status
        }
      });
    
      return listOrder;
    }
    
    async updateOrder(status, orderId) {
      try {
          const tempOrder = await Order.findOne({
              where: {
                orderId: orderId,
              }
          });
          // Hash the password
          if(status === 'active'){
            tempOrder.status = 1;
          } else{
            // tempCategory.status = 0;
          }
          if (status ===  'Pending'){
            tempOrder.status = 1;
        } else if (status === 'Cancel'){
            tempOrder.status = 2;
        } else if (status === 'Delivery'){
            tempOrder.status = 3;
        } else if (status === 'Received'){
            tempOrder.status = 4;
            tempOrder.paymentMethod = 2;
        } else if (status === 'Exchange'){
            tempOrder.status = 5;
        }else {
            tempOrder.status = 6;
        }
          await tempOrder.save();
      } catch (err){
          throw new NotExecuteException('Không thể cập nhật!');
      }
      
  
    }
    async updateOrderUser(status, orderId) {
      try {
        
          const tempOrder = await Order.findOne({
              where: {
                orderId: orderId,
              }
          });
          if (status > 0 && status < 7){
            tempOrder.status = status;
          }
          await tempOrder.save();
      } catch (err){
          throw new NotExecuteException('Không thể cập nhật!');
      }
      
  
    }
}
module.exports = OrderService;