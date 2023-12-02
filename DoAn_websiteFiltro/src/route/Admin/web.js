import express from "express";
import loginController from '../../controller/admin/loginController'
import accountController from '../../controller/admin/accountController'
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
  router.get('/admin/account', accountController.getAccountPage);
  // router.post('/login', loginController.login);

  return app.use('/', router);
}
// module.export = initWebRoute;
export default initWebRouteAdmin;