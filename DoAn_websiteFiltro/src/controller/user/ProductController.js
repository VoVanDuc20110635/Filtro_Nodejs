const Product = require('../../model/Product');
const ProductService = require('../../services/ProductService');
const productService = new ProductService();

const FeedbackService = require('../../services/FeedbackService');
const feedbackService = new FeedbackService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

let errorMessage;

let getProductPage = async (req, res) => {
    let userId = parseInt( req.session.user.userId, 10);
    const categories = await categoryService.get5Categories();
    let productId = req.params.id;
    let currentProductId = parseInt(productId, 10);
    let product = await productService.getProductById(currentProductId);
    let feedbackList = await feedbackService.getAllFeedBackByProductId(currentProductId);
    let numberOfFeedback = feedbackList.length;
    let productList = await productService.getTop4ProductsByFlavor(product.Flavor.flavorId);
    if (errorMessage != null){
        return res.render('../views/user/detail.ejs', {errorMessage: errorMessage});
    }
    errorMessage = null;
    return res.render('../views/user/detail.ejs', {session: req.session, product: product, numberOfFeedback: numberOfFeedback,
        products: productList, currentProductId: currentProductId, feedbackList: feedbackList, categories: categories});

}

let feedback = async(req, res) => {
    let productId = parseInt(req.params.id, 10);
    let userId = parseInt( req.session.user.userId, 10);
    let {content, numberOfStars, currentDay} = req.body;
    numberOfStars = parseInt(numberOfStars, 10);
    // console.log(userId, productId, content, numberOfStars, currentDay);
    await feedbackService.addFeedBack(userId, productId, content, numberOfStars, currentDay);
    return res.redirect(`/product/${productId}`);

}
module.exports = {
    getProductPage,
    feedback
}