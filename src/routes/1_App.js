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

const footerStyle = {
  backgroundColor: "rgb(206, 34, 17)"
}

function App() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('Pokedex')
    const [fighters, setFighters] = useState([]);
    const [crumbs, setCrumbs] = useState([])
    const [winner, setWinner] = useState([])



    return (

      <Layout style={topLayoutStyle}>
          <Header style={headerStyle}>
            <Title style={{margin: "0"}}><NavLink className="title" to="/">Pokefight</NavLink></Title>
              <h2>{title}</h2>
            <Breadcrumb items={crumbs}/>
          </Header>
          <Layout style={midLayoutStyle}>
            <Outlet context={[setTitle, fighters, setFighters, setCrumbs, winner, setWinner]}/>
          </Layout>    
          <Footer style={footerStyle}>
            <NavLink to='about' className='title'>About</NavLink>
          </Footer>
      </Layout>

    );
}

export default App;
