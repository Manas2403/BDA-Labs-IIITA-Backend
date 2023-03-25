import news from "../models/news.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
export const getAllNews = async (req, res) => {
    try {
        const newsData = await news.find();
        return response_200(res, "News fetched successfully", newsData);
    } catch (err) {
        return response_500(res, "Error fetching news", err);
    }
};
