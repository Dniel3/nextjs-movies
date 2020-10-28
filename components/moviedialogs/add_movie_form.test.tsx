import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import store from "../../redux/store";

import userEvent from "@testing-library/user-event";

import * as ReactModal from 'react-modal';
import AddMovieFormik from "./add_movie_form";
import { pupulateAddForm } from "./add_movie.test";
import { FAKE_MOVIE } from "../moremenu/more_menu.test";

ReactModal.setAppElement('body');

describe('AddMovieFormik', () => {

    const addMovie = store.dispatch = jest.fn();

    beforeEach(() => {
        render(<AddMovieFormik {...{addMovie}} />); 

        pupulateAddForm();
    });  
    
    it('should have enabled submit button for valid values', async () => {
        await waitFor(() => expect(document.querySelector('.submit')!.closest('button')?.disabled).toBeFalsy());
    });
    
    it('should reset form when clicking reset button', () => {
        userEvent.click(document.querySelector('.reset')!);   

        expect(screen.queryByDisplayValue(FAKE_MOVIE.title)).toBeNull();   
    });    
    
    it('should call handleSubmit when clicking submit button', async () => {
        userEvent.click(document.querySelector('.submit')!);   

        await waitFor(() => expect(addMovie).toHaveBeenCalled());   
    });
});
