const Feedback = require('../model/Feedback');
const User = require('../model/User');
const Associations = require('../model/Associations');
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
}
module.exports = FeedbackService;