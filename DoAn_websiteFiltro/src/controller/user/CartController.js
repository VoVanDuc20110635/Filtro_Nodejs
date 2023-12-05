const Cart = require('../../model/Cart');
const GuestCart = require('../../model/GuestCart');
const CartService = require('../../services/CartService')
const cartService = new CartService();

const CartItemService = require('../../services/CartItemService');
const GuestCartService = require('../../services/GuestCartService');
const cartItemService = new CartItemService();
const guestCartService = new GuestCartService();


const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

let showCart = async(req,res) => {
    let user = req.session.user; 
    let guestCart = req.session.guestCart;
    const categories = await categoryService.get5Categories();
    try{
        if (user){
            let cart = await cartService.getCurrentCartByUserId(user.userId);
            if (cart){
                let cartItemList = await cartItemService.getCartItemList(cart.id);
                return res.render('../views/user/cart.ejs', {cartItemList: cartItemList, cart: cart, 
                    session: req.session, categories: categories});
            }
        } else if (guestCart){
            let cartItemList = await guestCartService.getCartItemList(guestCart.id);
            return res.render('../views/user/cart.ejs', {cartItemList: cartItemList, guestCart: guestCart, 
                session: req.session,  categories: categories});
        } else{
            let cartItemList = [];
            return res.render('../views/user/cart.ejs', {message: "No products available in your cart", session: req.session,
            categories: categories, cartItemList: cartItemList});
        }

    } catch(error){
            let cartItemList = [];
            return res.render('../views/user/cart.ejs', {message: "No products available in your cart", session: req.session,
            categories: categories, cartItemList: cartItemList});
    }
    
}

let addCart = async(req, res) => {
    let {productId, quantity,productDetailId} = req.body;
    let user = req.session.user; 
    let guessCart = req.session.guestCart;
    let cart = null;
    if (user){
        try{
            cart = await cartService.getCurrentCartByUserId(user.userId);
            req.session.cart = cart;
        } catch (error){
            cart = await cartService.createCart(user);
            req.session.cart = cart;
        }
        try{
            await cartService.addProductToCart(cart, productId, quantity, productDetailId);
        } catch(error){
        }
        
    } else if (guessCart) {
        await guestCartService.addProductToGuestCart(guessCart, productId, quantity,productDetailId);
        let guestCartDatabase = await guestCartService.getGuestCartById(req.session.guestCart.id);
        req.session.guestCart.updatedDate = guestCartDatabase.updatedDate;
        return res.redirect('/cart');
    } else {
        guessCart = await guestCartService.createGuestCart();
        req.session.guestCart = guessCart;
        await guestCartService.addProductToGuestCart(guessCart, productId, quantity,productDetailId);
    }
    return res.redirect('/cart');
}

let removeCartItem = async(req, res) => {
    let productId = req.params.productId;
    let user = req.session.user;
    let guestCart = req.session.guestCart;
    if (user){
        let cart = await cartService.getCurrentCartByUserId(user.userId);
        await cartService.removeCartItemByCartIdAndProductId(cart.id, productId);
    } else if (guestCart){
        await guestCartService.removeCartItemByGuestCartIdAndProductId(guestCart.id, productId);
        const guestCartDatabase = await GuestCart.findOne({
            where: {
                id: guestCart.id
            }
        });
        guestCartDatabase.updatedDate = new Date();
        guestCartDatabase.save();
    }
    return res.redirect('/cart');
}

module.exports = {
    showCart,
    addCart,
    removeCartItem,

}