import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useOutletContext } from 'react-router-dom';
import { Button, ConfigProvider, Layout, theme, Card, Row, Col, Typography} from 'antd';
import '../App.css';

const { Title } = Typography;

const style = { margin: '3rem 0' };
const styles = { background: '#0092ff', padding: '8px 0' };


function PokeFight() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters, setCrumbs, winner, setWinner] = useOutletContext()
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

    function onFight(event) {
        event.preventDefault()
        console.log('clicked')
        let winner = fighters[0].base.HP > fighters[1].base.HP ? fighters[0]: fighters[1];
        console.log(winner)
        setWinner(winner); 
    }

    return (
    <>
        <Row justify="space-around">
            {fighters.length > 0 && fighters.map((e, index) => 
                <Col className="gutter-row" span={8} >
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
        <Row justify="center">
            <Col className="gutter-row" >
                <Button onClick={onFight}><NavLink to='/winner'>Fight it Out!</NavLink></Button>
            </Col>
        </Row>
      </>
    );
}

export default PokeFight;