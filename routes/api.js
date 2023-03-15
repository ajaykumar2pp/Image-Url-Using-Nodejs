const imageController = require("../app/Controller/imageController")
function initRoutes(app) {

app.get("/",imageController().getImage)
app.post("/upload",imageController().postImage)
app.get("/image",imageController().getImageUrl)

}
module.exports = initRoutes

