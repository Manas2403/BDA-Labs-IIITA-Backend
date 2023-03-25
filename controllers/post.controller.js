import post from "../models/post.model.js";
import tag from "../models/tag.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
export const getAllPosts = async (req, res) => {
    try {
        const postData = await post.find();
        return response_200(res, "Posts fetched successfully", postData);
    } catch (err) {
        return response_500(res, "Error fetching posts", err);
    }
};
export const getPostByTag = async (req, res) => {
    try {
        console.log(req.params.tag);
        if (req.params.tag === undefined || req.params.tag === "")
            return response_400(res, "Tag not provided");
        let Tag = await tag.findOne({ name: req.params.tag });
        console.log(Tag);
        if (!Tag) return response_400(res, "Tag not found");
        let data = await post.find({ tag: Tag._id });
        console.log(data);
        return response_200(res, "Posts fetched successfully", data);
    } catch (err) {
        return response_500(res, "Error fetching posts", err);
    }
};
