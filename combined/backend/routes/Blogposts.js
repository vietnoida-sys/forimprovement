const BlogPost = require("../models/Blogpost");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(BlogPost, { sortBy: "-date" });