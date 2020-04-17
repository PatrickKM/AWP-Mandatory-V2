const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Needed for serving production build of React

/**** Database ****/
const questionDB = require('./question_db')(mongoose);

/**** Routes ****/

// GET Questions (all)
app.get('/api/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
});

// GET Question (by id)
app.get('/api/questions/:id', async (req, res) => {
    let id = req.params.id;
    const question = await questionDB.getQuestion(id);
    res.json(question);
});

// POST Question
app.post('/api/questions', async (req, res) => {
    let question = {
        question: req.body.question,
        answers: []
    };
    const newQuestion = await questionDB.createQuestion(question);
    res.json(newQuestion);
});

// POST Answer (in id of question)
app.post('/api/questions/:id/answers', async (req, res) => {
    const id = req.params.id;
    const answerText = req.body.answerText;
    const updatedQuestion = await questionDB.addAnswer(id, answerText);
    res.json({msg: "Answer added", question: updatedQuestion});
});

// PUT Vote (in id of question in id of Answer)
app.put('/api/questions/:id/answers/:aid', (req, res) => {
    const id = req.params.id;
    const aid = req.params.aid;
    const upvoteAnswer = questionDB.upVote(id, aid);
    res.json({msg: "Answer updated", answer: upvoteAnswer});
});

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/question_db';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await questionDB.bootstrap(); // Fill in test data if needed.
        await app.listen(port); // Start the API
        console.log(`question API running on port ${port}!`);
    })
    .catch(error => console.error(error));
