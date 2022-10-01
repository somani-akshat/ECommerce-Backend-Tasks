var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dataSchema = new Schema(
    {
        ngoID: {
            type: Schema.Types.ObjectId,
            ref: "ngos",
        },
        programID: {
            type: Schema.Types.ObjectId,
            ref: "programs",
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        month: {
            type: Schema.Types.String,
        },
        year: {
            type: Schema.Types.String,
        },
        food: {
            type: Schema.Types.Number,
        },
        children: {
            type: Schema.Types.Number,
        },
        senior: {
            type: Schema.Types.Number,
        },
        female: {
            type: Schema.Types.Number,
        },
        male: {
            type: Schema.Types.Number,
        },
        diffabled: {
            type: Schema.Types.Number,
        },
        total: {
            type: Schema.Types.Number,
        },
        charitypartners: {
            type: Schema.Types.String,
        },
    },
    {
        timestamps: true,
    }
);

var Data = mongoose.model("datas", dataSchema);
module.exports = Data;