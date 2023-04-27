import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext, Outlet } from 'react-router-dom';
import {  Button, Layout } from 'antd';
import '../App.css';

const { Content, Sider } = Layout

const siderStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgb(10, 40, 95)',
  };

function Pokedex() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner] = useOutletContext()

    useEffect(() => setTitle('Pokedex'), [])

    return (
        <Layout style={{height: '100%'}}>
        <Sider className="fight-list" style={siderStyle} width='20%'>
            <h2>Your fighters:</h2>
            {fighters.length > 0 && fighters.map((e, index) => <div className='fighter' key={index}>{e.name.english}</div>)}
            {fighters.length == 2 && <Button><NavLink to='/pokefight'>FIGHT!</NavLink></Button>}
        </Sider>
        <Content style={{height: '100%'}}>
            <Outlet context={[setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner]}/>
        </Content>
      </Layout>
    );
}

export default Pokedex;
