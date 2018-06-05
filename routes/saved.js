var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

require("../models/Saved");

var Saved = mongoose.model("saved");

/* GET HOME PAGE. */
router.get("/", function(req, res) {
  Saved.find().then(saved => {
    res.render("saved", { saved: saved });
  });
});

router.post("/save", (req, res) => {
  var newSaved = {
    heading: req.body.heading,
    url: req.body.url,
    summary: req.body.summary
  };
  new Saved(newSaved).save(err => {
    if (err) {
      res.json({ msg: "This article has already been saved!!" });
    } else {
      res.json({ msg: "Article saved!" });
    }
  });
});

router.post("/save-comment", (req, res) => {
  Saved.findOneAndUpdate(
    {
      heading: req.body.heading2
    },
    {
      $push: { comment: { message: req.body.comment } }
    },
    err => {
      if (err) {
        console.log(err);
      }
      res.json("success!");
    }
  );
});

router.post("/display-comments", (req, res) => {
  Saved.findOne({
    heading: req.body.heading3
  }).then(data => {
    console.log("DATA", data);
    res.json(data.comment);
  });
});

router.post("/delete-comment", (req, res) => {
  Saved.update(
    {
      heading: req.body.heading4
    },
    {
      $pull: {
        comment: { message: req.body.comment2 }
      }
    }
  ).then(() => {
    res.json("success!");
  });
});

router.post("/delete-article", (req, res) => {
  Saved.deleteOne(
    {
      heading: req.body.heading
    },
    err => {
      if (err) {
        console.log(err);
      }
    }
  ).then(() => {
    res.json("success!");
  });
});

module.exports = router;
