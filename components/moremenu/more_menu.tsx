import * as React from 'react';
import styles from './more_menu.module.scss';
import { Movie } from '../../containers/movielist/movie_list';
import EditMovieDialog from '../moviedialogs/edit_movie';
import DeleteMovieDialog from '../moviedialogs/delete_movie';

const MoreMenu = (props: Movie) => {
    return (<>
        <div className={styles.dropdown}>
            <div className={styles.container}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={styles.content}>
                <EditMovieDialog {...props} />
                <DeleteMovieDialog {...props} />
            </div>
        </div> 
    </>);
};

export default MoreMenu;
