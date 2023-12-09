const Associations = require('../model/Associations');
const Cart = require('../model/Cart');
const User = require('../model/User');
const Product = require('../model/Product');
const GuestCart = require('../model/GuestCart');
const CartItem = require('../model/CartItem');

const ProductService = require('../services/ProductService')
const productService = new ProductService();

const CartItemService = require('../services/CartItemService');
const GuestCartService = require('../services/GuestCartService');
const cartItemService = new CartItemService();
const guestCartService = new GuestCartService();

class CartService {
    constructor() { };
    async getCurrentCartByUserId(userId) {

        try {
        const cart = await Cart.findOne({
            include: User,
            where: {
                userId: userId,
                status: 1
            },
        });

        if (!cart) {
            // Throw a custom exception if the cart is not found
            throw new Error('Cart not found for the given user ID');
        }

        return cart;
    } catch (error) {
        // Handle the error or rethrow it with additional details
        console.error('Error in getCurrentCartByUserId:', error.message);
        throw error; // Rethrow the original or a new exception
    }
    }

    async createCart(user) {
        try {
            const cart = await Cart.create({
                createdDate: new Date(),
                status: 1,
                userId: user.userId, // Assuming 'UserId' is the foreign key in the Cart model
            });
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }

    async addProductToCart(cart, productId, quantity, productDetailId) {
        try {
            const product = await productService.getProductById(productId);
            const productDetail = await productService.getProductDetailById(productDetailId);

            if (!product) {
                throw new Error("Product not found!");
            }
            const cartItem = await CartItem.findOne({
                where: {
                    cartId:parseInt(cart.id, 10) ,
                    productDetailId: parseInt(productDetailId, 10),
                },
            });
            if(cartItem){
                const cartDatabase = await Cart.findOne({
                    where: {
                        id: cart.id
                    }
                });
                cartDatabase.updatedDate = new Date();
                cartDatabase.save();
            } else{
                try{
                    const newCartItem = await CartItem.create({
                        productId: productId,
                        productDetailId: productDetailId,
                        price: productDetail.price - productDetail.price*productDetail.discount/100,
                        quantity: quantity,
                        total: (productDetail.price - productDetail.price*productDetail.discount/100) * quantity,
                        purchasedDate: new Date(),
                        cartId: cart.id
                });
                } catch (error){
                    console.error('Error creating cartItem:', error);
                    throw error;
                }
                
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error;
        }
    }

    async totalOfCartItem(user) {
        let cart = this.getCurrentCartByUserId(user.userId);
        if (cart) {
            let cartItemList = cartItemService.getCartItemList(cart.id);
            let total = (await cartItemList).reduce(
                (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
            );
            return total;
        }
        return 0;
    }
    async removeCartItemByCartIdAndProductId(cartId, productId) {
        try {
            const deletedCount = await CartItem.destroy({
                where: {
                    cartId: cartId,
                    productDetailId: productId,
                },
            });
        } catch (error) {
            console.error('Error removing cart item:', error);
            // Handle the error appropriately
        }
    }
}
module.exports = CartService;