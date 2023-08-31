const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router.route("/")
    .delete(controller.delete)
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router;