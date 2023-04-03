import { model, Schema } from "mongoose";
const teamSchema = new Schema({
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
    interests: [
        {
            type: String,
        },
    ],
});
const team = model("Team", teamSchema);
export default team;
