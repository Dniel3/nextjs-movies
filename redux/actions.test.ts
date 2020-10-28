import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import fetchMock from "jest-fetch-mock"

import { AnyAction } from 'redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { FAKE_MOVIE } from '../components/moremenu/more_menu.test';
import { createMovie, deleteMovie, editMovie, error, fetchMovies, filterMovies, listMovies, MoviesActions, orderMovies, searchMovies, selectMovie, startLoading } from './actions';
import { MovieState } from './store';
import { INITIAL_STATE } from './reducers/movies';
import { MOVIES_API_ROOT_URL } from '../movies_api';

const middlewares = [thunk]
const mockStore = configureMockStore<MovieState>(middlewares)

const movies = [FAKE_MOVIE];

const expectedLoadingAction = 
    {
        type: MoviesActions.LOADING,
        payload: {loading: true},
    };
const expectedListAction =
    {
        type: MoviesActions.LIST,
        payload: {movies},
    };

describe('Actions', () => {

    it('should generate listMovies action', () => {       
        expect(listMovies(movies)).toStrictEqual(expectedListAction);
    });

    it('should generate selectMovie action', () => {
        const expected = {
            type: MoviesActions.SELECTED,
            payload: {selectedMovie: FAKE_MOVIE},
        };
        
        expect(selectMovie(FAKE_MOVIE)).toStrictEqual(expected);
    });

    it('should generate startLoading action', () => {
        expect(startLoading()).toStrictEqual(expectedLoadingAction);
    });

    it('should generate error action', () => {
        const errorMessage = 'error';
        const expected = {
            type: MoviesActions.ERROR,
            payload: {error: errorMessage},
        };
        
        expect(error(errorMessage)).toStrictEqual(expected);
    });
});

describe('Async Actions', () => {
    let store: MockStoreEnhanced<MovieState, {}>;

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify({ data: movies }));
        store = mockStore(INITIAL_STATE);
    });
    
    it('should fetch movies', () => {
        return store.dispatch(fetchMovies() as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual([expectedLoadingAction, expectedListAction])
        });
    });
    
    it('should fetch movies after deleting movie', () => {
        const expectedActions = [expectedLoadingAction, expectedLoadingAction, expectedListAction]
        
        return store.dispatch(deleteMovie(FAKE_MOVIE.id) as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should fetch movies after creating movie', () => {
        const expectedActions = [expectedLoadingAction, expectedLoadingAction, expectedListAction]
        
        return store.dispatch(createMovie(FAKE_MOVIE) as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should fetch movies after editing movie', () => {
        const expectedActions = [expectedLoadingAction, expectedLoadingAction, expectedListAction]
        
        return store.dispatch(editMovie(FAKE_MOVIE) as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should fetch filtered movies after filtering movie', () => {
        const expectedActions = [expectedLoadingAction, expectedListAction]
        
        return store.dispatch(filterMovies('tars') as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should fetch ordered movies after ordering movie', () => {
        const expectedActions = [expectedLoadingAction, expectedListAction]
        
        return store.dispatch(orderMovies('barz') as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should fetch matching movies after searchin movie', () => {
        const expectedActions = [expectedLoadingAction, expectedListAction]
        
        return store.dispatch(searchMovies('foo') as unknown as AnyAction).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});