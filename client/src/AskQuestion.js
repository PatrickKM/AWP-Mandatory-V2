import React, {Component} from 'react';
import {Link} from "@reach/router";

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.askQuestion(this.state.input);
    }

    render() {
        return (
            <>
                <h2>Question</h2>
                <input name="input" onChange={event => this.onChange(event)} type="text"/>
                <br/><br/>
                <button onClick={_ => this.onSubmit()}>Save question</button>

                <br/><Link to="/">Back</Link>
            </>
        )
    }
}

export default AskQuestion;

