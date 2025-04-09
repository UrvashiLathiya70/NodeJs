const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouter');
router.use(userRoutes);


module.exports = router;
