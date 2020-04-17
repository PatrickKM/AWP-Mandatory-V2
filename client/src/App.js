import React, {Component} from 'react';
import Questions from './Questions';
import Question from './Question';
import { Router } from "@reach/router";
import AskQuestion from "./AskQuestion";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        // Get everything from the API
        this.getData().then(() => console.log("Questions gotten!"));
    }

    async getData() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    getQuestion(id) {
        // Find the relevant question by id
        const question = this.state.questions.find(q => q.id === parseInt(id));
        return question;
    }

    async askQuestion(text) {
        console.log("askQuestion", text);
        const url = `${this.API_URL}/questions`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `${this.API_URL}/questions/${id}/answers`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    async putVote(id, aid) {
        console.log("putVote", id, aid);
        const url = `${this.API_URL}/questions/${id}/answers/${aid}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getData()
    }

    render() {
        return (
            <>
                <h1>QA</h1>
                <Router>
                    <Questions path="/" data={this.state.questions}/>
                    <Question path="/question/:id"
                              getQuestion={id => this.getQuestion(id)}
                              postAnswer={(id, text) => this.postAnswer(id, text)}
                              putVote={(id, aid) => this.putVote(id, aid)}
                    />
                    <AskQuestion path="/new" askQuestion={(text) => this.askQuestion(text)}/>
                </Router>
            </>
        );
    }
}

export default App;
