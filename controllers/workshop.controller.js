import workshop from "../models/workshop.model.js";
import {
    response_200,
    response_400,
    response_500,
} from "../utils/response_codes.js";
import * as dotenv from "dotenv";
dotenv.config();
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
export const getAllWorkshops = async (req, res) => {
    try {
        const workshopData = await workshop.find();
        workshopData.map(async (workshop) => {
            const getObjectParams = {
                Bucket: bucketName,
                Key: workshop.workshopImg,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            workshop.workshopUrl = url;
            await workshop.save();
        });
        return response_200(
            res,
            "Workshops fetched successfully",
            workshopData
        );
    } catch (err) {
        return response_500(res, "Error fetching workshops", err);
    }
};
