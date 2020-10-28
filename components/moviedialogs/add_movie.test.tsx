import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import userEvent from "@testing-library/user-event";
import { FAKE_MOVIE } from "../moremenu/more_menu.test";

import * as ReactModal from 'react-modal';
import AddMovieDialog from "./add_movie";
import { Genres } from "../../containers/genrelist/genre_list";

ReactModal.setAppElement('body');

describe('AddMovieDialog', () => {

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <AddMovieDialog />
            </Redux.Provider>);     

        userEvent.click(document.querySelector('.add-button')!);   
    });  
    
    it('should open dialog', () => {
        expect(screen.getByText('ADD MOVIE')).toBeDefined();
    });
    
    it('should close dialog when clicking close button', () => {
        userEvent.click(document.querySelector('.close-button')!);   

        expect(screen.queryByText('ADD MOVIE')).toBeNull();
    });
    
    it('should dispatch createMovie action when clicking add button', async () => {
        pupulateAddForm();
        
        userEvent.click(document.querySelector('.submit')!);  

        await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    });
    
    it('should reset form when clicking reset button', () => {
        pupulateAddForm();

        userEvent.click(document.querySelector('.reset')!);   

        expect(screen.queryByDisplayValue(FAKE_MOVIE.title)).toBeNull();   
    });
});

export function pupulateAddForm() {
    userEvent.type(document.querySelector('input[name="title"]')!, FAKE_MOVIE.title);   
    userEvent.type(document.querySelector('input[name="release_date"]')!, FAKE_MOVIE.release_date);
    userEvent.type(document.querySelector('input[name="poster_path"]')!, FAKE_MOVIE.poster_path);
    userEvent.selectOptions(document.querySelector('select[name="genres"]')!, [Genres.ALL]);
    userEvent.type(document.querySelector('input[name="overview"]')!, FAKE_MOVIE.overview);
    userEvent.type(document.querySelector('input[name="runtime"]')!, FAKE_MOVIE.runtime.toString());
}
