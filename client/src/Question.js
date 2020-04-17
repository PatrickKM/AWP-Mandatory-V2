import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from './PostAnswer';

class Question extends Component {

    onSubmit(aid) {
        this.props.putVote(this.props.id, aid);
    }

    render() {
        const id = this.props.id;
        const question = this.props.getQuestion(id);

        let content = "Loading";
        let answers = [];
        if (question) {
            content = question.question;
            answers = question.answers.map(a =>
                    <li>
                        {a.answerText}
                        <button onClick={_ => this.onSubmit(a.id)} >
                            Likes: {a.votes}
                        </button>
                    </li>
                );
        }

        return (
            <>
                <h2>Question</h2>
                <p>{content}</p>
                <h3>Answers</h3>
                <ul>
                    {answers}
                </ul>


                {/* PostAnswer */}
                <PostAnswer id={id} postAnswer={(id, text) => this.props.postAnswer(id, text)}/>
                <br/><br/>
                <Link to="/">Back</Link>
            </>
        );
    }
}

export default Question;

