import React from "react";
import styles from "../styles/Header.module.css";
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();



    return (
        <>
            <header className={styles.header}>
                <div className={styles.left}>
                    <img src="/Logo.webp" alt="Logo" width="70" height="70"/>
                    <h1 className={styles.siteName}>Rate my teammates</h1>
                </div>

                <a className={styles.home} onClick={() => navigate('/')}>Home</a>

            </header>


        </>
    )


}

export default Header;