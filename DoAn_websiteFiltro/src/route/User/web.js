import express from "express";
import homeController from '../../controller/user/homeController'
import loginController from '../../controller/user/loginController'
import registerController from '../../controller/user/RegisterController'
import categoryController from '../../controller/user/CategoryController'
import contactController from '../../controller/user/ContactController'
import userController from '../../controller/user/UserController'
import orderController from '../../controller/user/OrderController'
import productController from '../../controller/user/ProductController'
import cartController from '../../controller/user/CartController'
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

const initWebRoute = (app) => {
  router.get('/', homeController.getHomepage);
  router.get('/login', loginController.getLoginPage);
  router.post('/login', loginController.login);
  router.get('/forgotPassword', loginController.getForgotPasswordPage);
  router.post('/forgotPassword', loginController.processForgotPassword);
  router.get('/resetPassword', loginController.getLinkChangePasswordPage);
  router.get('/resetPasswordPage', loginController.getChangePasswordPage);
  router.post('/resetPassword', loginController.processChangePassword);
  router.get('/logout', loginController.logout);
  router.get('/test', homeController.testAccountModel);
  router.get('/register', registerController.getRegisterPage);
  router.post('/register', registerController.registerUser);
  router.get('/category/:id', categoryController.getShopPage);
  router.get('/category', categoryController.getShopPageByNameProduct);
  router.get('/contact', contactController.getContactPage );
  router.post('/contact', contactController.addContact );
  router.get('/user/profile', userController.showProfile);
  router.post('/user/profile/:userId', userController.processProfile);
  router.get('/user/billing', userController.showBilling);
  router.get('/user/security', userController.showSecurityPassword);  
  router.post('/user/security', userController.changePassword);  
  router.post('/order/cancel', orderController.cancel);
  router.post('/order', orderController.getOrderPage);
  router.post('/order/placeOrder', orderController.placeOrder);
  router.get('/invoice/:id', orderController.getInvoicePage);
  router.get('/invoice/:orderId/:status', orderController.updateOrder);
  router.get('/product/:id', productController.getProductPage );
  router.post('/product/:id/feedback', productController.feedback);
  router.get('/cart', cartController.showCart);
  router.post('/cart/add', cartController.addCart);
  router.post('/cart/remove/:productId', cartController.removeCartItem);
  // router.get('/detail/user/:id', homeController.getDetailPage);
  // router.post('/create-new-user', homeController.createNewUser);
  // router.post('/delete-user', homeController.deleteUser);
  // router.get('/edit-user/:id', homeController.getEditUser);
  // router.post('/update-user', homeController.postUpdateUser);
  // router.get('/about', (req, res) => {
  //     res.send(`I'm Eric`);
  //   })

  // router.get('/upload', homeController.getUploadFilePage);
  // router.post('/upload-profile-pic',upload.single('profile_pic'), homeController.handleUploadFile);
  // router.post('/upload-multiple-images',(req, res, next) => {
  //   upload1(req, res, (err) =>{
  //     if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
  //       res.send('LIMIT_UNEXPECTED_FILE');
  //     } else if (err){
  //       res.send(err);
  //     }
  //     else {
  //       next();
  //     }
  //   })
  // }, homeController.handleUploadMultipleFiles);
  return app.use('/', router);
}
// module.export = initWebRoute;
export default initWebRoute;