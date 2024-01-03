const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: String,
    date: {type: Date, default: Date.now()},
    comments: [{author:String, content: String}]
});
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;