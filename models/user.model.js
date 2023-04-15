import { model, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const LINK_REGEX =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    researchInterests: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    publications: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            link: {
                type: String,
                match: LINK_REGEX,
            },
        },
    ],
});

userSchema.plugin(passportLocalMongoose);
const User = model("User", userSchema);
export default User;
