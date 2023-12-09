const Associations = require('../model/Associations');
const Cart = require('../model/Cart');
const User = require('../model/User');
const GuestCart = require('../model/GuestCart');
const CartItem = require('../model/CartItem');
const Product = require('../model/Product');

const ProductService = require('../services/ProductService')
const productService = new ProductService();

const CartItemService = require('../services/CartItemService');
const ProductDetail = require('../model/ProductDetail');

const cartItemService = new CartItemService();


class GuestCartService {
    constructor() { };
    async getCartItemList(guestCartId) {
        const cartItemList = await CartItem.findAll({
            where: {
                tempCartId: guestCartId
            },
            include: [Product,ProductDetail]
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

    async getGuestCartById(guestCartId) {
        const guestCart = await GuestCart.findOne({
            where: {
                id: guestCartId
            }
        });
        return guestCart;
    }

    async addProductToGuestCart(guestCart, productId, quantity, productDetailId) {
        try {
            const product = await productService.getProductById(productId);
            const productDetail = await productService.getProductDetailById(productDetailId);
            if (!product) {
                throw new Error("Product not found!");
            }

            const cartItem = await CartItem.findOne({
                where: {
                    tempCartId:parseInt(guestCart.id, 10) ,
                    productDetailId: parseInt(productDetailId, 10),
                },
            });
            if (cartItem) {
                const guestCartDatabase = await GuestCart.findOne({
                    where: {
                        id: guestCart.id
                    }
                });
                guestCartDatabase.updatedDate = new Date();
                guestCartDatabase.save();
            } else {
                try {
                    const newCartItem = await CartItem.create({
                        productId: productId,
                        productDetailId: productDetailId,
                        quantity: quantity,
                        price: productDetail.price - productDetail.price*productDetail.discount/100,
                        total: (productDetail.price - productDetail.price*productDetail.discount/100) * quantity,
                        purchasedDate: new Date(),
                        tempCartId: guestCart.id
                    });
                    const guestCartDatabase = await GuestCart.findOne({
                        where: {
                            id: guestCart.id
                        }
                    });
                    guestCartDatabase.updatedDate = new Date();
                    guestCartDatabase.save();
                } catch (error) {
                    // Handle any errors here
                    console.error('Error creating cartItem:', error);
                    throw error;
                }
            }
        } catch (error) {
            console.error("Error adding product to guestcart:", error);
            throw error;
        }
    }

    async createGuestCart() {
        try {
            const guestCart = await GuestCart.create({
                createdDate: new Date(),
            });
            return guestCart;
        } catch (error) {
            // Handle any errors here
            console.error('Error creating guest cart:', error);
            throw error;
        }
    }

    async totalOfCartItemTemp(id){
        let guestCart = this.getGuestCartById(id);
        if (guestCart){
            let cartItemList = this.getCartItemList(guestCart.id);
            let total = (await cartItemList).reduce(
                (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
            );
            return total;
        }
        return 0;
    }

    async removeCartItemByGuestCartIdAndProductId(guestCartId, productId) {
        try {  
            const deletedCount = await CartItem.destroy({
                where: {
                    tempCartId: guestCartId,
                    productDetailId: productId,
                },
            });
        } catch (error) {
            console.error('Error removing cart item:', error);
            // Handle the error appropriately
        }
    }

    async changeGuestCartToCart(cartId, tempCartId){
        try {
            // Find all CartItems with tempCartId = 15
            const cartItemsToUpdate = await CartItem.findAll({
              where: {
                tempCartId: tempCartId,
              },
            });
            const cartItemsExist= await CartItem.findAll({
                where: {
                  cartId: cartId,
                },
              });
            if(cartItemsToUpdate){
                for (const cartItem of cartItemsToUpdate) {
                    // Check if the cartItem's id is not present in cartItemsExist
                    const productDetailIdExists = cartItemsExist.some(
                        (existingCartItem) => existingCartItem.productDetailId === cartItem.productDetailId
                      );
                  
                      if (!productDetailIdExists) {
                        // If the productDetailId doesn't exist in any cartItemsExist, update it
                        await cartItem.update({
                          tempCartId: null,
                          cartId: cartId,
                        });
                    }
                }
            }
          } catch (error) {
            console.error('Error updating CartItems:', error);
          }
    }

}
module.exports = GuestCartService;