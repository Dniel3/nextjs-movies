import * as React from 'react';
import {useRouter} from 'next/router';
import GenreList from '../genrelist/genre_list';
import styles from './home.module.scss';
import MovieList, { Movie } from '../movielist/movie_list';
import { useDispatch } from 'react-redux';
import { orderMovies } from '../../redux/actions';

interface HomeProps {
    movies?: Movie[];
}

const Home = 
    ({movies}: HomeProps) => {
        const dispatch = useDispatch();
        const router = useRouter();
        const [orderChange, setOrderChange] = React.useState('');

        React.useEffect(() => {
            dispatch(orderMovies(router.query.order));   
            setOrderChange(router.query.order as string);     
        }, [router.query.order]);

        return <div className={styles.home} style={ movies && movies.length ? {} : {height: '100%'}}>
                <div className={styles.actions}>
                    <div className={styles.genres}><GenreList /></div>
                    <div className={styles.sort}>
                        <label htmlFor="movie">SORT BY: </label>
                        <select value={orderChange} 
                                onChange={(event) => {
                                    router.push(`/orderBy?order=${event.target.value}`);
                                }}>
                            <option value="" key="sort-none">SELECT</option>
                            <option value="release_date" key="sort-date">RELEASE DATE</option>
                            <option value="genres" key="sort-genre">GENRE</option>
                            <option value="vote_average" key="sort-rating">RATING</option>
                        </select>
                    </div>
                </div>
                {movies ? <MovieList movies={movies} /> : <div className={styles.empty}>Search Movies</div>}
            </div>;
    }

export default Home;
