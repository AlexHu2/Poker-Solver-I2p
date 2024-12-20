import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WeeklyLeaderboard = ({ show, onClose }) => {
  const players = [
    { name: 'Brandon', points: 200 },
    { name: 'Daniel', points: 180 },
    { name: 'Alex', points: 170 },
    { name: 'Alex 2.0', points: 160 },
  ];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Weekly Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Top Players This Week</h5>
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

export default WeeklyLeaderboard;
