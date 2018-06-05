var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var request = require("request");
var rp = require("request-promise");
var cheerio = require("cheerio");
var app = express();

require("../models/Article");
var Article = mongoose.model("articles");

/* GET home page. */
router.get("/", (req, res) => {
  Article.find().then(function(articles) {
    var news = {
      news: articles
    };
    res.render("index", news);
  });
});

// GET SCREAPE PAGE
router.get("/scrape", (req, res) => {
  Article.count((err, count) => {
    app.locals.countBefore = count;
  });

  rp("https://www.nytimes.com", function(error, response, html) {
  if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      // SCRAPES PAGE AND PULLS HEADING URL AND BODY
      $(".summary").each(function(i, element) {
        var url = $(this)
          .parent(".story")
          .children(".story-heading")
          .children('a')
          .attr("href");
          var summary = $(this).text();
          var headline = $(this)
          .parent('.story')
          .children(".story-heading")
          .text();
          
        if (url && headline) {
          var newArticle = {
            heading: headline,
            url: url,
            summary: summary
          };
          new Article(newArticle).save(function(err) {
            if (err) {
            }
          });
        }
      });
    }
  }).then(() => {
    res.redirect("/count");
  });
});

router.get("/count", (req, res) => {
  Article.count((err, count) => {
    count;
  })
    .then(function(count) {
      app.locals.numArticles = count - app.locals.countBefore;
      res.json({ numArticles: app.locals.numArticles });
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
