import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AllTimeLeaderboard = ({ show, onClose }) => {
  const players = [
    { name: 'Brandon', points: 2000 },
    { name: 'Daniel', points: 1800 },
    { name: 'Alex', points: 1700 },
    { name: 'Alex 2.0', points: 1695 },
  ];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>All Time Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Top Players of All Time</h5>
        {players.map((player, index) => (
          <div key={index} className="d-flex justify-content-between">
            <span>{player.name}</span>
            <span>{player.points} pts</span>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AllTimeLeaderboard;
