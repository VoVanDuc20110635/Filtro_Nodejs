const Product = require('../model/Product');
const Associations = require('../model/Associations');
const {Sequelize, Op, literal  } = require('sequelize');
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
            console.log(topSellingProducts);
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
                include: ProductDetail,
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
                include: ProductDetail,
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
    async sortPage(searchName,currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                    },
                    status: 1 
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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

    async getProductByPriceAndFlavor(searchName,lowPrice, highPrice, flavorId, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    flavorId: flavorId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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

    async getProductByCategoryAndPriceAndFlavor(searchName,categoryId, lowPrice, highPrice, flavorId, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    price: {
                        [Op.between]: [lowPrice, highPrice]
                    },
                    flavorId: flavorId,
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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


    async getProductByPrice(searchName,lowPrice, highPrice, currentPage, pageSize, sortType) {
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
                  productName: {
                    [Op.like]: `%${searchName}%`,
                  },
                  status: 1,
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true,
              });
              
            console.log(products);


            // Check if products.rows is defined and not empty before applying filter
            // Check if products.rows is defined and not empty before applying filter
            const filteredProducts = products.rows && products.rows.length > 0
            ? products.rows.filter(product => {
                // Check if all ProductDetails meet the condition
                const detailsMeetCondition = product.ProductDetails.every(detail => {
                    const calculatedPrice = detail.price - (detail.price * detail.discount / 100);

                    // Log additional details for debugging
                    console.log('Product ID:', product.productId);
                    console.log('Product Name:', product.productName);
                    console.log('Detail ID:', detail.productDetailId);
                    console.log('Calculated Price:', calculatedPrice);
                    console.log('Low Price:', lowPrice);
                    console.log('High Price:', highPrice);

                    return calculatedPrice > lowPrice && calculatedPrice < highPrice;
                });

                // Log whether the condition is met or not
                console.log('Details Meet Condition:', detailsMeetCondition);

                return detailsMeetCondition;
            })
            : [];

            console.log('filteredProducts: ', filteredProducts);


            // Check if filteredProducts is not empty before using .map
            const productsWithUpdatedImage = filteredProducts.length > 0
            ? filteredProducts.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
                }))
            : [];

            console.log('productsWithUpdatedImage: ', productsWithUpdatedImage);

            const totalPages = Math.ceil(filteredProducts.count / pageSize);
            return {
                products: productsWithUpdatedImage,
                totalPages,
            };
        } catch (error) {
            console.error('Error sorting and paginating products:', error);
            throw error;
        }
    }

    async getProductByCategoryAndPrice(searchName,categoryId, lowPrice, highPrice, currentPage, pageSize, sortType) {
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
            console.log(lowPrice, highPrice);
            const offset = (currentPage - 1) * pageSize;
            const limit = pageSize;

            const products = await Product.findAndCountAll({
                where: {
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true,
                having: literal(`(
                    SELECT MAX(price - price * discount)
                    FROM ProductDetails AS ProductDetail
                    WHERE ProductDetail.productId = Product.productId
                  ) BETWEEN :lowPrice AND :highPrice`, {
                    lowPrice,
                    highPrice,
                  }),
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

    async getProductByFlavor(searchName,flavorId, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    flavorId: flavorId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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

    async getProductByCategoryAndFlavor(searchName,categoryId, flavorId, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    flavorId: flavorId,
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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

    async getProductByCategory(searchName,categoryId, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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

    async getProductById(searchName,id) {
        try {
            const product = await Product.findOne({
                where: { productName: {
                    [Op.like]: `%${searchName}%`
                    
                },
                productId: id }, // Assuming your Product model has an 'id' field
                include: [Flavor,ProductDetail]
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
    async searchProductsByName(searchName, currentPage, pageSize, sortType) {
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
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    }, 
                    status:1
                },
                include: ProductDetail,
                order: orderBy,
                offset,
                limit,
                distinct: true
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
          console.error('Error searching name for products:', error);
          throw error;
        }
      }
}

module.exports = ProductService;