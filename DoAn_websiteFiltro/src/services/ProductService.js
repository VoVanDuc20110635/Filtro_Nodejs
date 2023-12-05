const Product = require('../model/Product');
const Associations = require('../model/Associations');
const { Op } = require('sequelize');
const Flavor = require('../model/Flavor');
const ProductDetail = require('../model/ProductDetail');
class ProductService {
    constructor() { };
    async getSixthProducts() {
        try {
            const latestProducts = await Product.findAll({
                where: {
                    status: 1, // Filter by products with status 1
                },
                order: [['createdDate', 'DESC']], // Order by createdDate in descending order
                limit: 6, // Limit the result to 6 rows
            });

            // Update the image URLs for each product
            const updatedProducts = latestProducts.map((product) => {
                const updatedImageName = `/image/upload/${product.image}`;

                // Update the image name in the product object
                product.image = updatedImageName;
                return product;
            });

            return updatedProducts;
        } catch (error) {
            console.error('Error finding latest products:', error);
            throw error;
        }
    }

    async getTop8SellingProducts() {
        try {
            const topSellingProducts = await Product.findAll({
                where: {
                    status: 1, // Filter by products with status 1
                },
                include: ProductDetail,
                order: [['sold', 'DESC']], // Order by sold in descending order
                limit: 8, // Limit the result to 8 rows
            });
            // Update the image URLs for each product
            const updatedProducts = topSellingProducts.map((product) => {
                const updatedImageName = `/image/upload/${product.image}`;

                // Update the image name in the product object
                product.image = updatedImageName;
                return product;
            });

            return updatedProducts;
        } catch (error) {
            console.error('Error finding top selling products:', error);
            throw error;
        }
    }

    async getTop4ProductsByFlavor(flavorId) {
        try {
            const topSellingProducts = await Product.findAll({
                where: {
                    status: 1, // Filter by products with status 1
                    flavorId: flavorId
                },
                order: [['sold', 'DESC']], // Order by sold in descending order
                limit: 4, // Limit the result to 8 rows
            });
            // Update the image URLs for each product
            const updatedProducts = topSellingProducts.map((product) => {
                const updatedImageName = `/image/upload/${product.image}`;

                // Update the image name in the product object
                product.image = updatedImageName;
                return product;
            });

            return updatedProducts;
        } catch (error) {
            console.error('Error finding top selling products:', error);
            throw error;
        }
    }

    async getTopDiscountProducts() {
        try {
            const top4MostDiscountProducts = await Product.findAll({
                where: {
                    status: 1, // Filter by products with status 1
                },
                order: [['discount', 'DESC']], // Order by discount in descending order
                limit: 4, // Limit the result to 4 rows
            });
            const updatedProducts = top4MostDiscountProducts.map((product) => {
                const updatedImageName = `/image/upload/${product.image}`;

                // Update the image name in the product object
                product.image = updatedImageName;
                return product;
            });

            return updatedProducts;
        } catch (error) {
            console.error('Error finding top 4 most discounted products:', error);
            throw error;
        }
    }

    //getAll = sortPage
    async sortPage(currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: { status: 1 },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    };

    async getProductByPriceAndFlavor(lowPrice, highPrice, flavorId, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    flavorId: flavorId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByCategoryAndPriceAndFlavor(categoryId, lowPrice, highPrice, flavorId, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    flavorId: flavorId,
                    categoryId: categoryId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }


    async getProductByPrice(lowPrice, highPrice, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByCategoryAndPrice(categoryId, lowPrice, highPrice, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    categoryId: categoryId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByFlavor(flavorId, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    flavorId: flavorId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByCategoryAndFlavor(categoryId, flavorId, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    flavorId: flavorId,
                    categoryId: categoryId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByCategory(categoryId, currentPage, pageSize, sortType) {
        try {
            let orderBy = [];

            switch (sortType) {
                case 'product_name_asc':
                    orderBy.push(['productName', 'ASC']);
                    break;
                case 'product_name_desc':
                    orderBy.push(['productName', 'DESC']);
                    break;
                case 'price_asc':
                    orderBy.push(['price', 'ASC']);
                    break;
                case 'price_desc':
                    orderBy.push(['price', 'DESC']);
                    break;
                case 'newest':
                    orderBy.push(['createdDate', 'ASC']);
                    break;
                case 'oldest':
                    orderBy.push(['createdDate', 'DESC']);
                    break;
                default:
                    orderBy.push(['sold', 'DESC']);
                    break;
            }

            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    categoryId: categoryId,
                    status: 1
                },
                order: orderBy,
                offset,
                limit,
            });
            const productsWithUpdatedImage = products.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            const totalPages = Math.ceil(products.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findOne({
                where: { productId: id }, // Assuming your Product model has an 'id' field
                include: Flavor
            });
            // console.log(product);

            product.image = `/image/upload/${product.image}`;

            // Update the image URLs for each product
            // const updatedProducts = product.map((product) => {
            //     const updatedImageName = `/image/upload/${product.image}`;

            //     // Update the image name in the product object
            //     product.image = updatedImageName;
            //     return product;
            // });

            return product;
        } catch (error) {
            throw error;
        }
    }
    async getProductDetailById(id) {
        try {
            const productDetail = await ProductDetail.findOne({
                where: { productDetailId: id } // Assuming your Product model has an 'id' field
                
            });

            return productDetail;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;