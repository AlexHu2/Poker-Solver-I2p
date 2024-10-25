// src/components/PokerTable.js
import React from 'react';
import './PokerTable.css';
import Player from './Player';

const PokerTable = () => {
  return (
    <div className="table-container">
      <div className="poker-table">
        {/* Community Cards */}
        <div className="community-cards">
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>

        {/* Players */}
        <Player position="bottom" name="Player 1" />
        <Player position="top" name="Player 2" />
        <Player position="left" name="Player 3" />
        <Player position="right" name="Player 4" />

        {/* Pot */}
        <div className="pot">💰 500</div>
      </div>
    </div>
  );
};

export default PokerTable;
