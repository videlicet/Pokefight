import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {  Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography, Input, Space, Select} from 'antd';
import { Footer, Header, Content } from 'antd/es/layout/layout.js';
import '../App.css';

const { Title } = Typography;
const { Search } = Input;

const style = { margin: '3rem 0 1rem 0' };


// const options = [
//     {
//       value: 'name',
//       label: 'name',
//     },
//     {
//       value: 'type',
//       label: 'type',
//     },
//   ];


function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])
    const [setTitle, fighters, setFighters] = useOutletContext()

    const getData = () => {
        setLoading(true);
        fetch('http://localhost:4620/pokemon')
        .then((res) => res.json())
        .then(
            function(entries) {
                entries.splice(5) // spliced for performance issues
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
        setAllPokemon([allPokemon.find(i => i.name.english == e)]);
    }

    function onAdd(event) {
        event.preventDefault()
        let el = allPokemon.find(i => i.name.english == event.currentTarget.parentNode.getAttribute('id')) //event.currentTarget.parentNode.getAttribute('id')
        if (fighters.length >= 2 || event.currentTarget == null) return
        return setFighters(prev => [...prev, el])
    }

    function onDelete(event) {
        event.preventDefault();
        let el = allPokemon.find(i => i.name.english == event.currentTarget.parentNode.getAttribute('id'))
        if (fighters.length <= 0) return
        if (fighters[0] == fighters[1]) return setFighters([fighters[0]])    
        return setFighters(prev => prev.filter(e => e != el))
    }

    return (
        <>
            <Space direction="vertical" size="middle" style={{ width: '100%', padding: '1rem 3rem 0 3rem' }}>
                <Search placeholder="pokemon name" onSearch={onSearch} />
            </Space>
            <Row gutter={16}>
                <Col className="gutter-row" span={10} offset={8}>
                    {allPokemon.length > 0 && allPokemon.map((e, index) =>  
                    <div id={e.name.english}>
                        <Link to={`/pokemon/${e.id}`} key={e.id}>
                            <Card title={e.name.english} hoverable='true' style={style}>
                                <div className="category">
                                        <span>Type:</span>
                                        <div>{e.type.map((e, index) => <span key={index}>{e}</span>)}</div>
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
                        </Link>
                        {fighters.length < 2 && fighters.length >= 0 && <Button onClick={onAdd}>I choose you, {e.name.english}! {fighters.length}/2</Button>}
                        {fighters.length > 0 &&  fighters.includes(e)  && <Button onClick={onDelete} style={{margin: '0 0 0 1rem'}}>Delete from Figthers</Button>} 
                    </div>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default AllPokes;
