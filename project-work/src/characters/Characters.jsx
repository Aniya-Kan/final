import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Characters.css"

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCharacters = async (currentPage) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
      setCharacters(response.data.results);
      setFilteredCharacters(response.data.results);
      setMaxPage(response.data.info.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [search, characters]);

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page <= maxPage) {
      setPage(page + 1);
    }
  };

 

  return (
    <React.Fragment>
      <div className="search">
        <input
          type="text"
          placeholder="Введите имя персонажа"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="images">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            
            <div className="items"
            key={character.id}>
              <p className="name">{character.name}</p>
              <p>{character.status}</p>
              <p>{character.gender}</p>
              <div className="imgs"><img src={character.image} alt={character.name} /></div>
              
            </div>
          ))
        ) : (
          <p>Не найдено</p>
        )}
      </div>
      <div className="pagination">
        <p className="pag">Страница {page} из {maxPage}</p>
        <div className="butns">
          <button onClick={previous} disabled={page <= 1}>
            Назад
          </button>
          <button onClick={next} disabled={page >= maxPage}>
            Вперед
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}


