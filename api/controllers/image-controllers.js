const ImageModel = require('../models/image-model');

let imageController = {};

imageController.createImageObj = (userId) => {
    return ImageModel.createImageObj(userId);
}

imageController.findImagesByUserId = (userId) => {
    return ImageModel.findImagesByUserId(userId);
}

imageController.addImage = (async (ctx) => {
 
    console.log('ctx.request.file', ctx.request.file);
    console.log('ctx.file', ctx.file);
    console.log('ctx.request.body', ctx.request.body);

    let result = await ImageModel.addImage(
        ctx.request.body.userId,
        ctx.request.file,
        ctx.request.body.gps
    );
 
    if (!result || result.err) throw ctx.throw(result.status, result.err)
    ctx.status = 200;
    ctx.body = result;
});

imageController.getImages = (async (ctx) => {

    console.log('ctx.request.body', ctx.request.body);

    let result = await ImageModel.findImagesByUserId(ctx.request.body.userId);
 
    if (!result || result.err) throw ctx.throw(result.status, result.err)
    ctx.status = 200;
    ctx.body = result;
});

module.exports = imageController;
