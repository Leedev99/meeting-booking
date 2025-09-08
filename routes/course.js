var express = require("express");
var router = express.Router();
const courseController = require("../controllers/courseController");

/* GET users listing. */
router.get("/", courseController.index);
router.get("/:id", courseController.userbyid);
router.post("/", courseController.insert);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.destroy);

module.exports = router;
