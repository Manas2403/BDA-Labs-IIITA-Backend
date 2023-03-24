import post from "../models/post.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes";
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
        let data = await post.find({ "tag.name": req.params.tag });
        return data;
    } catch (err) {
        return response_500(res, "Error fetching posts", err);
    }
};
