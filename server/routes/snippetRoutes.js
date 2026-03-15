const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} = require("../controllers/snippetController");

router.post(
  "/",
  [
    body("title").isLength({ min: 1, max: 100 }),
    body("language").isLength({ min: 1, max: 30 }),
    body("code").isLength({ min: 1, max: 5000 })
  ],
  createSnippet
);

router.get("/", getSnippets);

router.get("/:id", getSnippetById);

router.put("/:id", updateSnippet);

router.delete("/:id", deleteSnippet);

module.exports = router;