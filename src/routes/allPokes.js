import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])

    const getData = () => {
        setLoading(true);
        fetch('http://localhost:4620/pokemon')
        .then((res) => res.json())
        .then(
            function(entries) {
                console.log(entries[0].name)
                setAllPokemon(entries);
            }
        )
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    
      useEffect(() => {
        getData();
      },[])


    return (
        <div className="App">
            <h1>All the pokemon</h1>
            <div>
                {allPokemon.length > 0 && allPokemon.map(e => 
                <div>
                    <Link to={`/pokemon/${e.id}`}>{e.name.english}</Link>
                    <div>
                        <span>Type:</span>
                        <div>{e.type.map(e => <span>{e}</span>)}</div>
                    </div>
                    <div>
                        <span>Base:</span>
                        <div>
                            <span>HP: {e.base.HP}</span>
                            <span>Attack: {e.base.Attack}</span>
                            <span>Defense: {e.base.Defense}</span>
                            <span>Sp. Attack: {e.base['Sp. Attack']}</span>
                            <span>Sp. Defense: {e.base['Sp. Defense']}</span>
                            <span>Speed: {e.base.Speed}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default AllPokes;
