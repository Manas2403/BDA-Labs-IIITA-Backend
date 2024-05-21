import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import workshop from "../models/workshop.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
import * as dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.join(__dirname, "..");

// Assuming you have a base URL for your server
const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

export const getAllWorkshops = async (req, res) => {
    try {
        const workshopData = await workshop.find();

        // Map through workshopData to add image URLs
        const workshopsWithImageUrls = workshopData.map((workshop) => {
            return {
                ...workshop.toObject(),
                workshopImgUrl: `${BASE_URL}/uploads/${workshop.workshopImg}`,
            };
        });

        return response_200(
            res,
            "Workshops fetched successfully",
            workshopsWithImageUrls
        );
    } catch (err) {
        return response_500(res, "Error fetching workshops", err);
    }
};
