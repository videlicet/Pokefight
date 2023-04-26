import React, { useState, useEffect } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };

function PokeDetail() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters] = useOutletContext()
    let { id } = useParams();

    function updateTitle() {
        setTitle(`${fighters[0]?.name.english} vs. ${fighters[1]?.name.english}`);
    }

    updateTitle()
//     const getData = () => {
//         setLoading(true);
//         fetch(`http://localhost:4620/pokemon/${id}`)
//         .then((res) => {
//           console.log(`http://localhost:4620/pokemon/${id}`)
//           console.log(res)
//           return res.json()})
//         .then(
//           function(entries) {
//               console.log(entries)
//               setTitle(`Details about ${entries[0].name.english}`);
//               setThisPokemon(entries[0]);
//           }
//         )
//         .catch((e) => {
//           console.log(e.message);
//           setError(e.message);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//       }
    
//       useEffect(() => {
//         getData();
//       },[])
const styles = { background: '#0092ff', padding: '8px 0' };

    return (
    <>
        <Row gutter={16} justify="space-around">
            {fighters.length > 0 && fighters.map(e => 
                <Col className="gutter-row" span={6} >
                    <Card title={e.name.english} hoverable='true' style={style}>
                        <div className="category">
                                <span>Type:</span>
                                <div>{e.type.map((i, index) => <span key={index}>{i}</span>)}</div>
                        </div>
                        <div className="category">
                            <span>Base:</span>
                            <div>
                                <span>HP: {e.base.HP}</span>
                                <span>Attack: {e.base.Attack}</span>
                                <span>Defense: {e.base.Defense}</span>
                                <span>Sp. Attack: {e.base['Sp. Attack']}</span>
                                <span>Sp. Defense: {e.base['Sp. Defense']}</span>
                                <span>Speed: {e.base.Speed}</span>
                            </div>
                        </div>
                    </Card>
                </Col>
                )}
        </Row>
        <Row gutter={16} justify="center">
            <Col className="gutter-row" span={1} >
                <Button>Fight it Out!</Button>
            </Col>
        </Row>
      </>
    );
}

export default PokeDetail;

/*

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
*/