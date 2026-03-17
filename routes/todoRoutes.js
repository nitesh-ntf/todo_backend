// Yahan saare Todo API routes hain - GET, POST, PUT, DELETE
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET /todos → saare todos laao
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // latest pehle
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Todos nahi mile bhai 😢", error: err.message });
  }
});

// POST /todos → naya todo add karo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title toh daal bhai! 😤" });
    }
    const todo = await Todo.create({ title: title.trim() });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Todo add nahi hua 😢", error: err.message });
  }
});

// PUT /todos/:id → todo complete/incomplete toggle karo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo mila hi nahi bhai 🤷" });

    // Jo bhi update aaya hai woh apply karo (title ya completed)
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update nahi hua 😢", error: err.message });
  }
});

// DELETE /todos/:id → todo delete karo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo mila hi nahi bhai 🤷" });
    res.json({ message: "Todo delete ho gaya! 🗑️" });
  } catch (err) {
    res.status(500).json({ message: "Delete nahi hua 😢", error: err.message });
  }
});

module.exports = router;
