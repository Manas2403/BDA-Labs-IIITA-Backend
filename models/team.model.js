import { model, Schema } from "mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            enums: [
                "Faculty",
                "Staff",
                "Ph.D",
                "M.Tech",
                "B.Tech",
                "Dual Degree",
                "Others",
            ],
            default: "Others",
        },
        description: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        link: {
            type: String,
            match: LINK_REGEX,
        },
        profileImg: {
            type: String,
        },
        profileUrl: {
            type: String,
        },
    },
    { timestamps: true }
);
const team = model("Team", teamSchema);
export default team;
