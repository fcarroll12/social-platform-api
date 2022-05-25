const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createnewThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtsController.js");

// /api/courses
router.route("/").get(getAllThoughts).post(createnewThought);

// /api/courses/:courseId
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
module.exports = router;
