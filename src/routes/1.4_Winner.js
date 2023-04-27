import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '1rem 0' };

function Winner() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thisPokemon, setThisPokemon] = useState([])
    const [setTitle, fighters, setFighters, setCrumbs, winner, setWinner] = useOutletContext()
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
              setCrumbs([
                { title: <NavLink to='/'>Pokedex</NavLink> }, 
                { title: <NavLink to={`http://localhost:3000/pokemon/${id}`}>{entries[0].name.english}</NavLink> 
              }])
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
        <Col className="gutter-row" span={15} offset={5}>
          <div className="winner">
            <h1>Congratulations!</h1>
            <p>{winner.name.english} won!</p>
          </div>
          {Object.keys(winner).length > 0 &&
          <Card title={winner.name.english} hoverable='true' style={style}>
            <div className="category">
              <Link to={`/pokemon/${winner.id}/name`}>Names:</Link>
              <div>{Object.keys(winner.name).map(key => <span>{key[0].toUpperCase()+key.slice(1)}: {winner.name[key]}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokemon/${winner.id}/type`}>Type:</Link>
              <div>{winner.type.map(e => <span>{e}</span>)}</div>
            </div>
            <div className="category">
              <Link to={`/pokemon/${winner.id}/base`}>Base:</Link>
              <div>
                <span>HP: {winner.base.HP}</span>
                <span>Attack: {winner.base.Attack}</span>
                <span>Defense: {winner.base.Defense}</span>
                <span>Sp. Attack: {winner.base['Sp. Attack']}</span>
                <span>Sp. Defense: {winner.base['Sp. Defense']}</span>
                <span>Speed: {winner.base.Speed}</span>
              </div>
            </div>
          </Card>}
        </Col>
      </Row>
    );
}

export default Winner;