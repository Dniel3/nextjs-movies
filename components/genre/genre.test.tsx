import * as React from "react";
import { render, screen } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import Genre from "./genre";
import { Genres } from "../../containers/genrelist/genre_list";

const FAKE_GENRE = {name: 'TACO'};

describe('Genre', () => {
    let fakeHistory: any, fakeLocation: any;

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Genre {...FAKE_GENRE}  / >
                    <Route
                        path="*"
                        render={({ history, location }) => {
                            fakeHistory = history;
                            fakeLocation = location;
                            return null;
                        }}
                    />
                </MemoryRouter>
            </Redux.Provider>);        
    });  
 
    it('should not call filterMovies action for empty url params', () => {
        expect(store.dispatch).not.toHaveBeenCalled();
    });
    
    it('should render genre name', () => {
        expect(screen.getByText(FAKE_GENRE.name)).toBeDefined();
    });
    
    it('should dispatch filterMovies action when clicking genre', () => {
        userEvent.click(screen.getByText(FAKE_GENRE.name));

        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should navigate to search page', () => {
        userEvent.click(screen.getByText(FAKE_GENRE.name));

        expect(fakeHistory.entries[1].pathname).toBe('/filter');
        expect(fakeHistory.entries[1].search).toBe(`?filter=${FAKE_GENRE.name}`);
    });
});

describe('Genre with url params', () => {

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/filter?filter="]}>
                    <Genre {...FAKE_GENRE}  / >
                </MemoryRouter>
            </Redux.Provider>);        
    });  
    
    it('should dispatch filterMovies action when url has filter params', () => {
        expect(store.dispatch).toHaveBeenCalled();
    });
});

describe('Genre All', () => {
    let fakeHistory: any, fakeLocation: any;

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Genre name={Genres.ALL}  / >
                    <Route
                        path="*"
                        render={({ history, location }) => {
                            fakeHistory = history;
                            fakeLocation = location;
                            return null;
                        }}
                    />
                </MemoryRouter>
            </Redux.Provider>);        
    });  
 
    it('should navigate to search all page', () => {
        userEvent.click(screen.getByText('ALL'));

        expect(fakeHistory.entries[1].pathname).toBe('/filter');
        expect(fakeHistory.entries[1].search).toBe('?filter=');
    });
});