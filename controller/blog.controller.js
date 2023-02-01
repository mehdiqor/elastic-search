const { elasticClient } = require("../config/elastic.config")

const indexBlog = "blog";
async function createBlog(req, res, next){
    try {
        const {title, author, text} = req.body;
        const createdResult = await elasticClient.index({
            index : indexBlog,
            document : {
                title,
                author,
                text
            }
        });
        return res.json(createdResult)
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByMultiField(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function getAllBlogs(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function removeBlog(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBlog,
    searchByTitle,
    searchByMultiField,
    searchByRegexp,
    getAllBlogs,
    removeBlog
}