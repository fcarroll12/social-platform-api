const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createnewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createnewUser);

// /api/users/:userId
router.route("/:id").put(updateUser).get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friends/:friendsId
router.route("/:userId/friends/:friendId").delete(removeFriend).post(addFriend);

module.exports = router;
