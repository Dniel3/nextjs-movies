import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Movie } from '../../containers/movielist/movie_list';
import Logo from '../logo/logo';
import { selectMovie } from '../../redux/actions';
import styles from './movie_details.module.scss';
import { useRouter } from 'next/router';

interface MovieDetailsProps {
    movie: Movie;
    parentStyles: {[key: string]: string};
}

const MovieDetails = ({movie, parentStyles}: MovieDetailsProps) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const dispatchMovieSelection = React.useCallback(() => {
        router.push(router.asPath, undefined, {shallow: true});
        dispatch(selectMovie(null))
    }, []);

    return (
        <div className={parentStyles.header}>
            <div className={parentStyles.row1}>
                <Logo/>
                <button onClick={dispatchMovieSelection}>Search</button>
            </div>
            <div className={styles.container}>
                <img src={movie.poster_path} alt={movie.title}/>
                <div>
                    <div className={styles.text}>
                        {movie.title}<span>{movie.vote_average}</span>
                    </div>
                    <div className={styles.overview}>{movie.tagline}</div>
                    <div className={styles.time}>{movie.release_date.substring(0, 4)}</div>
                    <div className={styles.overview}>{movie.overview}</div>
                </div>
            </div>
        </div>);
}

export default MovieDetails;
