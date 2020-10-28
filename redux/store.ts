import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { Movie } from "../containers/movielist/movie_list";
import moviesReducer from "./reducers/movies";

export interface MovieState {
    loading: boolean;
    movies: Movie[];
    selectedMovie: Movie|null;
    error: string;
}

export interface MovieStore {
    movies: MovieState;
}

export default createStore(moviesReducer, applyMiddleware(thunkMiddleware));

export const useTypedSelector: TypedUseSelectorHook<MovieState> = useSelector;
