// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import pokerTableImg from './images/home_photo1.jpg';
import leaderboardImg from './images/home_photo2.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Welcome to Poker Puzzles!</h1>

      <Row className="mb-4 justify-content-center">
        <Col lg={10}>
          <Card className="w-100">
            <Card.Img variant="top" src={pokerTableImg} alt="Placeholder Image 1" />
            <Card.Body>
              <Card.Title>Try the puzzle</Card.Title>
              <Card.Text>
                Compete against other players on the daily puzzle.
              </Card.Text>
                <Button variant="primary" onClick={() => navigate('/daily-puzzle')}>
                  Go to Puzzle
                </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col lg={10}>
          <Card className="w-100">
            <Card.Img variant="top" src={leaderboardImg}  alt="Placeholder Image 2" />
            <Card.Body>
              <Card.Title>Leaderboard</Card.Title>
              <Card.Text>
                Check out the rankings of top players and compete to climb the leaderboard.
              </Card.Text>
                <Button variant="secondary" onClick={() => navigate('/weeklyleaderboard')}>
                  View Leaderboard
                </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="w-100 text-center">
            <Card.Body>
              <Card.Title>About Our Poker App</Card.Title>
              <Card.Text>
                Three Georgia Tech students come together to create a website to help new and experiences poker players improve through solving simple poker puzzles.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
