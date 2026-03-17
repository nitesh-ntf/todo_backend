// Todo ka schema - MongoDB mein kaise store hoga data
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Bhai title toh daal! 😅"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false, // default pe kaam pending hai
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
