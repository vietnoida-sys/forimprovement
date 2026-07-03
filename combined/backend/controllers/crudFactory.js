// Generic CRUD factory for straightforward models (University, Course, Scholarship, etc.)
// Keeps repetitive create/read/update/delete logic in one place.

const crudFactory = (Model, populateFields = []) => ({
  create: async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      let query = Model.find();
      populateFields.forEach((f) => (query = query.populate(f)));
      const docs = await query.sort({ createdAt: -1 });
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      let query = Model.findById(req.params.id);
      populateFields.forEach((f) => (query = query.populate(f)));
      const doc = await query;
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
});

module.exports = crudFactory;
