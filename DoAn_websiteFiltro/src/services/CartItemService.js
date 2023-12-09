const Associations = require('../model/Associations');
const Cart = require('../model/Cart');
const User = require('../model/User');
const Product = require('../model/Product');
const ProductDetail = require('../model/ProductDetail');
const GuestCart = require('../model/GuestCart');
const CartItem = require('../model/CartItem');
class CartItemService{
    constructor(){};
    async getCartItemList(cartId){
        const cartItemList = await CartItem.findAll({
            where: {
                cartId: cartId
            },
            include: [Product,ProductDetail], 
        });
        const productsWithUpdatedImage = cartItemList.map((cartItem) => ({
            ...cartItem.toJSON(),
            Product: {
                ...cartItem.Product.toJSON(),
                image: '/image/upload/' + cartItem.Product.image, // Update the image URL
            },
        }));

        return productsWithUpdatedImage;
    }
    async updateCartItemList(cartId, productDetailIds, quantities, pricesArray){
        for (let i = 0; i < productDetailIds.length; i++) {
            const productDetailId = productDetailIds[i];
            const quantity = quantities[i];
            const price = pricesArray[i];
        
            // Update the quantity in the database
            await CartItem.update(
                { quantity: quantity ,total: price*quantity},
                {
                    where: {
                        cartId: cartId, // Add any other conditions you need
                        productDetailId: productDetailId
                    }
                }
            );
        }
    }
    
}
module.exports = CartItemService;