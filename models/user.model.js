import { model, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
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
});

userSchema.plugin(passportLocalMongoose);
const User = model("User", userSchema);
export default User;
