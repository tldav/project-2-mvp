// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
      return;
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
      return;
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/logout", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));

    db.Thread.findAll({
      include: db.User,
      order: [["createdAt", "DESC"]]
    }).then(dbThreads => {
      console.log(JSON.stringify(dbThreads[0].dataValues.body));
      let hbsObject = {
        threads: dbThreads,
        comment: JSON.stringify(dbThreads[0].dataValues.body)
      };

      res.render("members", hbsObject);
    });
  });
  app.get("/newthread", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/new-thread.html"));
  });
};
