const { createIndex, getIndices, removeIndex } = require("../controller/indices.controller");
const router = require("express").Router();

router.post("/create", createIndex);
router.get("/list", getIndices);
router.delete("/delete/:indexName", removeIndex);

module.exports = {
    IndiceRoutes : router
}