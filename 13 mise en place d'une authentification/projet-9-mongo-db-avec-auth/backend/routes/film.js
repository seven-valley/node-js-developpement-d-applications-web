const express = require("express");
const router = express.Router();
const filmCtrl = require("../controllers/film");

router.post("/", filmCtrl.createFilm);
router.get("/", filmCtrl.getFilm);
router.delete("/:id", filmCtrl.deleteFilm);
router.put("/:id", filmCtrl.modifyFilm);

module.exports = router;
