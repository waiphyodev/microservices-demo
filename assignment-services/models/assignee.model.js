const { Schema, model } = require("mongoose");

const assigneeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
        },
    },
    {
        collection: "assignees",
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Assignee", assigneeSchema);
