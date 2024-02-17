const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 100},
    commercial: {type: Boolean, required: true}
})

categorySchema.virtual("url").get(function (){
    return `/category/${this.id}`;
});

module.exports = mongoose.model("Category", categorySchema);