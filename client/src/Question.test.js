import React from "react";
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from "./Question";

const question = {
    _id: 23,
    question: "How are you doing",
    answers: []
};

it('renders the question',()=>{
    const comp = <Question getQuestion={_id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.question)).toBeInTheDocument();
});