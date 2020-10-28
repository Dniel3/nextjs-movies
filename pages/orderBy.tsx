import React from 'react';
import Layout from '../components/layout';
import Home from '../containers/home/home';
import { useTypedSelector } from '../redux/store';

export default function Search() {
    const movies = useTypedSelector(state => state.movies);

    return (<Layout><Home movies={movies}/></Layout>);
  }