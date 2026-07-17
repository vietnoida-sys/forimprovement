const Faq = require("../models/Faq");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(Faq, { sortBy: "category -createdAt" });