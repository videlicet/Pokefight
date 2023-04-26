import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography, Input, Space, Select} from 'antd';
import { Footer, Header, Content } from 'antd/es/layout/layout.js';
import '../App.css';

const { Title } = Typography;
const { Search } = Input;

const style = { margin: '3rem 0' };

const options = [
    {
      value: 'name',
      label: 'name',
    },
    {
      value: 'type',
      label: 'type',
    },
  ];


function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])
    const [searchedPokemon, setSearchedPokemon] = useState([]);

    const getData = () => {
        setLoading(true);
        fetch('http://localhost:4620/pokemon')
        .then((res) => res.json())
        .then(
            function(entries) {
                setAllPokemon(entries);
            }
        )
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    
      useEffect(() => {
        getData();
      },[])

    function onSearch(e) {
        console.log([allPokemon.find(i => i.name.english == e)])
        setAllPokemon([allPokemon.find(i => i.name.english == e)]);
    }


    return (
        <>
            <Space direction="vertical" size="middle">
                <Space.Compact>
                    <Search placeholder="pokemon name" onSearch={onSearch} style={{ width: 200 }} />
                </Space.Compact>
            </Space>
            <Row gutter={16}>

                <Col className="gutter-row" span={10} offset={8}>
                    {allPokemon.length > 0 && allPokemon.map(e =>
                    <Link to={`/pokemon/${e.id}`} key={e.id}>
                        <Card title={e.name.english} hoverable='true' style={style}>
                        <div className="category">
                                <span>Type:</span>
                                <div>{e.type.map(e => <span>{e}</span>)}</div>
                            </div>
                            <div className="category">
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
                        </Card>
                    </Link>)}
                </Col>
            </Row>
        </>
    );
}

export default AllPokes;
