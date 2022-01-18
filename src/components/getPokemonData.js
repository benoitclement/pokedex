import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetPokemonData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let pokemons = [];
    const fetchData = async () => {
      setLoading(true);
      axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50')
      .then(response => {
        //setData(response.data.results);
        pokemons = response.data.results;
        console.log(pokemons);
      })
      .then(() => {
        pokemons.forEach(pokemon => {
          axios.get(pokemon.url)
          .then(response => {
            pokemon.picture = response.data.sprites.front_default;
          })
        })
      })
      .then(() => {
        setData(pokemons);
        //setLoading(false);
      });
    }
    fetchData();
  }, []);

  const loadCards = () => {
    setLoading(false);
  }

  return (
    <div className='App'>
    {loading && (
      <div>
        <div>Loading</div>
        <button onClick={loadCards}>Load cards</button>
      </div>
    )}
    {!loading && (
      <div>
        <h2>Some poket monsters</h2>
        <div className='card-container'>
        {
          data.map((pokemon, index) => (
          <div key={index} className='unit-card'>
            <h4>{pokemon.name}</h4>
            <img src={pokemon.picture}/>
          </div>)
          )
        }
        </div>
      </div>
    )}
    </div>
  );
}

export default GetPokemonData;
