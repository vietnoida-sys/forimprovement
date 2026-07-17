const Banner = require("../models/Banner");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(Banner, { sortBy: "order -createdAt" });