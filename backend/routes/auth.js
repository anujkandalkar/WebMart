const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User Registered");
  } catch (err) { res.status(500).json(err); }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json("Invalid Credentials");
  }
  const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
  res.json({ token, user: { name: user.name, email: user.email } });
});

module.exports = router;