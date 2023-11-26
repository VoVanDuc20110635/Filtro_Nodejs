import pool from "../configs/connectDB";
import multer from 'multer';

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('select * from users');
    return res.render('../views/user/index.ejs', { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    // console.log("userId: ", userId);
    let user = await pool.execute(`select * from users where id = ?`, [userId]);
    return res.send(JSON.stringify(user[0]));
}

let createNewUser = async (req, res) => {
    console.log('check req: ', req.body);
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)',
        [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
}

let getEditUser = async (req, res) => {
    // console.log('edit user id: ', req.params.id);
    let id = req.params.id;
    let [user] = await pool.execute(`select * from users where id  = ?`, [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser = async (req, res) => {
    let { userId, firstName, lastName, email, address } = req.body;
    console.log(firstName, lastName, email, address, userId);
    await pool.execute(`update users set firstName = ?, lastName= ?, email = ?, address = ? where id = ?`,
        [firstName, lastName, email, address, userId]);
    // return res.redirect(`/edit-user/${userId}`);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
}



const upload = multer().single('profile_pic');
// const uploadMultiple = multer().array('multiple_images', 3);

let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }


    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditUser,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}