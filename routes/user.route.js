import express from "express";
import passport from "passport";
import User from "../models/User.js";
import axios from "axios";
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/index.ejs"); // load the index.ejs file
});

router.get("/posts", function (req, res) {
  res.render("pages/posts.ejs"); // load the index.ejs file
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("pages/home.ejs", {
    user: req.user, // get the user out of session and pass to template
  });
});

router.get("/error", isLoggedIn, function (req, res) {
  res.render("pages/err.ejs");
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/getUserData", isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const access_token =
    "EAARncYu5YVUBAG1YDJ0eiWDE5fG1NYbCfKZBQQva3KPLJrVi1DOY8bjQUo0PRsYNcMAZCfD2RdoFiQvb8DuEyrp9MEcwP7kQekH9UUSvZAEYEwIlQ1GudgT0xz8lmIGntt1UZBKcqkMYvPvZA5tPjce1Th4nM5jrTGax6TQPNhWl24oZC2YZBBZAChKGNzA1zWM1UHAgK9asI5MvJZAMQHdi7";
  // GET ALL POSTS
  var posts = [];
  await axios
    .get(
      `https://graph.facebook.com/v16.0/1350608765505024/photos/uploaded?access_token=${access_token}`
    )
    .then((res) => {
      posts = res.data.data;
    });

  // GET TOTAL FRIENDS
  var totalFriendsCount;
  await axios
    .get(
      `https://graph.facebook.com/v16.0/1350608765505024/friends?access_token=${access_token}`
    )
    .then((res) => {
      console.log(res.data.summary.total_count);
      totalFriendsCount = res.data.summary.total_count;
    });

  // GET Profile IMAGE
  var profileImgUrl = `https://graph.facebook.com/v16.0/1350608765505024/picture?access_token=${access_token}`;

  //GET UPLOADED PHOTOS
  const urls = [];
  posts.forEach(async (post) => {
    var imgUrl = `https://graph.facebook.com/v16.0/${post.id}/picture?access_token=${access_token}`;
    urls.push(imgUrl);
  });
  res.render("pages/posts.ejs", { urls, totalFriendsCount, profileImgUrl });
});

function isLoggedIn(req, res, next) {
  console.log("inside login");
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

export default router;
