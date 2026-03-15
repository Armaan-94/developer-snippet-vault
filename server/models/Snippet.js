const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    maxlength: 100
  },

  language: {
    type: String,
    required: true,
    maxlength: 30
  },

  description: {
    type: String,
    maxlength: 300
  },

  code: {
    type: String,
    required: true,
    maxlength: 5000
  },

  tags: {
    type: [String],
    validate: {
      validator: function(arr) {
        return arr.length <= 10;
      },
      message: "Too many tags"
    }
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Snippet", snippetSchema);