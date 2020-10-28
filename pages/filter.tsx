import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/layout';
import { Genres } from '../containers/genrelist/genre_list';
import Home from '../containers/home/home';
import { filterMovies } from '../redux/actions';
import { useTypedSelector } from '../redux/store';

export default function Search() {
    const dispatch = useDispatch();
    const router = useRouter();

    React.useEffect(() => {
      const filter = router.query.filter === Genres.ALL ? '' : router.query.filter;
      dispatch(filterMovies(filter));
    }, [router.query.filter]);

    const movies = useTypedSelector(state => state.movies);

    return (<Layout><Home movies={movies}/></Layout>);
  }