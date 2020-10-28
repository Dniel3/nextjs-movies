import * as React from 'react';
import { Movie } from '../../containers/movielist/movie_list';
import { Genres } from '../../containers/genrelist/genre_list';
import * as Yup from 'yup';

export const PANEL_CLASS = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#232323',
    }
};    

export interface MovieDialogState {
    isOpened: boolean;
    movie: Movie;
}

export interface FormMovie {
    id?: number;
    title: string;
    release_date: string;
    poster_path: string;
    overview: string;
    runtime: number;
    genres: string[];
}

export const INITIAL_STATE: MovieDialogState = {
    isOpened: false,
    movie: {
        id: 0, 
        title: '', 
        poster_path: '', 
        release_date: '0000-00-00', 
        genres: [Genres.ALL], 
        overview: ''
    } as Movie,};

export function useMovieDialog(state: MovieDialogState, 
setState: React.Dispatch<React.SetStateAction<MovieDialogState>>): {closeModal: () => void, openModal: () => void} {
    const closeModal = () => setState(INITIAL_STATE);
    
    const openModal = () => setState({...state, isOpened: true,});

    return {closeModal, openModal};
}

const MOVIE_VALIDATION_SHAPE = {
    title: Yup.string().required('Required!'),
    release_date: Yup.date().required('Required!'),
    poster_path: Yup.string().url('Insert URL!').required('Required!'),
    overview: Yup.string().required('Required!'),
    runtime: Yup.number().min(1, 'Too small!').required('Required!'),
    genres: Yup.array().required('Required!'),
};

export const MOVIE_VALIDATION_SCHEMA = Yup.object().shape(MOVIE_VALIDATION_SHAPE);

export const EDIT_MOVIE_VALIDATION_SCHEMA = Yup.object().shape({
    ...MOVIE_VALIDATION_SHAPE,
    id: Yup.number().required('Required!'),
});