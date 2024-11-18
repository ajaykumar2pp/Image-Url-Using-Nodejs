require('dotenv').config()
const User = require("../model/imageURL")
const multer = require("multer")
const path = require("path")
// const fs = require("fs")
const fs = require('fs').promises;


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 10 },
}).single('image'); // 10mb



function imageController() {
    return {
        getImage(req, resp) {
            resp.render("home")
        },
        // ********************************  Find List All Product *******************************//
        async getImageUrl(req, resp) {
            try {
                const user = await User.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 });
                //   const imageUrl = user?.imageUrl || ""; // use default value if user is null or imageUrl is null/undefined
                //   resp.render("home", { imageUrl });
                resp.status(201).json({ 'data': { ImageURL: user } });
            } catch (err) {
                console.error(err);
                resp.status(500).send("Internal server error");
            }
        },

        postImage(req, resp) {
            handleMultipartData(req, resp, async (err) => {
                try {
                    if (err) {
                        console.error('Error handling multipart data:', err);
                        return resp.status(500).json({ error: 'Error processing file upload' });
                    }

                    // Ensure a file was uploaded
                    if (!req.file) {
                        console.log('No file received');
                        return resp.status(400).json({ error: 'No file uploaded' });
                    }

                    // Get image details
                    const imageName = req.file.filename;
                    const imageURL = `http://${req.headers.host}/uploads/${imageName}`;

                    // Validate required fields
                    const { name, email } = req.body;
                    if (!name || !email) {
                        console.log('Missing required fields: name or email');

                        // Delete the uploaded file asynchronously
                        await fs.unlink(req.file.path);
                        console.log('Uploaded file deleted due to missing fields.');

                        return resp.status(400).json({ error: 'All required fields are mandatory' });
                    }

                    // Save user details to the database
                    const document = await User.create({
                        name,
                        email,
                        image: imageURL, // Store the image URL in the database
                    });

                    // Respond with success
                    resp.status(201).json({ message: 'User created successfully', data: document });

                } catch (error) {
                    console.error('Error in postImage:', error);

                    // Ensure the uploaded file is deleted on error
                    if (req.file && req.file.path) {
                        try {
                            await fs.unlink(req.file.path);
                            console.log('Uploaded file deleted due to an internal error.');
                        } catch (unlinkError) {
                            console.error('Error deleting file:', unlinkError);
                        }
                    }

                    resp.status(500).json({ error: 'Internal server error' });
                }
            });
        }
    }
}
module.exports = imageController;