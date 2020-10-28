import * as React from 'react';
import styles from './movie.module.scss';
import { Movie } from '../../containers/movielist/movie_list';
import MoreMenu from '../moremenu/more_menu';
import { useDispatch } from 'react-redux';
import { selectMovie } from '../../redux/actions';
import { useRouter } from 'next/router';

const MovieItem = (movie: Movie) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const movieClicked = React.useCallback(() => {
        router.push(`${router.asPath}&film=${movie.id}`, undefined, {shallow: true});
        dispatch(selectMovie(movie));
    }, []);

    return <div data-testid="movie-container" className={styles.movie} onClick={movieClicked}>
                <div className={styles.poster}>
                    <div className={styles.menu}><MoreMenu {...movie} /></div>
                    <img src={movie.poster_path} alt={movie.title}/>
                </div>
                <div className={styles.description}>
                    <div className={styles.row1}>
                        <div>{movie.title}</div>
                        <div className={styles.year}>{movie.release_date.substring(0, 4)}</div>
                    </div>
                    <div className={styles.row2}>{movie.genres.join(', ')}</div>
                </div>
            </div>;                                                                                         
};

export default MovieItem
