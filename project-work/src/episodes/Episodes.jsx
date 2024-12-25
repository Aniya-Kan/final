import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Episodes.module.css';  // Подключаем файл стилей

export default function Episodes() {
    const [a, setA] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let maxPage;

    const fetchCharacters = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/?page=${page}`);
            setA(response.data.results);
            maxPage = response.data.info.pages;
            setError(null);
        } catch (e) {
            setError("Failed to fetch episodes.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    return (
        <React.Fragment>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            <div className={styles.container}>
                {a.map((element) => (
                    <div className={styles.card} key={element.id}>
                        {element.name}
                        <img src={element.image} alt={element.name} />
                    </div>
                ))}
            </div>
            <div>
            <button className="button" onClick={() => setPage(page - 1)}>back</button>
            <button className="button" onClick={() => setPage(page + 1)}>next</button>
            </div>
        </React.Fragment>
    );
}
