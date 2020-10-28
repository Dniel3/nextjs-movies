import * as React from "react";
import { render, screen } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import userEvent from "@testing-library/user-event";
import DeleteMovieDialog from "./delete_movie";
import { FAKE_MOVIE } from "../moremenu/more_menu.test";

import * as ReactModal from 'react-modal';

ReactModal.setAppElement('body');

describe('DeleteMovie', () => {

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <DeleteMovieDialog {...FAKE_MOVIE} />
            </Redux.Provider>);     

        userEvent.click(document.querySelector('.edit-button')!);   
    });  
    
    it('should open dialog', () => {
        expect(screen.getByText('DELETE MOVIE')).toBeDefined();
    });
    
    it('should close dialog when clicking close button', () => {
        userEvent.click(document.querySelector('.close-button')!);   

        expect(screen.queryByText('DELETE MOVIE')).toBeNull();
    });
    
    it('should dispatch deleteMovie action when clicking delete button', () => {
        userEvent.click(document.querySelector('.submit')!);   

        expect(store.dispatch).toHaveBeenCalled();
    });
});
