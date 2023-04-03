import course from "../models/course.model.js";
import { response_200, response_500 } from "../utils/response_codes.js";
export const getAllCourses = async (req, res) => {
    try {
        const courseData = await course.find();
        return response_200(res, "Courses fetched successfully", courseData);
    } catch (err) {
        return response_500(res, "Error fetching courses", err);
    }
};
