const {
    createBlog,
    editBlog,
    updateBlog,
    searchByTitle,
    searchByMultiField,
    findBlogMultiField,
    searchByRegexp,
    getAllBlogs,
    removeBlog
} = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", createBlog);
router.put("/edit/:id", editBlog);
router.put("/update/:id", updateBlog);
router.get("/list/:value?", getAllBlogs);
router.get("/title-search", searchByTitle);
router.get("/multi-search", searchByMultiField);
router.get("/regexp-search", searchByRegexp);
router.get("/find", findBlogMultiField);
router.delete("/remove/:id", removeBlog);

module.exports = {
    BlogRoutes : router
}