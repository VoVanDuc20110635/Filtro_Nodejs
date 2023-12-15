const OrderService = require('../../services/OrderService');
const orderService = new OrderService();
const VnpayService = require('../../services/VnpayService');
const vnpayService = new VnpayService();


let createVNPayOrder = async(req, res) => {
    try{
        let orderId = req.params.orderId;
        let user = req.session.user; 
        let cartId = req.session.cart.id;
        let orderDto = await orderService.getOrderById(orderId);
        if (user && orderDto){
            let link = await vnpayService.vnpRequest(orderDto, req);
            console.log(link);
        } else{
            return res.redirect('/cart');
        }
        return res.redirect('/user/billing');
    }
    catch(err){
        console.log(err);
        return res.redirect('/cart');
    }
    
}

module.exports = {
    createVNPayOrder
}