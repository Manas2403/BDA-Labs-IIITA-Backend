import mongoose from "mongoose";

export default function connDB() {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(
            "mongodb+srv://manas:manas123@bda-labs.y05bgsv.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("connected to db");
        });
}
