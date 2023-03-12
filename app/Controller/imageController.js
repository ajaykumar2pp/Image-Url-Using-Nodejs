const User = require("../model/imageURL")
const multer = require("multer")
const fs = require("fs")
const path = require("path")


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
        postImage(req, resp) {
            handleMultipartData(req, resp, async (err) => {

                if (err) {
                    return resp.send("Internal error")
                }

                const filePath = req.file.path;
                
                console.log(req.file)
                console.log(filePath)

                const { name, email } = req.body;
                console.log(name, email)
                let document;
                try {
                    document = await User.create({
                        name,
                        email,
                        image: filePath,
                    });
                    resp.status(201).json({ 'data': { ImageURL: document } });
                    document.save();
                } catch (err) {
                    resp.status(500).json(err);
                }
                // resp.status(201).json({ msg: "this is image uplaod " });
            })
        }
    }
}
module.exports = imageController;