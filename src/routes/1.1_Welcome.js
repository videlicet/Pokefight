import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '1rem 0' };

function Welcome() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner] = useOutletContext()

    useEffect(() => {
      setCrumbs([{ title: <NavLink to="/">Home</NavLink> }])
    }, [])

    return (
      <Row>
        <Col className="gutter-row" span={15} offset={5}>
          <div className="winner">
            <h1>Welcome! This is Pokéfight, a small app for pokébouts!</h1>
            <p>Select two Pokémon from the Pokedex and let them fight.</p>
            <Button><NavLink to="/pokedex">Go to Pokédex</NavLink></Button>
            <Button><NavLink to="/leaderboard">Show Leaderboard</NavLink></Button>       
          </div>
        </Col>
      </Row>
    );
}

export default Welcome;