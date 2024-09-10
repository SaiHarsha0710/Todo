const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const mongoose = require("mongoose");

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const list = new List({ title, body, user: existingUser });
        await list.save();
        existingUser.list.push(list);
        await existingUser.save();
        res.status(200).json({ list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        const updatedTask = await List.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
        if (updatedTask) {
            res.status(200).json({ message: "Task Updated", list: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.delete("/deleteTask/:taskId", async (req, res) => {
    try {
        const { id: userId } = req.body;
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const user = await User.findByIdAndUpdate(userId, {
            $pull: { list: taskId }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedTask = await List.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/getTasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const tasks = await List.find({ user: id }).sort({ createdAt: -1 });
        
        res.status(200).json({ list: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
