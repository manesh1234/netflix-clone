import React from 'react';
import logo from "../assets/netflix_logo.png";
import styles from "./Header.module.css";
import { Link } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

const Header = () => {
    return (
        <nav className={styles.header}>
            <img src={logo} alt="logo"/>
            <div className={styles.links}>
                <Link to="/tvshows">TV Shows</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/RecentlyAdded">Recently Added</Link>
                <Link to="/MyList">My List</Link>
            </div>
            <ImSearch />
        </nav>
    )
}

export default Header;