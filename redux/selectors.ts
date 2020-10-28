import { MovieState } from "./store";

export const getMovies = (state: MovieState) => state.movies;

export const getSelectedMovie = (state: MovieState) => state.selectedMovie;