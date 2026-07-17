const express = require("express");

/**
 * Generic CRUD router factory for Mongoose models.
 * @param {mongoose.Model} Model - The Mongoose model to build routes for.
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort string passed to .sort(), e.g. "order -createdAt"
 */
function createCrudRouter(Model, options = {}) {
  const router = express.Router();
  const sortBy = options.sortBy || "-createdAt";

  // GET all
  router.get("/", async (req, res, next) => {
    try {
      const items = await Model.find().sort(sortBy);
      res.json(items);
    } catch (err) {
      next(err);
    }
  });

  // GET one by ID
  router.get("/:id", async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      next(err);
    }
  });

  // POST create
  router.post("/", async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  });

  // PUT update
  router.put("/:id", async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      next(err);
    }
  });

  // DELETE
  router.delete("/:id", async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = createCrudRouter;