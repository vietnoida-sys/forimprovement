const Testimonial = require("../models/Testimonial");
const createCrudRouter = require("../utils/crudRouter");

module.exports = createCrudRouter(Testimonial);