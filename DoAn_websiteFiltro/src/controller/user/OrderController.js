const OrderService = require('../../services/OrderService');
const orderService = new OrderService();
const CartItemService = require('../../services/CartItemService');
const cartItemService = new CartItemService();

let cancel = async (req, res) => {
    let orderId = req.body.id;
    // console.log(orderId);
    await orderService.updateCancelOrder(orderId);
    return res.redirect('/user/billing');
}
let getOrderPage = async (req, res) => {
    if (req.session.user){
        let {productIds, quantities,prices} = req.body;
        var productDetailIdArray = productIds.split(',').map(Number);
        var quantitiesArray = quantities.split(',').map(Number);
        var pricesArray = prices.split(',').map(Number);
        await cartItemService.updateCartItemList(req.session.cart.id, productDetailIdArray, quantitiesArray, pricesArray);
        let cartItemList = await cartItemService.getCartItemList(req.session.cart.id);
        const sum = cartItemList.reduce((acc, item) => acc + item.total, 0);
        return res.render('../views/user/order.ejs', { session: req.session, cartItemList:cartItemList, sum:sum});
    } else{
        return res.render('../views/user/order.ejs', { session: req.session});    
    }
}

let placeOrder = async(req, res) => {
    try{
        let {sumOfAllItem, address, city,zip} = req.body;
        let user = req.session.user; 
        let cartId = req.session.cart.id;
        if (user){
            await orderService.placeOrder(cartId, user,sumOfAllItem, address, city, zip);
        } else{
            return res.redirect('/login');
        }
        return res.redirect('/user/billing');
    }
    catch(err){
        return res.redirect('/user/billing');
    }
    
}

let getInvoicePage = async(req, res) => {
    if (req.session.user){
        let orderId = req.params.id;
        let order = await orderService.getInvoiceByOrderId(orderId);
        let orderDetailList = order.OrderDetails;
        return res.render('../views/user/invoice.ejs', { session: req.session,orderDetailList:orderDetailList, order: order });
    } else{
        return res.render('../views/user/invoice.ejs', { session: req.session});    
    }
}
module.exports = {
    cancel,
    getOrderPage,
    placeOrder,
    getInvoicePage
}