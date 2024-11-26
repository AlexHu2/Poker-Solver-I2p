import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DailyLeaderboard = ({ show, onClose }) => {
  const players = [
    { name: 'Daniel', points: 200 },
    { name: 'Alex', points: 180 },
    { name: 'Brandon', points: 180 },
    { name: 'Alex 2.0', points: 170 },
  ];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Daily Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Top Players Today</h5>
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

export default DailyLeaderboard;
