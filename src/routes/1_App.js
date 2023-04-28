import React, { useState, useEffect } from 'react'
import { NavLink, Outlet} from 'react-router-dom'
import { Breadcrumb, Layout, Typography} from 'antd'
import '../App.css'

const { Title } = Typography
const { Footer, Header } = Layout

const topLayoutStyle = { 
  border: '14px solid black',
  borderRadius: '65px',
  overflow: 'hidden'
}

const midLayoutStyle = { 
  hight: '100%'
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
    const [title, setTitle] = useState('Welcome')
    const [fighters, setFighters] = useState([])
    const [crumbs, setCrumbs] = useState([])
    const [result, setResult] = useState([{},{}])

    return (
      <Layout style={topLayoutStyle}>
          <Header style={headerStyle}>
            <Title style={{margin: "0"}}><NavLink className="title" to="/">Pokéfight</NavLink></Title>
              <h2>{title}</h2>
            <Breadcrumb items={crumbs}/>
          </Header>
          <Layout style={midLayoutStyle}>
            <Outlet context={[setTitle, fighters, setFighters, crumbs, setCrumbs, result, setResult]}/>
          </Layout>    
          <Footer style={footerStyle}>
            <ul className='nav'>
              <li><NavLink to='pokedex' className='title'>Pokédex</NavLink></li>
              <li><NavLink to='leaderboard' className='title'>Leaderboard</NavLink></li>
              <li><NavLink to='about' className='title'>About</NavLink></li>
            </ul>
          </Footer>
      </Layout>
    );
}

export default App;
