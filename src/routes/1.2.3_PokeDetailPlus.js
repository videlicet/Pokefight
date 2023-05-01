import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import '../App.css';

const cardStyle = { margin: '3rem 0' };

function PokeDetailPlus() {
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [name, setName] = useState('');
  const [thisStat, setThisStat] = useState([])
  let { id, info } = useParams();

  const getData = () => {
    setLoading(true);
    fetch(`https://pokefight-server.onrender.com/pokemon/${id}`) // when deploying locally `http://localhost:4620/pokemon/${id}`
      .then((res) => {
        console.log(`https://pokefight-server.onrender.com/pokemon/${id}`) // when deploying locally `http://localhost:4620/pokemon/${id}`
        console.log(res)
        return res.json()
      })
      .then(
        function (entries) {
          console.log(crumbs[3]?.title.props.to)
          if (crumbs[3]?.title.props.children !== entries[0].name.english) {
            setCrumbs(prev => [...prev.slice(0, 3), { title: <NavLink to={`http://localhost:3000/pokedex/${id}/${info}`}>{info[0].toUpperCase() + info.slice(1)}s</NavLink> }])
          }
          setTitle(`${entries[0].name.english}'s ${info}s `);
          setName(entries[0].name.english);
          setThisStat(entries[0][info]);
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
  }, [])

  return (
    <Row>
      <Col className="gutter-row" span={10} offset={8}>
        {Object.keys(thisStat).length > 0 &&
          <Link to={`/pokedex/${id}`}>
            <Card title={name} hoverable='true' style={cardStyle}>
              {
                Object.keys(thisStat).map(key => <span style={{ fontWeight: "normal" }}>{info != 'type' && key[0].toUpperCase() + key.slice(1) + ':'} {thisStat[key]}</span>)
              }
            </Card>
          </Link>
        }
      </Col>
    </Row>
  );
}

export default PokeDetailPlus;