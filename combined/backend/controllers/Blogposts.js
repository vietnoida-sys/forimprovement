const BlogPost = require("../models/BlogPost");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(BlogPost, { sortBy: "-date" });