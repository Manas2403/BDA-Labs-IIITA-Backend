import workshop from "../models/workshop.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
export const getAllWorkshops = async (req, res) => {
    try {
        const workshopData = await workshop.find();
        return response_200(
            res,
            "Workshops fetched successfully",
            workshopData
        );
    } catch (err) {
        return response_500(res, "Error fetching workshops", err);
    }
};
