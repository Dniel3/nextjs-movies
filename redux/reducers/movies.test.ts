import { FAKE_MOVIE } from "../../components/moremenu/more_menu.test";
import { error, listMovies, MoviesActions, selectMovie, startLoading } from "../actions";
import moviesReducer, { INITIAL_STATE } from "./movies";

describe('MovieReducer', () => {

    it('should return initial state', () => {
        expect(moviesReducer(undefined, {type: MoviesActions.UNKNOWN, payload: {}})).toBe(INITIAL_STATE);
    });

    it('should return state with selected movie', () => {
        expect(moviesReducer(undefined, selectMovie(FAKE_MOVIE)))
            .toStrictEqual({...INITIAL_STATE, selectedMovie: FAKE_MOVIE});
    });

    it('should return state with selected movie as null', () => {
        expect(moviesReducer({...INITIAL_STATE, selectedMovie: FAKE_MOVIE}, selectMovie(null)))
            .toStrictEqual({...INITIAL_STATE, selectedMovie: null});
    });

    it('should return state with error', () => {
        expect(moviesReducer(undefined, error('error')))
            .toStrictEqual({...INITIAL_STATE, error: {error: 'error'}, loading: false,});
    });

    it('should return loading state', () => {
        expect(moviesReducer(undefined, startLoading()))
            .toStrictEqual({...INITIAL_STATE, loading: true,});
    });

    it('should return state with  listed movies', () => {
        const movies = [FAKE_MOVIE];

        expect(moviesReducer(undefined, listMovies(movies)))
            .toStrictEqual({...INITIAL_STATE, movies,});
    });
});