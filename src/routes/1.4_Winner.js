import React, { useState, useEffect } from 'react';
import { NavLink, Link, useOutletContext } from 'react-router-dom';
import { Button, Layout, Card, Row, Col} from 'antd';
import '../App.css';

const { Content } = Layout

const cardStyle = { margin: '1rem 0' }

function Winner() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner] = useOutletContext()

    useEffect(() => {
      setTitle(`${winner.name.english} won!`);
      setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }, { title: <NavLink to='/winner'>Winner</NavLink> }])
    }, [])

    const data = 
      {
        winner: "a",
        loser: "b",
        date: "c"
    } 
    
    var raw = JSON.stringify({
        winner: "Venusaur",
        loser: "Charmander",
        date: "today"
      });

    let fetchData = {
      method: 'POST',
      body: raw,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: "same-origin"
    }

    function onSubmit(event) {
      event.preventDefault()
      console.log('submit triggered')
      fetch('http://localhost:4620/leaderboard/save', fetchData)
      .then((res) => res.json())
      .then(
        function(entries) {
          console.log(entries.winner)
        }
      )
      .catch((e) => {
        setError(e.message);
      })
    }

    return (
      <Content style={{height: "100%"}}>
        <Layout style={{width: '100%', position: 'relative', height: "100%"}}>
          <Row style={{height: "100%", overflow: "scroll"}}>
            <Col className="gutter-row" span={15} offset={5}>
              <div className="winner">
                <h1>Congratulations!</h1>
                <p>{winner.name.english} won!</p>
              </div>
              {Object.keys(winner).length > 0 &&
              <Card title={winner.name.english} hoverable='true' style={cardStyle}>
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
              <Button onClick={onSubmit} style={{marginBottom: '2rem'}}>Submit to Leaderboard</Button>
            </Col>
          </Row>
        </Layout>
      </Content>
    );
}

export default Winner;