import React from "react";
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from "./Question";

const question = {
    _id: 23,
    question: "How are you doing",
    answers: [{_id: 55, answerText: "Fandango", votes: 1},{_id: 56, answerText: "Fandango2", votes: 3},{_id: 55, answerText: "Fandango5", votes: 7}]
};
it('renders the question',()=>{
    const comp = <Question getQuestion={_id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.question)).toBeInTheDocument();
});

it(' it renders all the answers',()=>{
    const comp = <Question getQuestion={_id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.answers[0].answerText)).toBeInTheDocument();
    expect(getByText(question.answers[1].answerText)).toBeInTheDocument();
    expect(getByText(question.answers[2].answerText)).toBeInTheDocument();
});

it('calls "onSubmit" when the voting button is clicked', () => {
    const onSubmit = jest.fn();
    const comp = <Question getQuestion={_id => question}
                           putVote={onSubmit}/>
    const {getAllByText} = render(comp);
    fireEvent.click(getAllByText(/Likes/i)[0]); /* <!-- props.putVote is not a function*/
    expect(onSubmit).toHaveBeenCalled();
});