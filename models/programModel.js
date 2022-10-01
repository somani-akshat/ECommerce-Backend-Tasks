var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var programSchema = new Schema(
	{
		name: {
			type: String,
			enum: ["ngofeeding", "foodrescue", "breakfastfeeding", "foodrelief"],
			default: "ngofeeding",
		},
	},
	{
		timestamps: true,
	}
);

var Program = mongoose.model("programs", programSchema);
module.exports = Program;