// Cloud pr kaha file store krna h
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const { param } = require('./routes/listing');
// backend ko cloudinary k account k saath join krne k liye
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'Stay-inn_dev',
        allowed_formats: ['png' , 'jpeg' , 'jpg' , 'avif'],
    },
});

module.exports = {
    cloudinary,
    storage,
}