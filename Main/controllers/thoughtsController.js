const mongoose = require("mongoose");
const { User, Thoughts } = require("../models");

// Aggregate function to get the number of students overall
const Thoughts = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single student
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.id })
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  createnewThought(req, res) {
    Thoughts.create(req.body)
      .then((_id) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: "Thought created, but found no post with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No such thought exists" })
          : Course.findOneAndUpdate(
              { _id: req.params.id },
              { $pull: { thoughts: req.params.id } },
              { new: true }
            )
      )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: "Thought deleted, but no user found",
            })
          : res.json({ message: "Student successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a reaction to a thought
  addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove reaction from a thought
  removeReaction(req, res) {
    Thoughts.findOneAndRemove(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = Thoughts;
