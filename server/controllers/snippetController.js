const Snippet = require("../models/Snippet");
const { validationResult } = require("express-validator");

const createSnippet = async (req, res) => {

  if (process.env.DEMO_MODE === "true") {
    return res.status(403).json({ message: "Demo mode - editing disabled" });
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const count = await Snippet.countDocuments();

    if (count > 1000) {
      return res.status(400).json({ message: "Database limit reached" });
    }

    const snippet = new Snippet(req.body);

    const savedSnippet = await snippet.save();

    res.status(201).json(savedSnippet);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const getSnippets = async (req, res) => {

  try {

    const snippets = await Snippet.find().sort({ createdAt: -1 });

    res.json(snippets);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const getSnippetById = async (req, res) => {

  try {

    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json(snippet);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const updateSnippet = async (req, res) => {

  if (process.env.DEMO_MODE === "true") {
    return res.status(403).json({ message: "Demo mode - editing disabled" });
  }

  try {

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSnippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json(updatedSnippet);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

const deleteSnippet = async (req, res) => {

  if (process.env.DEMO_MODE === "true") {
    return res.status(403).json({ message: "Demo mode - editing disabled" });
  }

  try {

    const snippet = await Snippet.findByIdAndDelete(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.json({ message: "Snippet deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

module.exports = {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
};