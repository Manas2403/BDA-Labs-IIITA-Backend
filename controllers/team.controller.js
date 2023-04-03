import team from "../models/team.model.js";
import { response_200, response_500 } from "../utils/response_codes.js";
export const getTeam = async (req, res) => {
    try {
        const teamData = await team.find();
        return response_200(res, "Team fetched successfully", teamData);
    } catch (err) {
        return response_500(res, "Error fetching team", err);
    }
};
