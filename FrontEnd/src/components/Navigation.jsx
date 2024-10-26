import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';

function Navigation() {
    const navigate = useNavigate();

    return (
        <>
            <a className={styles.link} onClick={() => {
                navigate('/')
            }}>home</a>


        </>
    )
}

export default Navigation;