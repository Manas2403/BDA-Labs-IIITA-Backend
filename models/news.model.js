import { model, Schema } from "mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const newsSchema = new Schema(
    {
        title: { type: String, required: true },
        link: { type: String, match: LINK_REGEX },
    },
    { timestamps: true }
);
const news = model("News", newsSchema);
export default news;
