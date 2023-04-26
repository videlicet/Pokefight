import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;
const { Footer, Header, Content, Sider } = Layout;

const heaserStyle = { height: '7rem' };

const siderStyle = {
  textAlign: 'center',
  color: 'white',
  backgroundColor: '',
};


function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('Pokedex')
    const [fighters, setFighters] = useState(['a', 'b']);

    return (
        <ConfigProvider
            theme={{
          algorithm: theme.darkAlgorithm,
        }}>
            <Layout>
                <Header style={heaserStyle}><Title>Pokefight: {title}<br/></Title></Header>
                <Layout>
                  <Sider style={siderStyle}>
                    <h2>Your fighters:</h2>
                    {fighters.map(e => <div>{e}</div>)}
                  </Sider>
                  <Content>
                      <Outlet context={[setTitle, fighters, setFighters]}/>
                  </Content>
                </Layout>    
                <Footer>
                </Footer>
            </Layout>
        </ConfigProvider>
    );
}

export default AllPokes;
