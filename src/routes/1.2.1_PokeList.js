import React, { useState, useEffect } from 'react';
import { NavLink, Link, useOutletContext } from 'react-router-dom';
import { Button, Layout, Card, Row, Col, Input, Space, Spin } from 'antd';
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

const nothingStyleDefault = { display: "none" }

function PokeList() {
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult] = useOutletContext()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [allPokemon, setAllPokemon] = useState([])
    const [images, setImages] = useState([]);
    const [nothingStyle, setNothingStyle] = useState(nothingStyleDefault);

    const getData = () => {
        setLoading(true);
        fetch('https://pokefight-server.onrender.com/pokemon') // when deploying locally 'http://localhost:4620/pokemon'
            .then((res) => res.json())
            .then(
                function (entries) {
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
        getData()
        setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }, { title: <NavLink to='/pokedex'>Pokedex</NavLink> }])
    }, [])

    function onSearch(e) {
        if (e) {
            console.log(e)
            let found = [allPokemon.find(i => e.toLowerCase() === i?.name.english.toLowerCase())];
            console.log(found)
            found[0] == undefined ? setNothingStyle({ display: "block" }) : setNothingStyle({ display: "none" })
            return found[0] != undefined ? setAllPokemon(found) : getData();
        } else {
            setNothingStyle({ display: "none" })
            return getData()
        }
    }

    function onAdd(event) {
        event.preventDefault()
        console.log(event.currentTarget.getAttribute('id'))
        let el = allPokemon.find(i => i?.name?.english == event.currentTarget.getAttribute('id'))
        if (fighters.length >= 2 || event.currentTarget == null) return
        return setFighters(prev => [...prev, el])
    }

    function onDelete(event) {
        event.preventDefault();
        let el = allPokemon.find(i => i?.name?.english == event.currentTarget.getAttribute('id'))
        console.log(el);
        if (fighters.length <= 0) return
        if (fighters[0] == fighters[1]) return setFighters([fighters[0]])
        return setFighters(prev => prev.filter(e => e != el))
    }

    return (
        <Content style={{ height: "100%" }}>
            <Layout style={{ width: '100%', position: 'relative', height: "100%" }}>
                <Space direction="vertical" size="middle" style={searchBarStyle}>
                    <Search placeholder="pokemon name" onSearch={onSearch} />
                </Space>
                <Row style={{ margin: "4rem 0 0 0", height: "100%", overflow: "scroll" }}>
                    <Col className="gutter-row" span={10} offset={7}>
                        <div style={nothingStyle}>Nothing found.</div>
                        {allPokemon.length > 0 && allPokemon[0] != undefined && allPokemon.map((e, i) =>
                            <div className="card" id={e?.name?.english}>
                                <Link to={`/pokedex/${e?.id}`} >
                                    <Card
                                        cover={<img alt={e?.name?.english} src={images?.find(img => img.id == e?.id)?.url} />}
                                        title={
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span>{e?.name?.english}</span>
                                                <div>
                                                    {fighters.length < 2 && fighters.length >= 0 && <Button id={e?.name?.english} onClick={onAdd} type="primary" shape="circle" size="small"><PlusOutlined /></Button>}
                                                    {fighters.length > 0 && fighters.includes(e) && <Button id={e?.name?.english} style={{ fontWeight: "bold", marginLeft: "1rem" }} onClick={onDelete} shape="circle" size="small" danger><CloseOutlined /></Button>}
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