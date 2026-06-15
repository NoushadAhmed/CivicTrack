async (accessToken, refreshToken, profile, done) => {
  try {

    console.log("Google Profile:", profile);

    let user = await User.findOne({
      email: profile.emails[0].value,
    });

    console.log("Existing User:", user);

    if (!user) {
      console.log("Creating New User...");

      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        role: "citizen",
      });

      console.log("New User Created:", user);
    }

    console.log("OAuth Success");

    return done(null, user);

  } catch (error) {
    console.error("GOOGLE OAUTH ERROR");
    console.error(error);

    return done(error, null);
  }
}