import React from "react";
import styles from "../styles/Header.module.css";

function Header() {


    return (
        <>
            <header className={styles.header}>

                <img src="/Logo.webp" alt="Logo" width="50" height="50" />
                <h1 className = {styles.test}>Rate my teammates</h1>




            </header>


        </>
    )


}

export default Header;