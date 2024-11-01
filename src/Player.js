// src/components/Player.js
import React from 'react';
import './Player.css';

const Player = ({ position, name }) => {
  return (
    <div className={`player ${position}`}>
      <div className="player-name">{name}</div>
      <div className="player-chips"> 100 BB </div>
      <div className="player-cards">
        <div className="card back"></div>
        <div className="card back"></div>
      </div>
    </div>
  );
};

export default Player;
