import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import * as ReactModal from 'react-modal';
import GenreList, { Genres } from "./genre_list";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import { MemoryRouter, Route } from 'react-router-dom';

describe('GenreList', () => {

    beforeEach(() => {
        render(
            <Redux.Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <GenreList />
            </MemoryRouter>
        </Redux.Provider>); 
    });  

    it('should render genre list', async() => {
        expect(document.querySelectorAll('.genre').length).toBe(6);
    });
});