import tag from "../models/tag.model.js";
import post from "../models/post.model.js";
import news from "../models/news.model.js";
import workshop from "../models/workshop.model.js";
import team from "../models/team.model.js";
import course from "../models/course.model.js";
import passport from "../passport.config.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
import * as dotenv from "dotenv";
dotenv.config();
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");
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
    console.log(req);
    if (!req.user) return res.redirect("/admin");
    let title = req.body.title;
    let desc = req.body.desc;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let registerationLink = req.body.registerationLink;
    let externalLink = req.body.externalLink;
    const imgName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imgName,
        Body: req.file.buffer,
        ContentType: req.file.mimeType,
    };
    const data = await s3.send(new PutObjectCommand(params));
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
            workshopImg: imgName,
            externalLink: externalLink,
        });
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
    const imgName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imgName,
        Body: req.file.buffer,
        ContentType: req.file.mimeType,
    };
    const data = await s3.send(new PutObjectCommand(params));
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
            interests: interests,
            profileImg: imgName,
        });
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
        projectname = req.body.projectname,
        projectlink = req.body.projectlink;
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
            newCourse.phd.push(phd);
        } else {
            for (let i = 0; i < phd.length || 0; i++) {
                newCourse.phd.push(phd[i]);
            }
        }
        if (typeof mtech === typeof "text") {
            newCourse.mtech.push(mtech);
        } else {
            for (let i = 0; i < mtech.length || 0; i++) {
                newCourse.mtech.push(mtech[i]);
            }
        }
        if (typeof publications === typeof "text") {
            newCourse.publications.push({
                name: projectname,
                link: projectlink,
            });
        } else {
            for (let i = 0; i < projectname.length || 0; i++) {
                newCourse.publications.push({
                    name: projectname[i],
                    link: projectlink[i],
                });
            }
        }
        await newCourse.save();
        console.log("New Course Added");
        return res.redirect("/admin");
    }
};
export const deletePost = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        await post.findByIdAndDelete(id);
        console.log("Post Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const deleteNews = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        await news.findByIdAndDelete(id);
        console.log("News Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const deleteWorkshop = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        const w = await workshop.findById(id);
        if (!w) {
            return res.redirect("/admin");
        }
        const params = {
            Bucket: bucketName,
            Key: w.workshopImg,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        await workshop.findByIdAndDelete(id);
        console.log("Workshop Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const deleteTeamMember = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        const t = await team.findById(id);
        if (!t) {
            return res.redirect("/admin");
        }
        const params = {
            Bucket: bucketName,
            Key: t.profileImg,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        await team.findByIdAndDelete(id);
        console.log("Team Member Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const deleteCourse = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        await course.findByIdAndDelete(id);
        console.log("Course Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};
export const deleteTag = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    let { id } = req.params;
    if (id !== undefined && id !== "") {
        await tag.findByIdAndDelete(id);
        console.log("Tag Deleted");
        return res.redirect("/admin");
    }
    return res.redirect("/admin");
};

export const home = async (req, res) => {
    res.render("admin", { user: req.user });
};
export const getTagePage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const tags = await tag.find({});
    res.render("tag", { user: req.user, tags: tags });
};
export const getPostPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const tags = await tag.find({});
    const posts = await post.find({});
    res.render("post", { user: req.user, tags: tags, posts: posts });
};
export const getNewsPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const allNews = await news.find({});
    res.render("news", { user: req.user, news: allNews });
};
export const getWorkshopPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const workshops = await workshop.find({});
    res.render("workshop", { user: req.user, workshops: workshops });
};
export const getTeamPage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const teams = await team.find({});
    res.render("team", { user: req.user, teams: teams });
};
export const getCoursePage = async (req, res) => {
    if (!req.user) return res.redirect("/admin");
    const courses = await course.find({});
    res.render("course", { user: req.user, courses: courses });
};
router.get("/", home);
router.post("/", passport.authenticate("admin"), home);
router.post("/newtag", addNewTag);
router.get("/newtag", getTagePage);
router.post("/newnews", addnewNews);
router.get("/newnews", getNewsPage);
router.post("/newworkshop", upload.single("workshopImg"), addnewWorkshop);
router.get("/newworkshop", getWorkshopPage);
router.post("/newpost", addNewPost);
router.get("/newpost", getPostPage);
router.post("/newteam", upload.single("profileImg"), addNewTeamMember);
router.get("/newteam", getTeamPage);
router.post("/newcourse", addNewCourse);
router.get("/newcourse", getCoursePage);
router.post("/deletepost/:id", deletePost);
router.post("/deletenews/:id", deleteNews);
router.post("/deleteworkshop/:id", deleteWorkshop);
router.post("/deleteteammember/:id", deleteTeamMember);
router.post("/deletecourse/:id", deleteCourse);
router.post("/deletetag/:id", deleteTag);
export default router;
