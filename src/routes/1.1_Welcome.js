import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import '../App.css';

function Welcome() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()

  useEffect(() => {
    setCrumbs([{ title: <NavLink to="/">Home</NavLink> }])
  }, [])

  setTitle('Welcome')

  return (
    <Row>
      <Col className="gutter-row" span={15} offset={5}>
        <div className="winner">
          <h1>Welcome!</h1>
          <p>This is Pokéfight, a small app for pokébouts!</p>
          <p>Follow these steps for your Pokéfight!</p>
          <ol>
            <li>Browse the Pokédex.</li>
            <li>Selct two Pokémon to enter the arena.</li>
            <li>Enter the arena and let your fighters compete.</li>
            <li>See the results! You may enter the fight into the Leaderboard.</li>
          </ol>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button><NavLink to="/pokedex">Go to Pokédex</NavLink></Button>
          <Button><NavLink to="/leaderboard">Show Leaderboard</NavLink></Button>
        </div>
      </Col>
    </Row>
  );
}

export default Welcome;