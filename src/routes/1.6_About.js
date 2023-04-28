import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '1rem 0' };

function Welcome() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()

    useEffect(() => {
      setCrumbs([{ title: <NavLink to="/">Home</NavLink> }, { title: <NavLink to="/about">About</NavLink> }])
    }, [])

    setTitle('About')

    return (
      <Row>
        <Col className="gutter-row" span={15} offset={5}>
          <div className="winner">
            <h1>About Pokéfight</h1>
            <p>Pokéfight was built with:</p>
            <ul>
              <li>Javascript, React, HTML, CSS</li>
              <li>Node.js, Express.js, mongoose</li>
              <li>MongoDB</li>
            </ul>
            <p>Check out the <a href="https://github.com/videlicet/Pokefight.git" target="_blank">GitHub-Repo</a>.</p>
          </div>
        </Col>
      </Row>
    );
}

export default Welcome;