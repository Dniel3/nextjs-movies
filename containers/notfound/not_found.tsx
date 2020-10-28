import Link from 'next/link';
import * as React from 'react';
import Layout from '../../components/layout';
import styles from  './not_found.module.scss';

const NotFound = 
    () => {        
        return <Layout><div className={styles.container}>
                <h5>PAGE NOT FOUND</h5>
                <h4>404</h4>
                <Link href="/"><button>GO HOME</button></Link>
            </div>
            </Layout>;
    }

export default NotFound;
