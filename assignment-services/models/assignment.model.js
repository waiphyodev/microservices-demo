const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema(
    {
        assigneeId: {
            type: Schema.Types.ObjectId,
            required: [true, "Assignee is required."],
            ref: "Assignee"
        }
    },
    {
        description: {
            type: String,
            required: [true, "Description is required."],
        },
    },
    {
        collection: "assignments",
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Assignment", assignmentSchema);
