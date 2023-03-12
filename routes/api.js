const imageController = require("../app/Controller/imageController")
function initRoutes(app) {

app.get("/",imageController().getImage)
app.post("/upload",imageController().postImage)

}
module.exports = initRoutes

