const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        await user.save().then(()=>
        res.status(200).json({ message: "sign up successful" }));
    } catch (error) {
        res.status(200).json({ message: "User already existed" });
    }
});


router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Please sign up first" });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is incorrect" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(200).json({ message: "User Already Exists" });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = bcrypt.hashSync(newPassword);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
});


module.exports = router;







/*
// Sign Up
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashpassword });
        await user.save();
        res.status(200).json({ message: "sign up successful" });
    } catch (error) {
        res.status(400).json({ message: "User already existed" });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Please sign up first" });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is incorrect" });
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(200).json({ message: "Error signing in" });
    }
});
*/
