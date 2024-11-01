// src/components/PokerTable.js
import React from 'react';
import './PokerTable.css';
import Player from './Player';
import ActionPanel from './ActionPanel';

const PokerTable = ({ theme }) => {
  const tableContainerColorClass = theme === 'R' ? 'red-table' : 'green-table';
  const pokerTableColorClass = theme === 'R' ? 'red-poker-table' : 'green-poker-table';

  // Event handlers
  const handleFold = () => {
    console.log('Player chose to Fold');
    // Implement fold logic
  };

  const handleCheck = () => {
    console.log('Player chose to Check');
    // Implement check logic
  };

  const handleRaiseHalfPot = () => {
    console.log('Player chose to Raise 1/2 Pot');
    // Implement raise half pot logic
  };

  const handleRaiseFullPot = () => {
    console.log('Player chose to Raise Full Pot');
    // Implement raise full pot logic
  };

  return (
    <div className={`table-container ${tableContainerColorClass}`}>
      <div className={`poker-table ${pokerTableColorClass}`}>
        <div className="community-cards">
          {/* Community cards */}
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>
        <div className="pot"> 3 BB</div>
        <Player position="bottom" name="Player 1" />
        <Player position="top" name="Player 2" />
        <Player position="left" name="Player 3" />
        <Player position="right" name="Player 4" />
        {/* HUD Component */}
        <ActionPanel
          onFold={handleFold}
          onCheck={handleCheck}
          onRaiseHalfPot={handleRaiseHalfPot}
          onRaiseFullPot={handleRaiseFullPot}
        />
      </div>
    </div>
  );
};

export default PokerTable;
