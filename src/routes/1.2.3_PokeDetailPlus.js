import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };

function PokeDetailPlus() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [name, setName] = useState('');
    const [thisStat, setThisStat] = useState([])
    const [setTitle, fighters, setFighters, setCrumbs, winner, setWinner] = useOutletContext()
    let { id, info } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}`)
        .then((res) => {
          console.log(`http://localhost:4620/pokemon/${id}`)
          console.log(res)
          return res.json()})
        .then(
          function(entries) {
            setCrumbs(prev => [...prev, { title: <NavLink to={`http://localhost:3000/pokemon/${id}/${info}`}>{info[0].toUpperCase() + info.slice(1)}s</NavLink> }])
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
      },[])


    return (
      <Row>
        <Col className="gutter-row" span={10} offset={8}>
          {Object.keys(thisStat).length > 0 &&
          <Link to={`/pokemon/${id}`}>
            <Card title={name} hoverable='true' style={style}>
              { 
                Object.keys(thisStat).map(key => <span>{info != 'type' && key[0].toUpperCase() + key.slice(1) + ':'} {thisStat[key]}</span>)
              }
              </Card>
            </Link>
          }
        </Col>
      </Row>
    );
}

export default PokeDetailPlus;