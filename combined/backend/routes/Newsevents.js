const NewsEvent = require("../models/Newsevent");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(NewsEvent, { sortBy: "date" });