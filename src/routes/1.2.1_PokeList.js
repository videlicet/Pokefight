import React, { useState, useEffect } from 'react';
import { NavLink, Link, useOutletContext } from 'react-router-dom';
import { Button, Layout, Card, Row, Col, Input, Space} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import '../App.css';

const { Content } = Layout
const { Search } = Input

const searchBarStyle = { 
    width: '100%',
    backgroundColor: 'rgb(245, 245, 245)',
    position: 'absolute',
    padding: '1rem 3rem 1rem 3rem',
    zIndex: '1'
  }

const cardStyle = { margin: '0 0 1rem 0'}

function PokeList() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
    const [images, setImages] = useState([]);

    const getData = () => {
        setLoading(true);
        fetch('http://localhost:4620/pokemon')
        .then((res) => res.json())
        .then(
            function(entries) {
                entries.splice(10) // spliced for performance issues
                entries.forEach(e => {
                    const url = `https://pokeapi.co/api/v2/pokemon/${e.id}`;
                    fetch(url)
                        .then((res) => res.json())
                        .then((res) => {
                            let el = {
                                id: e.id,
                                url: res.sprites.other['official-artwork'].front_default
                            }
                            setImages(prev => ([...prev, el]))
                        })
                        .catch((e) => {
                            setError(e.message)
                        });                  
                })
                console.log('GET to SERVER')
                setAllPokemon(entries)
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
        console.log(allPokemon)
        getData()
        setCrumbs([{title: <NavLink to='/'>Home</NavLink> }, {title: <NavLink to='/pokedex'>Pokedex</NavLink> }])
    },[])   

    function onSearch(e) {
        if (e) {
            setAllPokemon([allPokemon.find(i => i.name.english.toLowerCase == e.toLowerCase)]);
        } else return getData()
    }

    function onAdd(event) {
        event.preventDefault()
        console.log(event.currentTarget.getAttribute('id'))
        let el = allPokemon.find(i => i.name.english == event.currentTarget.getAttribute('id'))
        if (fighters.length >= 2 || event.currentTarget == null) return
        return setFighters(prev => [...prev, el])
    }

    function onDelete(event) {
        event.preventDefault();
        let el = allPokemon.find(i => i.name.english == event.currentTarget.getAttribute('id'))
        console.log(el);
        if (fighters.length <= 0) return
        if (fighters[0] == fighters[1]) return setFighters([fighters[0]])    
        return setFighters(prev => prev.filter(e => e != el))
    }

    return (
        <Content style={{height: "100%"}}>
            <Layout style={{width: '100%', position: 'relative', height: "100%"}}>
                <Space direction="vertical" size="middle" style={searchBarStyle}>
                    <Search placeholder="pokemon name" onSearch={onSearch} />
                </Space>
                <Row style={{margin:"4rem 0 0 0", height: "100%", overflow: "scroll"}}>
                    <Col className="gutter-row" span={10} offset={7}>
                        {allPokemon.length > 0 && allPokemon.map((e, i) =>  
                        <div className="card" id={e.name.english}>
                            <Link to={`/pokedex/${e.id}`} >
                                <Card 
                                    cover={<img alt={e.name.english} src={images?.find(img => img.id == e.id)?.url}/>}
                                    title={ 
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <span>{e.name.english}</span>
                                        <div>
                                            {fighters.length < 2 && fighters.length >= 0 && <Button id={e.name.english} onClick={onAdd} type="primary" shape="circle" size="small"><PlusOutlined /></Button>}
                                            {fighters.length > 0 &&  fighters.includes(e)  && <Button id={e.name.english}  style={{fontWeight: "bold", marginLeft: "1rem"}} onClick={onDelete} shape="circle" size="small" danger><CloseOutlined /></Button>} 
                                        </div>
                                    </div>
                                }>
                                </Card>
                            </Link>
                        </div>
                        )}
                    </Col>
                </Row>
            </Layout>
        </Content>
    );
}

export default PokeList;


/**
      {fighters.length < 2 && fighters.length >= 0 && <Button onClick={onAdd} style={{margin: '0 1rem 2rem 0'}}>I choose you, {e.name.english}!</Button>}
                            {fighters.length > 0 &&  fighters.includes(e)  && <Button  style={{top: "2px", fontWeight: "bold", margin: '0 0 2rem 0'}} onClick={onDelete} shape="circle" danger ghost>X</Button>}


                                                                <div className="category">
                                        <span className='category-title'>Type:</span>
                                        <div>{e.type.map((e, index) => <span key={index}>{e}</span>)}</div>
                                    </div> 
                                    <div className="category">
                                        <span className='category-title'>Base:</span>
                                        <div>
                                            <span>HP: {e.base.HP}</span>
                                            <span>Attack: {e.base.Attack}</span>
                                            <span>Defense: {e.base.Defense}</span>
                                            <span>Sp. Attack: {e.base['Sp. Attack']}</span>
                                            <span>Sp. Defense: {e.base['Sp. Defense']}</span>
                                            <span>Speed: {e.base.Speed}</span>
                                        </div>
                                    </div>
 */