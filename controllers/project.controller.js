import project from "../models/course.model.js";
import { response_200, response_500 } from "../utils/response_codes.js";
export const getAllProjects = async (req, res) => {
    try {
        const projectData = await project.find();
        return response_200(res, "Courses fetched successfully", projectData);
    } catch (err) {
        return response_500(res, "Error fetching courses", err);
    }
};
