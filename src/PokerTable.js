import React from 'react';
import './PokerTable.css';
import Player from './Player';

const PokerTable = ({ theme }) => {
  // Determine both the container and table color class based on the theme
  const tableContainerColorClass = theme === 'R' ? 'red-table' : 'green-table';
  const pokerTableColorClass = theme === 'R' ? 'red-poker-table' : 'green-poker-table';

  return (
    <div className={`table-container ${tableContainerColorClass}`}>
      <div className={`poker-table ${pokerTableColorClass}`}>
        <div className="community-cards">
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>
        <Player position="bottom" name="Player 1" />
        <Player position="top" name="Player 2" />
        <Player position="left" name="Player 3" />
        <Player position="right" name="Player 4" />
        <div className="pot">💰 500</div>
      </div>
    </div>
  );
};

export default PokerTable;
