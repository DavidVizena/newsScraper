var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    heading: {
      type: String,
      required: true,
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

ArticleSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 });
mongoose.model("articles", ArticleSchema);
