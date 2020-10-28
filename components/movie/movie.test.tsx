import * as React from "react";
import { render, screen } from "@testing-library/react";
import MovieItem from "./movie";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import { FAKE_MOVIE } from "../moremenu/more_menu.test";

import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { selectMovie } from "../../redux/actions";


describe('movie', () => {
    let fakeHistory: any, fakeLocation: any;

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/initial"]}>
                    <MovieItem {...FAKE_MOVIE}  / >
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
    
    it('should render props in movie item', () => {
        expect(screen.getByAltText(FAKE_MOVIE.title)).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.title)).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.release_date.substring(0, 4))).toBeDefined();
        expect(screen.getByText(FAKE_MOVIE.genres.join(', '))).toBeDefined();
    });
    
    it('should dispatch selectMovie action when clicking movie', () => {
        userEvent.click(screen.getByTestId('movie-container'));

        expect(store.dispatch).toHaveBeenCalledWith(selectMovie(FAKE_MOVIE));
    });
  
    it('should hash navigate to film with id url', () => {
        userEvent.click(screen.getByTestId('movie-container'));

        expect(fakeLocation.hash).toBe(`#film/${FAKE_MOVIE.id}`);
    });
  
    it('should push history record navigate to film with id url', () => {
        userEvent.click(screen.getByTestId('movie-container'));

        expect(fakeHistory.entries[1].hash).toBe(`#film/${FAKE_MOVIE.id}`);
    });
});
