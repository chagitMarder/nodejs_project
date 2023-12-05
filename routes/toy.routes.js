const express = require("express");
const { Toy } = require("../models/Toys.model");
const { auth } = require("../middlewares/auth");
const { getToys, search, category, postToy, deleteToy, updateToy, getById } = require("../controllers/toys.controllers");
const router = express.Router();


router.get("/", getToys);

router.get("/search", search);

router.get("/category/:cat", category);

router.post("/", auth(), postToy);

router.patch("/:id", auth(), updateToy);

router.delete("/:id", auth(), deleteToy);

router.get("/single/:id", getById);



module.exports = router;