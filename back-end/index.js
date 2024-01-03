const express = require('express');
const app = express.Router();
const Article = require('./articleModel');

app.get('/', (req, res) => {
    res.send("Hello world");
});

///////// ROUTES /////////
app.post('/article', (req, res) => {
    const {title, content, author, date, comment} = req.body;
    Article.create({title, content, author, date, comment})
        .then(newArticle => {
            res.status(201).send(newArticle)
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

app.get('/article/search', (req, res) => {
    const {_id, title} = req.query;
    if(_id){
        Article.findById({_id: _id})
            .then(article => {
                if(article) {
                    res.status(200).json(article);
                } else {
                    res.status(404).json('Article not found');
                }
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else if(title){
        Article.findOne({title: title})
            .then(article => {
                if(article){
                    res.status(200).json(article);
                } else {
                    res.status(404).send('Article not found');
                }
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
    else {
        res.status(400).send("Missing research criteria");
    }
});

app.patch('/article/resource/:id', (req, res) => {
    const updateData = req.body;
    Article.findByIdAndUpdate({_id: req.params.id}, updateData, {new: true})
        .then(updatedArticle => {
            res.status(200).json(updatedArticle);
        })
        .catch(err => {
            res.status(404).send(err);
        });
})

app.delete('/article/delete/:id', (req, res) => {
    Article.findByIdAndDelete({_id: req.params.id})
        .then(deletedArticle => {
            res.status(200).send('Article deleted with success');
        })
        .catch(err => {
            res.status(404).send('Article not found', err);
        })
})

/*
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: String,
    date: {type: Date, default: Date.now()},
    comments: [{author:String, content: String}]
 */

const article1 = new Article({
    title: "Article2",
    content: "Here is my second article",
    author: "Maxime LOMBARDO"
});

function createArticleInBase(article){
    article.save()
        .then(doc => {
            console.log("Article saved with success", doc);
        })
        .catch(err => {
            console.error("Error while trying to save the article", err);
        })
}


module.exports=app