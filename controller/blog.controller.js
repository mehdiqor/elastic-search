const { elasticClient } = require("../config/elastic.config");
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
async function editBlog(req, res, next){
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const blog = (await elasticClient.search({
            index : indexBlog,
            query : {
                match : {
                    _id : id
                }
            }
        })).hits.hits?.[0] || {};
        const payload = blog?._source || {};
        const updatedResult = await elasticClient.index({
            index : indexBlog,
            id,
            body : {...payload, ...data}
        });
        return res.json(updatedResult)
    } catch (error) {
        next(error)
    }
}
async function updateBlog(req, res, next){
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const updatedResult = await elasticClient.update({
            index : indexBlog,
            id,
            doc : data
        });
        return res.json(updatedResult)
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req, res, next){
    try {
        const {title} = req.query;
        const result = await elasticClient.search({
            index : indexBlog,
            query : {
                match : {
                    title
                }
            }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function searchByMultiField(req, res, next){
    try {
        const {search} = req.body;
        const result = await elasticClient.search({
            index : indexBlog,
                query : {
                    multi_match : {
                        query : search,
                        fields : ["title", "text", "author"]
                    }
                }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function findBlogMultiField(req, res, next){
    try {
        const {search} = req.body;
        const result = await elasticClient.search({
            index : indexBlog,
                query : {
                    bool : {
                        should : [
                            {
                                regexp : {title : `.*${search}.*`}
                            },
                            {
                                regexp : {text : `.*${search}.*`}
                            },
                            {
                                regexp : {author : `.*${search}.*`}
                            },
                        ]
                    }
                }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req, res, next){
    try {
        const {search} = req.query;
        const result = await elasticClient.search({
            index : indexBlog,
            query : {
                regexp : {
                    title : `.*${search}.*`
                }
            }
        })
        return res.json(result.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function getAllBlogs(req, res, next){
    try {
        const value = req.params.value
        const blogs = await elasticClient.search({
            index : indexBlog,
            q : value
        })
        return res.json(blogs.hits.hits)
    } catch (error) {
        next(error)
    }
}
async function removeBlog(req, res, next){
    try {
        const {id} = req.params;
        const deletedResult = await elasticClient.deleteByQuery({
            index : indexBlog,
            query : {
                match : {
                    _id : id
                }
            }
        })
        return res.json(deletedResult)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBlog,
    editBlog,
    updateBlog,
    searchByTitle,
    searchByMultiField,
    findBlogMultiField,
    searchByRegexp,
    getAllBlogs,
    removeBlog
}