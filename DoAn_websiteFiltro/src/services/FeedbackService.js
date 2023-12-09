const Feedback = require('../model/Feedback');
const User = require('../model/User');
const Associations = require('../model/Associations');
const OrderDetail = require('../model/OrderDetail');
const Order = require('../model/Order');
class FeedbackService {
    constructor() { };
    async getAllFeedBackByProductId(id) {
        try {
            const feedbackList = await Feedback.findAll({
                where: { 'productId': id }, // Replace 'productId' with the actual field name in your model
                include: User,
            });

            return feedbackList;
        } catch (error) {
            throw error;
        }
    }

    async addFeedBack(userId, productId, content, numberOfStarts, currentDay) {
        let feedBack = {
            productId: productId,
            userId: userId,
            content: content,
            createdDate: currentDay,
            stars: numberOfStarts
        }
        try {
            const newFeedBack = await Feedback.create(feedBack);
        }
        catch (error) {
            console.error('Error creating contact:', error);
        }

    }
    async getAverageNumberOfStars(productId) {
        try {
            const feedbackList = await Feedback.findAll({
                where: {
                  productId: productId,
                },
            });
        
            if (feedbackList.length === 0) {
            // No feedback, return a default value or handle accordingly
            return 0;
            }
        
            // Calculate the average number of stars
            const totalStars = feedbackList.reduce((sum, feedback) => sum + feedback.stars, 0);
            const averageStars = totalStars / feedbackList.length;
            return averageStars;
        }
        catch (error) {
            console.error('Error access feedback database:', error);
        }

    }
    async checkOrderYet(userId, productId) {
        try{
            const orders = await Order.findAll({
                where: {
                  userId: userId,
                },
                include: {
                  model: OrderDetail,
                  where: {
                    productId: productId,
                  },
                },
            });
            if (!orders || orders.length == 0) {
                // Throw a custom exception if the cart is not found
                return false;
            } else {
                return true;
            }
        } 
        catch (err){
            console.error('Error connect feedback table:', err);
        }

    }
}
module.exports = FeedbackService;