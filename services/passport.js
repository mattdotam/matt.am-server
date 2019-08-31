const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("user");

// Take googleId and return mongo Id
passport.serializeUser((user, done) => {
	// Mongo identifier as it's unique to our service,
	// and can take in many different auth services
	done(null, user.id);
});

// Take mongo Id and return user model instance
// USEr model instance added to req object as 'req.user'
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				googleId: profile.id,
			});
			if (existingUser) {
				return done(null, existingUser);
			}
			// const user = await new User({ googleId: profile.id }).save();
			// done(null, user);
		}
	)
);
