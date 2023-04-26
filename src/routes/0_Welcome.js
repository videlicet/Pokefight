import React, { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useMatches } from 'react-router-dom'
import { Breadcrumb, Button, ConfigProvider, Layout, Space, theme, Typography} from 'antd'
import '../App.css'

const { Title } = Typography
const { Footer, Header, Content, Sider } = Layout

const headerStyle = { height: '10rem', borderRadius:"50px"}

const siderStyle = {
  textAlign: 'center',
  color: 'white',
  backgroundColor: '',
};

const crumbs =  [
  { title: <NavLink to='/'>Home</NavLink> },
  { title: <NavLink to='/'>Pokemon</NavLink> },
  { title: <NavLink to='/'>Home</NavLink> },
  { title: <NavLink to='/'>Home</NavLink>}
]


function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('Pokedex')
    const [fighters, setFighters] = useState([]);
    const matches = useMatches()
    

    console.log(matches)

    return (
        <ConfigProvider 
            theme={{
          algorithm: theme.darkAlgorithm,
        }}>
            <Layout style={{height:"100vh"}}>
                <Header style={headerStyle}>
                  <Title>Pokefight: {title}<br/>{matches.id}</Title>
                  <Breadcrumb items={crumbs}/>
                </Header>
                <Layout>
                  <Sider style={siderStyle} width='30rem'>
                    <h2>Your fighters:</h2>
                    {fighters.length > 0 && fighters.map((e, index) => <div key={index}>{e.name.english}</div>)}
                    {fighters.length == 2 && <Button > <NavLink to='pokefight'>FIGHT!</NavLink></Button>}
                  </Sider>
                  <Content>
                      <Outlet context={[setTitle, fighters, setFighters]}/>
                  </Content>
                </Layout>    
                <Footer>
                  About
                </Footer>
            </Layout>
        </ConfigProvider>
    );
}

export default AllPokes;


//href='http://localhost:3000/pokefight'