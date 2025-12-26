const { Schema, model } = require("mongoose");

const assigneeSchema = new Schema(
    {
        userId: {
            type: Number,
            required: [true, "User ID is required."]
        },
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        email: {
            type: String,
            required: [true, "Email is required."]
        },
    },
    {
        collection: "assignees",
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Assignee", assigneeSchema);
