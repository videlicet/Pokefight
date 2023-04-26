import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function PokeDetail() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisPokemon, setThisPokemon] = useState([])
    let { id } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}`)
        .then((res) => {
          console.log(`http://localhost:4620/pokemon/${id}`)
          console.log(res)
          return res.json()})
        .then(
          function(entries) {
              console.log(entries)
              setThisPokemon(entries[0]);
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
            <h1>Specific pokemon</h1>
            <div>
                {Object.keys(thisPokemon).length > 0 &&
                <div>
                    <Link to={`/pokemon/${thisPokemon.id}/name`}>{thisPokemon.name.english}</Link>
                    <div>
                        <Link to={`/pokemon/${thisPokemon.id}/type`}>Type:</Link>
                        <div>{thisPokemon.type.map(e => <span>{e}</span>)}</div>
                    </div>
                    <div>
                        <Link to={`/pokemon/${thisPokemon.id}/base`}>Base:</Link>
                        <div>
                            <span>HP: {thisPokemon.base.HP}</span>
                            <span>Attack: {thisPokemon.base.Attack}</span>
                            <span>Defense: {thisPokemon.base.Defense}</span>
                            <span>Sp. Attack: {thisPokemon.base['Sp. Attack']}</span>
                            <span>Sp. Defense: {thisPokemon.base['Sp. Defense']}</span>
                            <span>Speed: {thisPokemon.base.Speed}</span>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default PokeDetail;


/**
            <div>
                {allPokemon.length > 0 && allPokemon.map(e => 
                <div>
                    <NavLink to={`/${e.id}`}>{e.name.english}</NavLink>
                    <div>
                        <span>Type:</span>
                        <div>{e.type.map(e => <span>{e}</span>)}</div>
                    </div>
                    <div>
                        <span>Stats:</span>
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
 */