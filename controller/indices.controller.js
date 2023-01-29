const httpError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");

async function createIndex(req, res, next){
    try {
        const {indexName} = req.body;
        if(!indexName) throw httpError.BadRequest("please enter index name");
        const result = await elasticClient.indices.create({index : indexName});
        console.log(result);
        return res.json({
            result,
            message : "index created"
        })
    } catch (error) {
        next(error)
    }
}
async function getIndices(req, res, next){
    try {
        const indices = await elasticClient.indices.getAlias();
        const regex = /^\.+/
        return res.json({
            indices : Object.keys(indices).filter(item => !regex.test(item))
        })
    } catch (error) {
        next(error)
    }
}
async function removeIndex(req, res, next){
    try {
        const {indexName} = req.params;
        const removeResult = await elasticClient.indices.delete({index : indexName});
        return res.json({
            removeResult,
            message : "deleted"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createIndex,
    getIndices,
    removeIndex
}