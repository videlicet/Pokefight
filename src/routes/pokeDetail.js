import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };

function PokeDetail() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisPokemon, setThisPokemon] = useState([])
    let { id } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}`)
        .then((res) => {
          console.log(`http://localhost:4620/pokemon/${id}`)
          console.log(res)
          return res.json()})
        .then(
          function(entries) {
              console.log(entries)
              setThisPokemon(entries[0]);
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
          {Object.keys(thisPokemon).length > 0 &&
          <Card title={thisPokemon.name.english} hoverable='true' style={style}>
            <div className="category">
              <Link to={`/pokemon/${thisPokemon.id}/name`}>Names:</Link>
              <div>{Object.keys(thisPokemon.name).map(key => <span>{key[0].toUpperCase()+key.slice(1)}: {thisPokemon.name[key]}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokemon/${thisPokemon.id}/type`}>Type:</Link>
              <div>{thisPokemon.type.map(e => <span>{e}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokemon/${thisPokemon.id}/base`}>Base:</Link>
              <div>
                <span>HP: {thisPokemon.base.HP}</span>
                <span>Attack: {thisPokemon.base.Attack}</span>
                <span>Defense: {thisPokemon.base.Defense}</span>
                <span>Sp. Attack: {thisPokemon.base['Sp. Attack']}</span>
                <span>Sp. Defense: {thisPokemon.base['Sp. Defense']}</span>
                <span>Speed: {thisPokemon.base.Speed}</span>
              </div>
            </div>
          </Card>}
        </Col>
      </Row>
    );
}

export default PokeDetail;