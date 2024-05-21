import team from "../models/team.model.js";
import { response_200, response_500 } from "../utils/response_codes.js";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

export const getTeam = async (req, res) => {
    try {
        const teamData = await team.find();

        // Map through teamData to add image URLs
        const teamWithImageUrls = teamData.map((member) => {
            return {
                ...member.toObject(),
                profileImgUrl: member.profileImg
                    ? `${BASE_URL}/uploads/${member.profileImg}`
                    : null,
            };
        });

        return response_200(
            res,
            "Team fetched successfully",
            teamWithImageUrls
        );
    } catch (err) {
        return response_500(res, "Error fetching team", err);
    }
};
