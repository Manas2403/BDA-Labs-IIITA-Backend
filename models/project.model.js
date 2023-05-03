import { model, Schema } from "mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const projectSchema = new Schema({
    title: { type: String, required: true },
    supervisor: { type: String, required: true },
    link: { type: String, match: LINK_REGEX },
    description: { type: String },
    fundingAgency: { type: String },
    amount: { type: Number },
});
const project = model("Project", projectSchema);
export default project;
