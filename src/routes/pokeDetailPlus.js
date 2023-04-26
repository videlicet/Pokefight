import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function PokeDetailPlus() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisStat, setThisStat] = useState([])
    let { id, info } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}/${info}`)
        .then((res) => {
          console.log(`http://localhost:4620/pokemon/${id}/${info}`)
          console.log(res)
          return res.json()})
        .then(
          function(entries) {
              console.log(entries)
              setThisStat(entries);
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
                {Object.keys(thisStat).length > 0 &&
                <div>
                    { 
                      Object.keys(thisStat).map(key => <span>{key.toUpperCase()} {thisStat[key]}</span>)
                    }
                </div>}
            </div>
        </div>
    );
}

export default PokeDetailPlus;


/**
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
 */