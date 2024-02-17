const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: {type: String, required: true, maxLength: 100 },
    model: {type: String, required: true, maxLength: 100 },
    year: {type: Number, required: true },
    category: {type: Schema.Types.ObjectId, ref: 'category'}
})

carSchema.virtual("url").get(function (){
    return `/car/${this.id}`;
});


module.exports = mongoose.model("Car", carSchema);