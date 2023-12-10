// import pool from "../configs/connectDB";
import pool from "../../configs/connectDB"
import multer from 'multer';
import Product from "../../model/Product";

const AccountService = require('../../services/AccountService');
const accountService = new AccountService();

const UserService = require('../../services/UserService');
const userService = new UserService();

const CategoryService = require('../../services/CategoryService')
const categoryService = new CategoryService();

const ProductService = require('../../services/ProductService');
const productService = new ProductService();

const FlavorService = require('../../services/FlavorService');
const flavorService = new FlavorService();


const AuthenticationAccountException = require('../../Exception/AuthenticationAccountException');

let getShopPage = async (req, res) => {
    const categories = await categoryService.get5Categories();
    const { id } = req.params;
    // console.log(req.query);
    // console.log("id category: ", id);
    let {searchName='', lowPrice = 0, highPrice = 10000000, sortType = 'best_selling', flavorId = 0, currentPage = 1 } = req.query;
    //when get data from req.query, everything is string
    // console.log(lowPrice, highPrice, sortType, flavorId, currentPage);
    // const materialList = await Material.findAll();

    const dataLowPrice = parseInt(lowPrice);
    const dataHighPrice = parseInt(highPrice);
    const dataFlavorId = parseInt(flavorId);
    const dataCurrentPage = parseInt(currentPage);

    const pageSize = 8;
    let currentId = 0;
    let currentIdAll = "";
    let category;
    let products;
    let totalPages;

    if (id === 'all') {
        if (dataHighPrice !== 10000000 && dataFlavorId !== 0) {
            let result = await productService.getProductByPriceAndFlavor(
                searchName,
                dataLowPrice,
                dataHighPrice,
                dataFlavorId,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else if (dataHighPrice !== 10000000) {
            let result = await productService.getProductByPrice(
                searchName,
                dataLowPrice,
                dataHighPrice,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else if (dataFlavorId !== 0) {
            let result = await productService.getProductByFlavor(
                searchName,
                dataFlavorId,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else {
            let result = await productService.sortPage(searchName,
                dataCurrentPage,
                pageSize,
                sortType);
            products = result.products;
            totalPages = result.totalPages;
            // totalPages = 5;
        }
        currentIdAll = 'all';
    } else {
        if (dataHighPrice !== 10000000 && flavorId !== 0) {
            let result = await productService.getProductByCategoryAndPriceAndFlavor(
                searchName,
                parseInt(id),
                dataLowPrice,
                dataHighPrice,
                dataFlavorId,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else if (dataHighPrice !== 10000000) {
            let result = await productService.getProductByCategoryAndPrice(
                searchName,
                parseInt(id),
                dataLowPrice,
                dataHighPrice,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else if (flavorId !== 0) {
            let result = await productService.getProductByCategoryAndFlavor(
                searchName,
                parseInt(id),
                dataFlavorId,
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        } else {
            let result = await productService.getProductByCategory(
                searchName,
                parseInt(id),
                dataCurrentPage,
                pageSize,
                sortType
            );
            products = result.products;
            totalPages = result.totalPages;
        }
        category = await categoryService.getCategoryById(id);
        // console.log(category);
        currentId = parseInt(id);
    }

    // let { products, totalPages } = await productService.sortPage(1, 8, 'product_name_asc');

    // let result = await productService.getProductByPriceAndFlavor(0,1000000,2,1, 8, 'product_name_asc');
    // let products = result.products;
    // let totalPages = result.totalPages;
    // category = categoryService.getCategoryById(id);

    // let { products, totalPages } = await productService.getProductByCategoryAndFlavor(2,2,1, 8, 'product_name_asc');
    // const productsJSON = products.rows.map(product => product.toJSON());
    // return res.send({ products: productsJSON, totalPages });
    // console.log(products);
    // return res.send(products.toJSON());
    let flavorList = await flavorService.getFlavorList();
    return res.render('../views/user/shop.ejs', {
        session: req.session, categories: categories, products: products,
        currentPage: dataCurrentPage, dataLowPrice: dataLowPrice, dataHighPrice: dataHighPrice, currentId: currentId,
        sortType: sortType, totalPages: totalPages, currentIdAll: currentIdAll, category: category, flavorList: flavorList,
        flavorId: dataFlavorId, dataFlavorId: dataFlavorId, searchName: searchName
    });
}

let getShopPageByNameProduct = async (req, res) => {
    try {
        let {searchName=''} = req.query;
        // searchName = searchName || '';
        let lowPrice = 0, highPrice = 1000000, sortType = 'best_selling', flavorId = 0, currentPage = 1;
        let products;
        let currentIdAll = 'all';
        let totalPages;
        let currentId = 0;
        const  id  = 'all';
        const pageSize = 8;
        const categories = await categoryService.get5Categories();
        const dataLowPrice = parseInt(lowPrice);
        const dataHighPrice = parseInt(highPrice);
        const dataFlavorId = parseInt(flavorId);
        const dataCurrentPage = parseInt(currentPage);
        let category;
        if (id !== 'all'){
            category = await categoryService.getCategoryById(id);
        }
        let flavorList = await flavorService.getFlavorList();
        let result = await productService.searchProductsByName(
            searchName,
            currentPage,
            pageSize,
            sortType
        );
        products = result.products;
        totalPages = result.totalPages;
        return res.render('../views/user/shop.ejs', {
            session: req.session, categories: categories, products: products,
            currentPage: dataCurrentPage, dataLowPrice: dataLowPrice, dataHighPrice: dataHighPrice, currentId: currentId,
            sortType: sortType, totalPages: totalPages, currentIdAll: currentIdAll, category: category, flavorList: flavorList,
            flavorId: dataFlavorId, dataFlavorId: dataFlavorId, searchName: searchName
        });
    } catch (error) {
        console.error('Error sorting and paginating products:', error);
        throw error;
    }   
}


module.exports = {
    getShopPage,
    getShopPageByNameProduct
}