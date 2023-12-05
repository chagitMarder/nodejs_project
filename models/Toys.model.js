const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    descreption: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        // type: String,
        // required: true
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy = Toy;


