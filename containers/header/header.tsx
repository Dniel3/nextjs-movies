import * as React from 'react';
import FilterBar from '../../components/filterbar/filter_bar'
import Logo from '../../components/logo/logo';
import styles from './header.module.scss';
import AddMovieDialog from '../../components/moviedialogs/add_movie';
import { useTypedSelector } from '../../redux/store';
import MovieDetails from '../../components/moviedetails/movie_details';
import Link from 'next/link';

const Header = () => {
    const movie = useTypedSelector(state => state.selectedMovie);

    if(movie) return <MovieDetails movie={movie} parentStyles={styles} />;

    return <div className={styles.header}>
        <div className={styles.row1}>
            <Link href="/"><a><Logo/></a></Link>
            <AddMovieDialog />
        </div>
        <div className={styles.row2}>FIND YOUR MOVIE</div>
        <FilterBar />
    </div>;
};

export default Header
