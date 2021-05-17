// const JoiRouter = require("koa-joi-router");
const Router = require('@koa/router');
const multer = require('@koa/multer');
// const imageRouter = new JoiRouter();
const imageRouter = new Router();
const imageController = require('../controllers/image-controllers');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') 
        cb(null, true)
    else 
        cb(new Error('not image'), false)
}
const upload = multer({storage, fileFilter}); 

imageRouter.post('/image/addImage', upload.single('file'), imageController.addImage);
imageRouter.post('/image/getImages', imageController.getImages);

module.exports = imageRouter;