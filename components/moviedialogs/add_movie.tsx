import * as React from 'react';
import styles from './add_movie.module.scss';
import * as ReactModal from 'react-modal';
import { MovieDialogState, INITIAL_STATE, useMovieDialog, PANEL_CLASS, FormMovie } from './common';
import { useDispatch } from 'react-redux';
import { createMovie } from '../../redux/actions';
    
import AddMovieFormik from './add_movie_form';

const AddMovieDialog = () => {
 
    const [state, setState] = React.useState<MovieDialogState>(INITIAL_STATE);
    const dispatch = useDispatch();

    const addMovie = (values: FormMovie) => {
        dispatch(createMovie({
            ...values,
            tagline: 'none',
            vote_average: 0,
            vote_count: 0,
            budget: 0,
            revenue: 0,
        })); 
    };

    const {closeModal, openModal} = useMovieDialog(state, setState);

    return (<>
        <button className={styles.add} onClick={openModal}>+ ADD MOVIE</button>
        <ReactModal
                isOpen={state.isOpened}
                onRequestClose={closeModal}
                style={PANEL_CLASS}>
             <div className={styles.title}>
                <div>ADD MOVIE</div>
                <button className="close-button" onClick={closeModal}>X</button>
            </div>
            <AddMovieFormik addMovie={addMovie} />
        </ReactModal>
    </>);
}

export default AddMovieDialog;
