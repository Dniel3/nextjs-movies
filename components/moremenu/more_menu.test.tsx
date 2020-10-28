import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoreMenu from "./more_menu";
import { Movie } from "../../containers/movielist/movie_list";

import { Provider } from 'react-redux';
import store from "../../redux/store";

import * as ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export const FAKE_MOVIE: Movie = {
    id: 399055,
    title: 'The Shape of Water',
    tagline: 'A Fairy Tale for Troubled Times',
    vote_average: 7.3,
    vote_count: 3200,
    release_date: '2017-12-01',
    poster_path: 'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
    overview: 'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.',
    budget: 19500000,
    revenue: 185545281,
    genres: [
        'Drama',
        'Fantasy',
        'Romance'
    ],
    runtime: 123
}

describe('MoreMenu', () => {
    beforeEach(() => {
        render(     
            <Provider store={store}>
                <MoreMenu {...FAKE_MOVIE}  / >
            </Provider>
        );
    });
    

    it('should have edit button', () => {
        expect(screen.getByText('EDIT')).toBeDefined();
    });

    it('should have delete button', () => {
        expect(screen.getByText('DELETE')).toBeDefined();
    });

    it('should open edit dialog', () => {
        userEvent.click(screen.getByText('EDIT'));

        expect(screen.getByText('EDIT MOVIE')).toBeDefined();
    });

    it('should open delete dialog', () => {
        userEvent.click(screen.getByText('DELETE'));

        expect(screen.getByText('DELETE MOVIE')).toBeDefined();
    });
});
