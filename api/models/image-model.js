const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const ImageSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    images: [
        {
            data: Buffer,
            contentType: String,
            gps: { 
                lngDec: Number, 
                latDec: Number 
            }
        }
    ]
});

const Image = mongoose.model('Image', ImageSchema);

Image.createImageObj = (userId) => {
    const images = new Image({
        userId: userId,
        images: []
    });
    return images.save();
}

Image.findImagesByUserId = (userId) => {
    console.log(userId)
    return Image.findOne({ userId }).lean();
}

Image.addImage = (userId, image, gps) => {
    let img = {
        data: fs.readFileSync(path.join(__dirname + '/../../uploads/' + image.originalname)),
        contentType: image.mimetype,
        gps: JSON.parse(gps)
    }
    return Image.findOneAndUpdate(
        { userId },
        { $push: { images: img } },
        { new: true }
    ).lean();
}

module.exports = Image;