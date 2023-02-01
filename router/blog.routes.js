const { createBlog } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", createBlog);

module.exports = {
    BlogRoutes : router
}