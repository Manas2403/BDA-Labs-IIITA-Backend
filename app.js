import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import db from "./db.config.js";
import morgan from "morgan";
import newsRouter from "./routes/news.routes.js";
import workshopRouter from "./routes/workshop.routes.js";
import postsRouter from "./routes/post.routes.js";
import courseRouter from "./routes/course.routes.js";
import teamRouter from "./routes/team.routes.js";
import adminRouter from "./admin/adminRoutes.js";
import passport from "./passport.config.js";
import session from "express-session";
dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
db();
function checkAuthenticated(req, res, next) {
    if (req.baseUrl === "/admin") return next();
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/admin");
}
app.use("/news", newsRouter);
app.use("/workshops", workshopRouter);
app.use("/posts", postsRouter);
app.use("/courses", courseRouter);
app.use("/team", teamRouter);
app.use("/admin", checkAuthenticated, adminRouter);

app.listen(
    process.env.PORT ? process.env.PORT : 8080,
    process.env.HOST ? process.env.HOST : "127.0.0.1",
    console.log(
        `listening on http://localhost:${
            process.env.PORT ? process.env.PORT : 8080
        }/`
    )
);
