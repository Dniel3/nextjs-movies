import * as React from 'react';
import styles from './footer.module.scss';

interface FooterProps {
    children: React.ReactNode;
}

const Footer = ({children}: FooterProps) => <div className={styles.footer}>{children}</div>;

export default Footer