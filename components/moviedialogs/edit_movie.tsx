import * as React from 'react';
import * as ReactModal from 'react-modal';
import styles from './edit_movie.module.scss';
import { useMovieDialog, PANEL_CLASS, FormMovie } from './common';
import { Movie } from '../../containers/movielist/movie_list';
import { useDispatch } from 'react-redux';
import { editMovie } from '../../redux/actions';
import EditMovieFormik from './edit_movie_form';

const EditMovieDialog = (props: Movie) => {

    const [state, setState] = React.useState({isOpened: false, movie: props});

    const {closeModal, openModal} = useMovieDialog(state, setState);
    
    const dispatch = useDispatch();

    const edit = (values: FormMovie) => {
        dispatch(editMovie({
            ...props,
            ...values
        })); 
        closeModal();
    };

    return (<>
        <button className={styles.edit} onClick={openModal}>EDIT</button>
        <ReactModal
                isOpen={state.isOpened}
                onRequestClose={closeModal}
                style={PANEL_CLASS}>
            
            <div className={styles.title}>
                <div>EDIT MOVIE</div>
                <button className="close-button" onClick={closeModal}>X</button>
            </div>
            <EditMovieFormik movie={props} editMovie={edit} />            
        </ReactModal>
    </>);
}

export default EditMovieDialog
