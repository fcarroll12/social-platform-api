const { Schema, Types, model } = require("mongoose");

// const thoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       minlength: 1,
//       maxlength: 280,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) =>
//         moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     reactions: [reactionSchema],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//       getters: true,
//     },
//     id: false,
//   }
// );

const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      unique: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const thought = model("Thoughts", thoughtSchema);
module.exports = thought;
