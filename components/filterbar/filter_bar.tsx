import * as React from 'react';
import styles from './filter_bar.module.scss';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../redux/actions';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FilterBar = () => {
    const [search, setSearch] = React.useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    React.useEffect(() => {
        dispatch(searchMovies(router.query.search));
        setSearch(router.query.search as string);     
    }, [router.query.search]);


    const dispatchSearch = (search: string) => {
        dispatch(searchMovies(search));
    };

    return <div className={styles.container}>
        <input 
            value={search} 
            onChange={(event) => setSearch(event.target.value)} 
            type="text" 
            placeholder="What do you want to watch?"/>
        <Link href={`/search?search=${search}`}>
            <button onClick={() => dispatchSearch(search)}>SEARCH</button>
        </Link>
    </div>;
}

export default FilterBar;
