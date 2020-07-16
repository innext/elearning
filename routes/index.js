const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Message = require("../models/message");
const Course = require("../models/course");

router.get("/", function(req, res) {
  res.render("layout/layout", {layout: false});
});

router.get("/contact", ensureAuthenticated, function(req, res) {
    res.render("contact", {layout: false});
});

router.post("/contact", ensureAuthenticated, function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const username = req.body.username;

// form validation
  check("name", "character allowed is a-z,A-Z")
  .not()
  .isEmpty()
  .matches(/[^a-zA-Z]/g);

  check("email", "min character 8")
    .not()
    .isEmpty()
    .isLength({
      min: 8
    });

  check("email", "Email not valid").isEmail().normalizeEmail().custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      // dns check email
      dns_validate_email.validEmail(value, (valid) => {
        console.log(`valid: ${vali}`);
        if (valid) {
          resolve(value);
        } else {
          reject(new Error("not a valid email"));
        }
      });
    });
  });

  check("subject", "character allowed is a-z,A-Z")
  .not()
  .isEmpty()
  .isLength({
      max: 50
  })
  .matches(/[^a-zA-Z]/g);

// check for errors during the validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.render("register").json({
        errors: errors.array(),
        // to return all input value back to the user if there was error during filling
        name: name,
        email: email,
        subject: subject,
        message: message
      });
    } else {
        const newMessage = new Message({
            name: name,
            email: email,
            subject: subject,
            message: message,
            username: username
        });
        Message.saveNewMessage(newMessage, function(err, message){
            console.log("Thanks for getting back to US");
            console.log(newMessage);
        });
    }

    req.flash()

});

router.get("/business", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/business", {layout: false});
    }
  });
});

router.get("/health-psychology", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/health-psychology", {layout: false});
    }
  });
});

router.get("/accounting", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/accounting", {layout: false});
    }
  });
});

router.get("/it-software", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/it-software", {layout: false});
    }
  });
});

router.get("/art-media", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/art-media", {layout: false});
    }
  });
});

router.get("/office-productivity", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/office-productivity", {layout: false});
    }
  });
});

router.get("/language-lifestyle", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/language-lifestyle", {layout: false});
    }
  });
});

router.get("/web-programming", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/web-programming", {layout: false});
    }
  });
});

router.get("/design", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/design", {layout: false});
    }
  });
});

router.get("/music", function(req, res) {
  Course.getCourses(function(err, foundcourses){
    if(err){
      console.log(err);
      res.send(err);
    } else {
  res.render("categories/music", {layout: false});
    }
  });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/users/login");
  };

module.exports = router;
