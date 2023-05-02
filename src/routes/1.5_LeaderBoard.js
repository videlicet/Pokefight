import React, { useState, useEffect } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { Button, Layout, Row, Col, Table } from 'antd';
import '../App.css';
import URL_SERVER_DOMAIN from '../URL_SERVER_DOMAIN.js';

const { Content } = Layout

const columns = [
  {
    title: 'Winner',
    dataIndex: 'winner',
    key: 'winner'
  },
  {
    title: 'Loser',
    dataIndex: 'loser',
    key: 'loser'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
];

function Winner() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setTitle, fighters, setFighters, crumbs, setCrumbs, winner, setWinner] = useOutletContext()
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [loadingButton, setLoadingButton] = useState([]);

  const getData = () => {
    setLoading(true)
    fetch(`https://${URL_SERVER_DOMAIN}/leaderboard/`)
      .then((res) => res.json())
      .then(
        function (entries) {
          console.log('GET to SERVER')
          setLeaderBoard(entries);
        }
      )
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData()
    setTitle(`Leaderboard`)
    setCrumbs([{ title: <NavLink to='/'>Home</NavLink> }, { title: <NavLink to='/leaderboard'>Leaderboard</NavLink> }])
  }, [])

  let deleteData = {
    method: 'DELETE',
    credentials: "same-origin"
  }

  function onDeleteAll() {
    setLoading(true)
    fetch(`https://${URL_SERVER_DOMAIN}/leaderboard/clear`, deleteData)
      .then((res) => res.json())
      .then(
        console.log('DELETE to SERVER')
      )
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoadingButton((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadingButton((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        getData();
        return newLoadings;
      });
    }, 2000);
  }

  return (
    <Content style={{ height: "100%" }}>
      <Layout style={{ width: '100%', position: 'relative', height: "100%" }}>
        <Row style={{ height: "100%", overflow: "scroll" }}>
          <Col className="gutter-row" span={15} offset={5}>
            <Table className="leaderboard" dataSource={leaderBoard} columns={columns} />
            {leaderBoard.length != 0 && <Button style={{ marginTop: "1rem" }} loading={loadingButton[0]} onClick={onDeleteAll}>Clear Leaderboard</Button>}
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}

export default Winner;