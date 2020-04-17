import React, {Component} from 'react';
import {Link} from "@reach/router";

class Questions extends Component {
    render() {
        const mapFunction = q =>
            <li key={q.id}>
                <Link to={"/question/" + q.id}>{q.question}</Link>
            </li>;

        let questions = this.props.data;
        let list = questions.map(mapFunction);

        return (
            <>
                <ul>
                    {list}
                </ul>
                <Link to="/new">New question</Link>
            </>
        );
    }
}

export default Questions;

