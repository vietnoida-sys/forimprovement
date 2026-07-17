const NewsEvent = require("../models/NewsEvent");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(NewsEvent, { sortBy: "date" });