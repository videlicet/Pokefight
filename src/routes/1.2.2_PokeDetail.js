import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };

function PokeDetail() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisPokemon, setThisPokemon] = useState([])
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner] = useOutletContext()
    let { id } = useParams();

    const getData = () => {
        setLoading(true);
        fetch(`http://localhost:4620/pokemon/${id}`)
        .then((res) => {
          return res.json()})
        .then(
          function(entries) {
            console.log(crumbs)
              if (crumbs[2]?.title.props.children!==entries[0].name.english) {
                setCrumbs(prev =>  [prev[0], prev[1], { title: <NavLink to={`http://localhost:3000/pokedex/${id}`}>{entries[0].name.english}</NavLink>}]
                )
              }
              if (crumbs?.length > 3) {
                setCrumbs(prev => [prev[0], prev[1], prev[2]])
              }
              setTitle(`Details about ${entries[0].name.english}`);
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
        getData()
      },[])

    return (
      <Row>
        <Col className="gutter-row" span={10} offset={7}>
          {Object.keys(thisPokemon).length > 0 &&
          <Card title={thisPokemon.name.english} hoverable='true' style={style}>
            <div className="category">
              <Link to={`/pokedex/${thisPokemon.id}/name`}>Names:</Link>
              <div>{Object.keys(thisPokemon.name).map(key => <span>{key[0].toUpperCase()+key.slice(1)}: {thisPokemon.name[key]}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokedex/${thisPokemon.id}/type`}>Type:</Link>
              <div>{thisPokemon.type.map(e => <span>{e}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokedex/${thisPokemon.id}/base`}>Base:</Link>
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