import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import { Footer, Header, Content } from 'antd/es/layout/layout.js';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };


function AllPokes() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    return (
        <ConfigProvider
            theme={{
          algorithm: theme.darkAlgorithm,
        }}>
            <Layout>
                <Header><Title>All the pokemon<br/></Title></Header>
                <Content>
                    <Outlet/>
                </Content>
                <Footer>           
                </Footer>
            </Layout>
        </ConfigProvider>
    );
}

export default AllPokes;
