import { model, Schema } from "mongoose";
const tagSchema = new Schema({
    name: { type: String, required: true },
});
const tag = model("Tag", tagSchema);
export default tag;
