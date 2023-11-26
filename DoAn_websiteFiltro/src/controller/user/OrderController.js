const OrderService = require('../../services/OrderService');
const orderService = new OrderService();

let cancel = async (req, res) => {
    let orderId = req.body.id;
    // console.log(orderId);
    await orderService.updateCancelOrder(orderId);
    return res.redirect('/user/billing');
}
module.exports = {
    cancel,

}