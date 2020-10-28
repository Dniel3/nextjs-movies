import * as React from "react";
import { render, screen } from "@testing-library/react";

import * as Redux from 'react-redux';
import store from "../../redux/store";

import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import FilterBar from "./filter_bar";

const FAKE_SEARCH = 'TACO';

describe('FilterBar', () => {
    let fakeHistory: any, fakeLocation: any;

    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={["/initial"]}>
                    <FilterBar />
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

        userEvent.type(screen.getByDisplayValue(''), FAKE_SEARCH);
        userEvent.click(screen.getByRole('button'));   
    });  
    
    it('should dispatch filterMovies action when clicking search button', () => {
        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should navigate to search page', () => {
        expect(fakeHistory.entries[1].pathname).toBe('/search');
        expect(fakeHistory.entries[1].search).toBe(`?search=${FAKE_SEARCH}`);
    });
});

describe('FilterBar with search query', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
        render(     
            <Redux.Provider store={store}>
                <MemoryRouter initialEntries={[`/search?search=${FAKE_SEARCH}`]}>
                    <FilterBar />
                    <Route path="*" />
                </MemoryRouter>
            </Redux.Provider>);        
    });  
    
    it('should dispatch filterMovies action when clicking search button', () => {
        expect(store.dispatch).toHaveBeenCalled();
    });
});
