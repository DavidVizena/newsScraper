var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedSchema = new Schema(
  {
    comment: [{ message: String }],
    heading: {
      type: String,
      require: true,
      unique: true
    },
    url: {
      type: String,
      required: true,
      unique: true
    },
    summary: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

mongoose.model("saved", SavedSchema);
