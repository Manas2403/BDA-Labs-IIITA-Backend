import { model, Schema } from "mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    phd: [{ type: String }],
    mtech: [{ type: String }],
    students: {
        type: Number,
    },
    publications: [
        {
            name: { type: String },
            link: { type: String, match: LINK_REGEX },
        },
    ],
});
const course = model("Course", courseSchema);
export default course;
