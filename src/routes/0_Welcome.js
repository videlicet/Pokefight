import React, { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useMatches } from 'react-router-dom'
import { Breadcrumb, Button, ConfigProvider, Layout, Space, theme, Typography} from 'antd'
import '../App.css'

const { Title } = Typography
const { Footer, Header, Content, Sider } = Layout


const topLayoutStyle = { 
  border: '14px solid black',
  borderRadius: '65px',
  overflow: 'hidden'
}

const midLayoutStyle = { 

}

const headerStyle = {
  margin: '0',
  height: '13rem',
  backgroundColor: "rgb(206, 34, 17)"
}

const siderStyle = {
  padding: '2rem',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgb(10, 40, 95)',
};

const footerStyle = {
  backgroundColor: "rgb(206, 34, 17)",
}

function Welcome() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('Pokedex')
    const [fighters, setFighters] = useState([]);
    const [crumbs, setCrumbs] = useState([])

    return (

      <Layout style={topLayoutStyle}>
          <Header style={headerStyle}>
            <Title style={{margin: "0"}}><NavLink className="title" to="/">Pokefight</NavLink></Title>
              <h2>{title}</h2>
            <Breadcrumb items={crumbs}/>
          </Header>
          <Layout style={midLayoutStyle}>
            <Sider className="fight-list" style={siderStyle} width='20%'>
              <h2>Your fighters:</h2>
              {fighters.length > 0 && fighters.map((e, index) => <div className='fighter' key={index}>{e.name.english}</div>)}
              {fighters.length == 2 && <Button > <NavLink to='pokefight'>FIGHT!</NavLink></Button>}
            </Sider>
            <Content style={{overflow: 'hidden'}}>
                <Outlet context={[setTitle, fighters, setFighters, setCrumbs]}/>
            </Content>
          </Layout>    
          <Footer style={footerStyle}>
            About
          </Footer>
      </Layout>

    );
}

export default Welcome;

