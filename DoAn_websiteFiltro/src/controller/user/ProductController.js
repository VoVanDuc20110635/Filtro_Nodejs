const Product = require('../../model/Product');
const ProductService = require('../../services/ProductService');
const productService = new ProductService();

const FeedbackService = require('../../services/FeedbackService');
const feedbackService = new FeedbackService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

const InputService = require('../../services/InputService');
const inputService = new InputService();

let errorMessage;

let getProductPage = async (req, res) => {
    // let userId = parseInt( req.session.user.userId, 10);
    const categories = await categoryService.get5Categories();
    let productId = req.params.id;
    let currentProductId = parseInt(productId, 10);
    let product = await productService.getProductById(currentProductId);
    let feedbackList = await feedbackService.getAllFeedBackByProductId(currentProductId);
    let numberOfFeedback = feedbackList.length;
    let quantityDefault = 1;
    let productList = await productService.getTop4ProductsByFlavor(product.Flavor.flavorId);
    let averageNumberOfStars = await feedbackService.getAverageNumberOfStars(productId);
    if (errorMessage != null){
        let errorMessageTemp = errorMessage;
        errorMessage = null;
        return res.render('../views/user/detail.ejs', {session: req.session, product: product, numberOfFeedback: numberOfFeedback,
            products: productList, currentProductId: currentProductId, feedbackList: feedbackList, categories: categories,
            quantityDefault: quantityDefault, averageNumberOfStars:averageNumberOfStars, errorMessage: errorMessageTemp});
    }
    errorMessage = null;
    
    return res.render('../views/user/detail.ejs', {session: req.session, product: product, numberOfFeedback: numberOfFeedback,
        products: productList, currentProductId: currentProductId, feedbackList: feedbackList, categories: categories,
        quantityDefault: quantityDefault, averageNumberOfStars:averageNumberOfStars});

}

let feedback = async(req, res) => {
    let productId = parseInt(req.params.id, 10);
    let userId = parseInt( req.session.user.userId, 10);
    let {content, numberOfStars, currentDay} = req.body;
    if (numberOfStars == undefined){
        numberOfStars = 5;
    } else{
        numberOfStars = parseInt(numberOfStars, 10);
    }
    if (await inputService.isValidComment(content) == false){
        errorMessage = "Chỉ được nhập chữ thường, chữ hoa, số tự nhiên, chữ tiếng việt, dấu @, dấu (), dấu phẩy, dấu nháy đơn, nháy kép, dấu chấm và khoảng trắng, dài từ 1 - 100 ký tự.";
            return res.redirect(`/product/${productId}`);;
        }
    let checkHaveOrderYet = await feedbackService.checkOrderYet(userId, productId);
    if(checkHaveOrderYet == false){
        errorMessage = "Bạn chưa mua sản phẩm này nên không được bình luận";
    } else{
        await feedbackService.addFeedBack(userId, productId, content, numberOfStars, currentDay);
    }
    // console.log(userId, productId, content, numberOfStars, currentDay);
    return res.redirect(`/product/${productId}`);

}
module.exports = {
    getProductPage,
    feedback
}