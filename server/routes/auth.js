const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      // Add debug logging
      console.log('Profile from Google:', {
        id: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        photo: profile.photos?.[0]?.value
      });

      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName || 'No Last Name', // Provide default value
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);  // Add return statement
        } else {
          user = await User.create(newUser);
          return done(null, user);  // Add return statement
        }
      } catch (error) {
        console.log('Error in Google Strategy:', error);
        return done(error, null);  // Add proper error handling
      }
    }
  )
);

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data with error handling
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
    failureMessage: true  // Add failure messages to session
  })
);

// Improved error route
router.get('/login-failure', (req, res) => {
  const error = req.session.messages ? req.session.messages[0] : 'Unknown error';
  console.log('Login Failure:', error);
  res.send('Something went wrong with authentication. Please try again.');
});

// Improved logout route
router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error) {
      console.log('Logout error:', error);
      res.send('Error logging out');
    } else {
      res.redirect('/')
    }
  })
});

router.get('/get-session', (req, res) => {
  if (req.isAuthenticated()) {
      res.json({
          sessionCookie: req.headers.cookie,
          userId: req.user.id,
          userName: req.user.firstName
      });
  } else {
      res.json({ message: 'Not logged in' });
  }
});


// Persist user data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Retrieve user data from session with improved error handling
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (err) {
    console.log('Deserialize error:', err);
    done(err, null);
  }
});



module.exports = router;