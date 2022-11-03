import React, { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SpinnerInfinity } from 'spinners-react';
import { BiPlayCircle } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

const API_key = "0f097268aacf4d733ae41e7001d75d42";
const URL = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowplaying = "now_playing";
const popular = "popular";
const toprated = "top_rated";

const Card = ({ img }) => {
    return <img src={img} className={styles.card} alt="cover" />
}

const Row = ({ title, arr = [] }) => {
    return <div className={styles.row}>
        <h2>{title}</h2>
        <div className={styles.rowRender}>
            {
                arr.map((item, index) => {
                    return <Card img={`https://image.tmdb.org/t/p/original/${item.poster_path}`} key={index} />
                })
            }
        </div>
    </div>
}

const Home = () => {
    const [upcomingMovies, setupcomingMovies] = useState();
    const [nowPlayingMovies, setnowPlayingMovies] = useState();
    const [popularMovies, setpopularMovies] = useState();
    const [topRatedMovies, settopRatedMovies] = useState();
    const [allGenreMovies, setallGenre] = useState();

    useEffect(() => {
        const fetchUpcomingData = async () => {
            const { data: { results } } = await axios.get(`${URL}/movie/${upcoming}?api_key=${API_key}`);
            setupcomingMovies(results);
        }
        const fetchNowPlaying = async () => {
            const { data: { results } } = await axios.get(`${URL}/movie/${nowplaying}?api_key=${API_key}`);
            setnowPlayingMovies(results);
        }
        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${URL}/movie/${popular}?api_key=${API_key}`);
            setpopularMovies(results);
        }
        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${URL}/movie/${toprated}?api_key=${API_key}`);
            settopRatedMovies(results);
        }
        const fetchAllGenre = async () => {
            const { data: { genres } } = await axios.get(`${URL}/genre/movie/list?api_key=${API_key}`);
            setallGenre(genres);
        }

        fetchUpcomingData();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        fetchAllGenre();
    }, [])

    return (
        (upcomingMovies && popularMovies && nowPlayingMovies && topRatedMovies && allGenreMovies) ?
            <section className={styles.home}>
                <div className={styles.banner}
                    style={{
                        backgroundImage: popularMovies[0]
                            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                            : "rgb(16, 16, 16)",
                    }}
                >
                    <h1>{popularMovies[0].original_title}</h1>
                    <p>{popularMovies[0].overview}</p>
                    <div className={styles.bannerButtons}>
                        <button>Play <BiPlayCircle /> </button>
                        <button>My List <AiOutlinePlus />   </button>
                    </div>
                </div>
                <Row title={"Upcoming on Netflix"} arr={upcomingMovies} />
                <Row title={"Now Playing on Netflix"} arr={nowPlayingMovies} />
                <Row title={"Top Rated on Netflix"} arr={topRatedMovies} />
                <Row title={"Popular on Netflix"} arr={popularMovies} />
                <div className={styles.genres}>
                    <h2>Genres in Netflix</h2>
                    <div className={styles.genrebox}>
                        {
                            (allGenreMovies && allGenreMovies.length > 0) ?
                                allGenreMovies.map(item => <Link key={item.id} to={`/genre/${item.id}`}> {item.name} </Link>) : <div></div>
                        }
                    </div>
                </div>
            </section>
            : <div className={styles.loading}>
                <SpinnerInfinity size={250} thickness={152} speed={121} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </div>);
};

export default Home;