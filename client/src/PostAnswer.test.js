import React from "react";
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostAnswer from "./PostAnswer";

it('Check if button is clicked ', async () => {
    const onSubmit = jest.fn();

    // Render the Answer component with the mock callback
    const {getByText} = render(<PostAnswer postAnswer={onSubmit}/>);

    // Click on button
    fireEvent.click(getByText(/Post Answer/i));

    // Expect the callback to have been called
    expect(onSubmit).toHaveBeenCalled();
});