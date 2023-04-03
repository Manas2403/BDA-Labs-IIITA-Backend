import tag from "../models/tag.model.js";
import post from "../models/post.model.js";
import news from "../models/news.model.js";
import workshop from "../models/workshop.model.js";
import team from "../models/team.model.js";
import course from "../models/course.model.js";
import passport from "../passport.config.js";
import { Router } from "express";
const router = Router();
export const addNewTag = async (req, res) => {
    // if (!req.user) return res.redirect("/admin");
    if (req.body.name !== undefined && req.body.name !== "") {
        let exists = await tag.findOne({ name: req.body.name });
        if (exists) {
            res.redirect("/admin");
        } else {
            let newTag = new tag({ name: req.body.name });
            await newTag.save();
            console.log("New Tag Added");
            return res.redirect("/admin");
        }
    }
    return res.redirect("/admin");
};
export const addnewNews = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let title = req.body.title;
    let link = req.body.link;
    if (title !== undefined && title !== "") {
        let newNews = new news({ title: title, link: link });
        await newNews.save();
        console.log("New News Added");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const addnewWorkshop = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let title = req.body.title;
    let desc = req.body.desc;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let registerationLink = req.body.registerationLink;
    let paymentLink = req.body.paymentLink;
    let externalLinks = req.body.externalLinks;
    if (
        title !== undefined &&
        title !== "" &&
        startDate !== undefined &&
        endDate !== undefined
    ) {
        let newWorkshop = new workshop({
            title: title,
            desc: desc,
            startDate: startDate,
            endDate: endDate,
            registerationLink: registerationLink,
            paymentLink: paymentLink,
        });
        if (typeof externalLinks === typeof "text") {
            newWorkshop.externalLinks.push(externalLinks);
        } else {
            for (let i = 0; i < externalLinks.length || 0; i++) {
                newWorkshop.externalLinks.push(externalLinks[i]);
            }
        }
        await newWorkshop.save();
        console.log("New Workshop Added");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const addNewPost = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let title = req.body.title,
        desc = req.body.desc,
        links = req.body.links,
        pnames = req.body.peoplename,
        plinks = req.body.peoplelink,
        Tag = req.body.tag;
    if (
        title !== undefined &&
        title !== "" &&
        Tag !== undefined &&
        Tag !== ""
    ) {
        let tagobj = await tag.findOne({ name: Tag });
        let newPost = new post({
            title: title,
            desc: desc,
            tag: tagobj._id,
        });
        if (typeof links === typeof "text") {
            newPost.links.push(links);
        } else {
            for (let i = 0; i < links.length || 0; i++) {
                newPost.links.push(links[i]);
            }
        }
        if (typeof pnames === typeof "text") {
            newPost.people.push({
                name: pnames,
                link: plinks,
            });
        } else {
            for (let i = 0; i < pnames.length || 0; i++) {
                newPost.people.push({
                    name: pnames[i],
                    link: plinks[i],
                });
            }
        }
        await newPost.save();
        console.log("New Post Added");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const addNewTeamMember = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let name = req.body.name,
        position = req.body.position,
        description = req.body.description,
        email = req.body.email,
        interests = req.body.interests;
    if (
        name !== undefined &&
        name !== "" &&
        description !== undefined &&
        description !== ""
    ) {
        let newTeamMember = new team({
            name: name,
            position: position,
            description: description,
            email: email,
        });
        if (typeof interests === typeof "text") {
            newPost.interests.push(interests);
        } else {
            for (let i = 0; i < interests.length || 0; i++) {
                newPost.interests.push(interests[i]);
            }
        }
        await newTeamMember.save();
        console.log("New Team Member Added");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const addNewCourse = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let name = req.body.name,
        instructor = req.body.instructor,
        phd = req.body.phd,
        mtech = req.body.mtech,
        students = req.body.students,
        publications = req.body.publications;
    if (
        name !== undefined &&
        name !== "" &&
        instructor !== undefined &&
        instructor !== ""
    ) {
        let newCourse = new course({
            name: name,
            instructor: instructor,
            students: students,
        });
        if (typeof phd === typeof "text") {
            newPost.phd.push(phd);
        } else {
            for (let i = 0; i < phd.length || 0; i++) {
                newPost.phd.push(pdh[i]);
            }
        }
        if (typeof mtech === typeof "text") {
            newPost.mtech.push(mtech);
        } else {
            for (let i = 0; i < mtech.length || 0; i++) {
                newPost.mtech.push(mtech[i]);
            }
        }
        await newCourse.save();
        console.log("New Course Added");
        return res.redirect("/admin");
    }
};
export const home = async (req, res) => {
    res.render("admin", { user: req.user });
};
export const getTagePage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    res.render("tag", { user: req.user });
};
export const getPostPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const tags = await tag.find({});
    res.render("post", { user: req.user, tags: tags });
};
export const getNewsPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    res.render("news", { user: req.user });
};
export const getWorkshopPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    res.render("workshop", { user: req.user });
};
export const getTeamPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    res.render("team", { user: req.user });
};
export const getCoursePage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    res.render("course", { user: req.user });
};
router.get("/", home);
router.post("/", passport.authenticate("local"), home);
router.post("/newtag", addNewTag);
router.get("/newtag", getTagePage);
router.post("/newnews", addnewNews);
router.get("/newnews", getNewsPage);
router.post("/newworkshop", addnewWorkshop);
router.get("/newworkshop", getWorkshopPage);
router.post("/newpost", addNewPost);
router.get("/newpost", getPostPage);
router.post("/newteam", addNewTeamMember);
router.get("/newteam", getTeamPage);
router.post("/newcourse", addNewCourse);
router.get("/newCourse", getCoursePage);
export default router;
