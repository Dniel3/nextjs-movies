import * as React from "react";
import { render, screen } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import MovieDetails from "./movie_details";
import { FAKE_MOVIE } from "../moremenu/more_menu.test";

describe('MovieDetails', () => {
    let fakeHistory: any, fakeLocation: any;

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/#film/0"]}>
                    <MovieDetails {...FAKE_MOVIE}  / >
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
    
    it('should render movie details', () => {
        expect(screen.getByText(String(FAKE_MOVIE.vote_average))).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.title)).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.tagline)).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.release_date.substring(0, 4))).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.overview)).toBeDefined();
        expect(screen.getByAltText(FAKE_MOVIE.title)).toBeDefined();
    });
    
    it('should dispatch selectMovie action when clicking search button', () => {
        userEvent.click(screen.getByRole('button'));

        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should clear url hash when clicking search button', () => {
        userEvent.click(screen.getByRole('button'));

        expect(fakeHistory.entries[1].hash).toBe('');
    });
});
