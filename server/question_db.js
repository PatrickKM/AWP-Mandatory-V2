class Db {
    /**
     * Constructors an object for accessing questions in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store questions in MongoDB
        const questionSchema = new mongoose.Schema({
            question: String,
            answers: [{ answerText: String, votes: Number }]
        });

        // This model is used in the methods of this class to access questions
        this.questionModel = mongoose.model('question', questionSchema);
    }

    // GET Questions (all)
    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    // GET Question (by id)
    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    // POST Question
    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    // POST Answer (in id of question)
    async addAnswer(questionId, text) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);
        const answer = {answerText: text, votes: 0};

        question.answers.push(answer);

        // const answer = question.answers.id(aid);

        return await question.save();
    }

    // Postman Testing i Body (JSON):
    // {
    // 	"answerText": "test"
    // }

    // PUT Vote (in id of answer in id of question).
    async upVote(id, aid) {
        const question = await this.getQuestion(id);
        const answer = question.answers.id(aid);

        answer.votes++;

        console.log(answer);
        return await question.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of questions to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        /* const answers = ['This is not the correct method', 'This is the correct method', 'Sorry, I dont know', 'This is not a function in React'];*/
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        function getRandomQuestion() {
            return ['What are Props', 'What are states', 'How to create a react app', 'what is NPM'][getRandomInt(0,3)]
        }

        /* function getRandomVotes() {
            return [2, 6, 8, 12][getRandomInt(0,3)]
        }

        function getRandomAnswers() {
            const shuffled = answers.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        } */

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let question = new this.questionModel({
                    question: getRandomQuestion(),
                    answers: [
                        { answerText: "I don't know??", votes: 0},
                        { answerText: "Run npm i bootstrap in your project", votes: 0}
                    ]
                });
                promises.push(question.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);