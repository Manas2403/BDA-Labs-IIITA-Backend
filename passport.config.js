import { Strategy } from "passport-local";
import User from "./models/user.model.js";
import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
const authenticateAdmin = async (email, password, done) => {
    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return done(null, "ADMIN");
    } else {
        return done(null, false, { message: "Password incorrect" });
    }
};

passport.use(
    "admin",
    new Strategy({ usernameField: "username" }, authenticateAdmin)
);
passport.use("user", User.createStrategy());
passport.serializeUser((user, done) => {
    if (user === "ADMIN") {
        return done(null, user);
    } else return User.serializeUser()(user, done);
});
passport.deserializeUser((user, done) => {
    if (user === "ADMIN") {
        return done(null, user);
    } else return User.deserializeUser()(user, done);
});
export default passport;
