const { BlogRoutes } = require("./blog.routes");
const { IndiceRoutes } = require("./indices.routes");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        message : "Hello Express"
    })
});
router.use("/index", IndiceRoutes);
router.use("/blog", BlogRoutes);

module.exports = {
    AllRoutes : router
}