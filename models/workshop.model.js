import { model, Schema } from "mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const workshopSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        registerationLink: {
            type: String,
            match: LINK_REGEX,
        },
        externalLink: {
            type: String,
            match: LINK_REGEX,
        },
        workshopImg: {
            type: String,
        },
        workshopUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

const workshop = model("Workshop", workshopSchema);
export default workshop;
