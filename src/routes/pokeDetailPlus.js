import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };

function PokeDetailPlus() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisStat, setThisStat] = useState([])
    let { id, info } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}/${info}`)
        .then((res) => {
          console.log(`http://localhost:4620/pokemon/${id}/${info}`)
          console.log(res)
          return res.json()})
        .then(
          function(entries) {
              console.log(entries)
              setThisStat(entries);
          }
        )
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    
      useEffect(() => {
        getData();
      },[])


    return (
      <Row gutter={16} >
        <Col className="gutter-row" span={10} offset={8}>
          {Object.keys(thisStat).length > 0 &&
          <Card title={info[0].toUpperCase()+info.slice(1)} hoverable='true' style={style}>
            { 
              Object.keys(thisStat).map(key => <span>{info != 'type' && key[0].toUpperCase() + key.slice(1)}: {thisStat[key]}</span>)
            }
            </Card>
            }
        </Col>
      </Row>
    );
}

export default PokeDetailPlus;