var express = require("express");
var router = express.Router();
const cateController = require("../controllers/cateController");
const authMiddleware = require("../middlewares/authMiddleware");
/* GET users listing. */
router.get("/", cateController.index);
router.get("/:id", cateController.userbyid);
router.post("/", cateController.insert);
router.put("/:id", cateController.update);
router.delete("/:id", cateController.destroy);

module.exports = router;
