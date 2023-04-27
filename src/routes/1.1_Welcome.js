import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '1rem 0' };

function Welcome() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisPokemon, setThisPokemon] = useState([])
    const [setTitle, fighters, setFighters, setCrumbs, winner, setWinner] = useOutletContext()
    let { id } = useParams();

    useEffect(() => {setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }])}, [])

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
              setTitle(`Details about ${entries[0].name.english}`);
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
        getData()
      },[])

    return (
      <Row>
        <Col className="gutter-row" span={15} offset={5}>
          <div className="winner">
            <h1>Welcome! This is Pokéfight, a small app for pokébouts!</h1>
            <p>Select two Pokémon from the Pokedex and let them fight.</p>
            <Button><NavLink to="/pokedex">Go to Pokédex</NavLink></Button>         
          </div>
        </Col>
      </Row>
    );
}

export default Welcome;