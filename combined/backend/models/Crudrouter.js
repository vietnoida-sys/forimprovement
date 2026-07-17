const express = require("express");
const mongoose = require("mongoose");

/**
 * Builds a standard REST router (list, get one, create, update, delete)
 * for a given Mongoose model. All five content sections in the CMS
 * (banners, blog posts, testimonials, FAQs, news & events) follow the
 * same shape, so this avoids repeating the same five handlers five times.
 */
function createCrudRouter(Model, { sortBy = "-createdAt" } = {}) {
  const router = express.Router();

  const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

  // GET /api/<resource> — list everything
  router.get("/", async (req, res) => {
    try {
      const docs = await Model.find().sort(sortBy);
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch items", error: err.message });
    }
  });

  // GET /api/<resource>/:id — fetch a single item
  router.get("/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch item", error: err.message });
    }
  });

  // POST /api/<resource> — create
  router.post("/", async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Failed to create item", error: err.message });
    }
  });

  // PUT /api/<resource>/:id — update
  router.put("/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: "Failed to update item", error: err.message });
    }
  });

  // DELETE /api/<resource>/:id — delete
  router.delete("/:id", async (req, res) => {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted", id: req.params.id });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete item", error: err.message });
    }
  });

  return router;
}

module.exports = createCrudRouter;