const express = require('express');
const app = express.Router();
const Article = require('./articleModel');
const User = require('./userModel');

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

function createArticleInBase(article){
    article.save()
        .then(doc => {
            console.log("Article saved with success", doc);
        })
        .catch(err => {
            console.error("Error while trying to save the article", err);
        })
}

async function checkIfUserInBase(user){
    try {
        const userFound = await User.findOne({username: user.username});
        return !!userFound;
    } catch(err) {
        console.error(err);
        return false;
    }
}

async function createUserInBase(user){
    const userExists = await checkIfUserInBase(user);
    if(userExists){
        console.log("Username already used");
    }
    else{
        user.save()
            .then(doc => {
                console.log("User registered with success", doc);
            })
            .catch(err => {
                console.error("Error while trying to save the user in the DB", err);
            })
    }

}

let user1 = new User({
    username: "maxime",
    password: "azerty",
    email: "maxime@maxime.com"
})

createUserInBase(user1);

module.exports=app