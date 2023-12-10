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
                    flavorId: flavorId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                distinct: true
            });
            const copyProducts = await Product.findAndCountAll({
                where: {
                    productName: {
                        [Op.like]: `%${searchName}%`
                        
                    },
                    flavorId: flavorId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                distinct: true
            });
            copyProducts.rows = [];
            
            for (var i = 0; i < products.rows.length; ++i) {
                let detailsMeetConditionCheck = false;
                var product = products.rows[i];
                for (var j = 0; j < product.ProductDetails.length; ++j) {
                    var productDetail = product.ProductDetails[j];
                    if (lowPrice < productDetail.price - productDetail.price*productDetail.discount/100 &&
                        highPrice > productDetail.price - productDetail.price*productDetail.discount/100 ) {
                            detailsMeetConditionCheck = true;
                            break;
                    }
                }
                if (detailsMeetConditionCheck == false){
                    
                    
                }else {
                    copyProducts.rows.push(product); 
                    detailsMeetConditionCheck = false;
                }
            }; 
            const totalPages = Math.ceil(copyProducts.rows.length / pageSize);
            copyProducts.rows = copyProducts.rows.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + limit );
            const productsWithUpdatedImage = copyProducts.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            
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
                    flavorId: flavorId,
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                distinct: true
            });
            const copyProducts = await Product.findAndCountAll({
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
                distinct: true
            });
            copyProducts.rows = [];
            
            for (var i = 0; i < products.rows.length; ++i) {
                let detailsMeetConditionCheck = false;
                var product = products.rows[i];
                for (var j = 0; j < product.ProductDetails.length; ++j) {
                    var productDetail = product.ProductDetails[j];
                    if (lowPrice < productDetail.price - productDetail.price*productDetail.discount/100 &&
                        highPrice > productDetail.price - productDetail.price*productDetail.discount/100 ) {
                            detailsMeetConditionCheck = true;
                            break;
                    }
                }
                if (detailsMeetConditionCheck == false){
                    
                    
                }else {
                    copyProducts.rows.push(product); 
                    detailsMeetConditionCheck = false;
                }
            }; 
            const totalPages = Math.ceil(copyProducts.rows.length / pageSize);
            copyProducts.rows = copyProducts.rows.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + limit );
            const productsWithUpdatedImage = copyProducts.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            
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
                distinct: true,
            });
            const copyProducts = await Product.findAndCountAll({
                where: {
                  productName: {
                    [Op.like]: `%${searchName}%`,
                  },
                  status: 1,
                },
                include: ProductDetail,
                order: orderBy,
                distinct: true,
            });

            copyProducts.rows = [];
            
            for (var i = 0; i < products.rows.length; ++i) {
                let detailsMeetConditionCheck = false;
                var product = products.rows[i];
                for (var j = 0; j < product.ProductDetails.length; ++j) {
                    var productDetail = product.ProductDetails[j];
                    if (lowPrice < productDetail.price - productDetail.price*productDetail.discount/100 &&
                        highPrice > productDetail.price - productDetail.price*productDetail.discount/100 ) {
                            detailsMeetConditionCheck = true;
                            break;
                    }
                }
                if (detailsMeetConditionCheck == false){
                    
                    
                }else {
                    copyProducts.rows.push(product); 
                    detailsMeetConditionCheck = false;
                }
            }; 
            const totalPages = Math.ceil(copyProducts.rows.length / pageSize);
            copyProducts.rows = copyProducts.rows.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + limit );
            const productsWithUpdatedImage = copyProducts.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            
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
                distinct: true,
            });
            const copyProducts = await Product.findAndCountAll({
                where: {
                    productName: {
                        [Op.like]: `%${searchName}%`
                    },
                    categoryId: categoryId,
                    status: 1
                },
                include: ProductDetail,
                order: orderBy,
                distinct: true,
            });
            copyProducts.rows = [];
            
            for (var i = 0; i < products.rows.length; ++i) {
                let detailsMeetConditionCheck = false;
                var product = products.rows[i];
                for (var j = 0; j < product.ProductDetails.length; ++j) {
                    var productDetail = product.ProductDetails[j];
                    if (lowPrice < productDetail.price - productDetail.price*productDetail.discount/100 &&
                        highPrice > productDetail.price - productDetail.price*productDetail.discount/100 ) {
                            detailsMeetConditionCheck = true;
                            break;
                    }
                }
                if (detailsMeetConditionCheck == false){
                    
                    
                }else {
                    copyProducts.rows.push(product); 
                    detailsMeetConditionCheck = false;
                }
            }; 
            const totalPages = Math.ceil(copyProducts.rows.length / pageSize);
            copyProducts.rows = copyProducts.rows.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + limit );
            const productsWithUpdatedImage = copyProducts.rows.map((product) => ({
                ...product.toJSON(),
                image: '/image/upload/' + product.image, // Prepend the string to the existing image value
            }));
            
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