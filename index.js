const express = require('express');

const {initilaizeDatabase} = require('./db.connect.js')

const multer = require('multer');

const cloudinary = require('cloudinary');

const dotenv = require('dotenv');

const bodyParser = require('body-parser');

const cors = require('cors');


dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

initilaizeDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// multer

const storage = multer.diskStorage({});

const upload = multer ({ storage})


// api endpoint

app.post("/upload", upload.single('image'), async(req, res) => {
    try {
        const file = req.file;

        if(!file) return res.status(400).send("No file required");


        //upload in cloudinary

        const result = await cloudinary.uploader.upload(file.path, {
            folder: "uploads",
        });

        const newImage = new ImageModel({imageUrl: result.secure.url});

        await newImage.save();

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url
        })
    } catch (error) {
        res.status(500).json({message: "Image upload failed", error: error})
    }
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})