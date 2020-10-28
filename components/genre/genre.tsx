import * as React from 'react';
import styles from './genre.module.scss';
import { GenreProps } from '../../containers/genrelist/genre_list';
import Link from 'next/link';

const Genre = ({name}: GenreProps) => {
        return <Link href={`/filter?filter=${name}`}>
                <div className={styles.genre}>{name.toUpperCase()}</div>
           </Link>; 
}

export default Genre
