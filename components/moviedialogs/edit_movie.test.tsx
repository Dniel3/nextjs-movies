import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import userEvent from "@testing-library/user-event";
import { FAKE_MOVIE } from "../moremenu/more_menu.test";

import * as ReactModal from 'react-modal';
import EditMovieDialog from "./edit_movie";

ReactModal.setAppElement('body');

describe('EditMovieDialog', () => {

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <EditMovieDialog {...FAKE_MOVIE} />
            </Redux.Provider>);     

        userEvent.click(document.querySelector('.edit-button')!);   
    });  
    
    it('should open dialog', () => {
        expect(screen.getByText('EDIT MOVIE')).toBeDefined();
    });
    
    it('should close dialog when clicking close button', () => {
        userEvent.click(document.querySelector('.close-button')!);   

        expect(screen.queryByText('EDIT MOVIE')).toBeNull();
    });
    
    it('should dispatch createMovie action when clicking add button', async () => {        
        userEvent.click(document.querySelector('.submit')!);  

        await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    });
    
    it('should reset form when clicking reset button', () => {
        userEvent.type(document.querySelector('input[name="title"]')!, 'title');   
        expect(screen.queryByDisplayValue('title')).toBeDefined();   

        userEvent.click(document.querySelector('.reset')!);   

        expect(screen.queryByDisplayValue(FAKE_MOVIE.title)).toBeDefined();   
    });
});
