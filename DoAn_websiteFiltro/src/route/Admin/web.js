import express from "express";
import loginController from '../../controller/admin/loginController'
import accountController from '../../controller/admin/accountController'
import categoryController from '../../controller/admin/categoryController'
import flavorController from '../../controller/admin/flavorController'
import orderController from '../../controller/admin/orderController'
import productController from '../../controller/admin/productController'
import staffController from '../../controller/admin/staffController'
import userController from '../../controller/admin/userController'
import multer from 'multer';
import path from 'path';
import { error } from "console";
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRouteAdmin = (app) => {
  // router.get('/', homeController.getHomepage);
  router.get('/admin/login', loginController.getLoginPage);
  router.post('/admin/login', loginController.login);
  router.get('/admin/logout', loginController.logout);
  router.get('/admin', loginController.getDashBoardPage);
  router.get('/admin/account', accountController.getAccountPage);
  router.post('/admin/account', accountController.update);
  router.get('/admin/category', categoryController.getCategoryPage);
  router.post('/admin/category', categoryController.update);
  router.post('/admin/create/category', categoryController.create);
  router.get('/admin/flavor', flavorController.getFlavorPage);
  router.post('/admin/flavor', flavorController.update);
  router.post('/admin/create/flavor', flavorController.create);
  router.get('/admin/order', orderController.getOrderPage);
  router.post('/admin/order', orderController.update);
  router.get('/admin/product', productController.getProductPage);
  router.get('/admin/staff', staffController.getStaffPage);
  router.get('/admin/user', userController.getUserPage);
  // router.post('/login', loginController.login);

  return app.use('/', router);
}
// module.export = initWebRoute;
export default initWebRouteAdmin;