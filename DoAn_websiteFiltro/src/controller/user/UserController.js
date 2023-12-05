const OrderService = require('../../services/OrderService');
const orderService = new OrderService();
const UserService = require('../../services/UserService');
const userService = new UserService();

let showProfile = async (req, res) => {
    let temp = req.session.user;
    if (!temp){
        res.render('../views/user/user-profile.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    let user = await userService.getUserById(temp.userId);
    return res.render('../views/user/user-profile.ejs', { session: req.session, user: user });
}

let processProfile = async (req, res) => {
    let userId = req.params.userId;
    userId = parseInt(userId,10);
    // console.log(userId);
    let {name, address, zip, city, email, phoneNumber, dob, sex} = req.body;
    // console.log(name, address, zip, city, email, phoneNumber, dob, sex);
    await userService.updateUser(userId, name, address, zip, city, email, phoneNumber, dob, sex);
    return res.redirect('/user/profile');
}

let showBilling = async (req, res) => {
    let user = req.session.user;
    if (!user){
        res.render('../views/user/user-profile.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    let orderList;
    try {
        orderList = await orderService.getOrderByUserId(user.userId);
    }
    catch (Exception){
        orderList = [];
    }

    return res.render('../views/user/user-billing.ejs', { session: req.session, orderList: orderList });
}

let showSecurityPassword = async (req, res) => {
    let user = req.session.user;
    if (!user){
        res.render('../views/user/user-profile.ejs', {session: req.session, message: "Please Login"});
        return;
    }
    return res.render('../views/user/user-security.ejs', { session: req.session });
}

module.exports = {
    showProfile,
    processProfile,
    showBilling,
    showSecurityPassword
}