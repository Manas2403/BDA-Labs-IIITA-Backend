import tag from "../models/tag.model";
import post from "../models/post.model";
import news from "../models/news.model";
import workshop from "../models/workshop.model";
export const addNewTag = async (req, res) => {
    if (!req.user) return;
    if (req.body.name !== undefined && req.body.name !== "") {
        let exists = await tag.findOne({ name: req.body.name });
        if (exists) {
            res.send({ error: "Tag already exists" });
        } else {
            let newTag = new tag({ name: req.body.name });
            newTag.save((err, tag) => {
                if (err) {
                    res.send(err);
                }
                res.json(tag);
            });
        }
    }
};
export const addnewNews = async (req, res) => {
    if (!req.user) return;
    let title = req.body.title;
    let link = req.body.link;
    if (title !== undefined && title !== "") {
        let newNews = new news({ title: title, link: link });
        newNews.save((err, news) => {
            if (err) {
                res.send(err);
            }
            res.json(news);
        });
    }
};
export const addnewWorkshop = async (res, req) => {
    if (!req.user) return;
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
            description: desc,
            startDate: startDate,
            endDate: endDate,
            registerationLink: registerationLink,
            paymentLink: paymentLink,
        });
        if (typeof externalLinks === typeof "text") {
            post.externalLinks.push(externalLinks);
        } else {
            for (let i = 0; i < externalLinks.length || 0; i++) {
                post.externalLinks.push(externalLinks[i]);
            }
        }
        newWorkshop.save((err, workshop) => {
            if (err) {
                res.send(err);
            }
            res.json(news);
        });
    }
};
