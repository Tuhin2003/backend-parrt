import express from 'express';
import User from '../models/usermodels.js';


const router = express.Router();
router.use(express.json());

// Create user
router.post("/", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
      const userAdded = new User({
        name,email,password
      });
      await userAdded.save()
      res.status(201).json(userAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
    
  });
  

// Read all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

