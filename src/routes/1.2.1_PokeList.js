import React, { useState, useEffect } from 'react';
import { NavLink, Link, useOutletContext, Outlet } from 'react-router-dom';
import {  Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography, Input, Space, Select} from 'antd';
import '../App.css';

const { Content, Sider } = Layout
const { Search } = Input;

const siderStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgb(10, 40, 95)',
  };

const searchBarStyle = { 
    width: '100%',
    backgroundColor: 'rgb(245, 245, 245)',
    position: 'absolute',
    padding: '1rem 3rem 1rem 3rem',
    zIndex: '1'
  }

const cardStyle = { margin: '0 0 1rem 0'};

function PokeList() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])
    const [setTitle, fighters, setFighters, setCrumbs, winner, setWinner] = useOutletContext()

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
        getData()
        setCrumbs(prev => [...prev, { title: <NavLink to='/pokedex'>Pokedex</NavLink> }])
    },[])   


    function onSearch(e) {
        setAllPokemon([allPokemon.find(i => i.name.english == e)]);
    }

    function onAdd(event) {
        event.preventDefault()
        let el = allPokemon.find(i => i.name.english == event.currentTarget.parentNode.getAttribute('id'))
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
        <Content style={{overflow: 'hidden'}}>
        <Layout style={{width: '100%', position: 'relative', height: "100%"}}>
            <Space direction="vertical" size="middle" style={searchBarStyle}>
                <Search placeholder="pokemon name" onSearch={onSearch} />
            </Space>
            <Row style={{margin:"4rem 0 0 0", overflow:"scroll", height: "100%"}}>
                <Col className="gutter-row" span={10} offset={7} style={{hight: "100px", overflow:"scroll"}}>
                    {allPokemon.length > 0 && allPokemon.map((e, index) =>  
                    <div className="card" id={e.name.english}>
                        <Link to={`/pokedex/${e.id}`} key={e.id}>
                            <Card title={e.name.english} hoverable='true' style={cardStyle}>
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
                        {fighters.length < 2 && fighters.length >= 0 && <Button onClick={onAdd} style={{margin: '0 1rem 2rem 0'}}>I choose you, {e.name.english}! {fighters.length}/2</Button>}
                        {fighters.length > 0 &&  fighters.includes(e)  && <Button onClick={onDelete} style={{margin: '0 0 2rem 0'}} >Delete from Figthers</Button>} 
                    </div>
                    )}
                </Col>
            </Row>
        </Layout>
        </Content>
      </>
    );
}

export default PokeList;
