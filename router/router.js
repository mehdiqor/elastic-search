const { IndiceRoutes } = require("./indices.routes");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        message : "Hello Express"
    })
});
router.use("/index", IndiceRoutes);

module.exports = {
    AllRoutes : router
}