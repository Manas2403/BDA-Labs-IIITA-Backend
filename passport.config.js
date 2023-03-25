import { Strategy } from "passport-local";
import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
const authenticateUser = async (email, password, done) => {
    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return done(null, true);
    } else {
        return done(null, false, { message: "Password incorrect" });
    }
};

passport.use(new Strategy({ usernameField: "username" }, authenticateUser));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
    return done(null, user);
});
export default passport;
