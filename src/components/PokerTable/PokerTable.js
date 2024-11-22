// PokerTable.js
import React, { useState, useEffect } from 'react';
import ActionPanel from './ActionPanel';
import './PokerTable.css';
import Player from './Player';

const PokerTable = ({pokerPuzzle, initialPokerPuzzle}) => {
  // Initialize the puzzle node as state
  useEffect(() => {
    // Disable scrolling when this component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when this component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const [puzzleNode, setPuzzleNode] = useState(pokerPuzzle);

  // Generic event handler for actions
  const handleAction = (action) => {
    console.log(`Player chose to ${action}`);
    const nextNode = puzzleNode.nextActions[action];
    if (nextNode) {
      setPuzzleNode(nextNode);
    } else {
      console.warn(`Action "${action}" is not available.`);
    }
  };

  // Reset handler to restart the puzzle
  const handleReset = () => {
    setPuzzleNode(initialPokerPuzzle);
  };

  return (
    <div className="table-container">
      <div className="poker-table">
        {/* Display the puzzle description */}
        <div className="puzzle-description">
          {puzzleNode.description}
        </div>

        {/* Community Cards Component */}
        <CommunityCards cards={puzzleNode.currCards} />

        <div className="pot">{puzzleNode.potSize} BB</div>
        <Player
          position="bottom"
          name={puzzleNode.position}
          cards={puzzleNode.hand}
        />
        <Player
          position="top"
          name={puzzleNode.villainPosition}
          cards={['back', 'back']}
        />
        <Player position="left" name="Player 3" />
        <Player position="right" name="Player 4" />
        {/* Render the ActionPanel or a Reset button if game is over */}
        {Object.keys(puzzleNode.nextActions).length > 0 ? (
          <ActionPanel
            actions={puzzleNode.nextActions}
            onAction={handleAction}
          />
        ) : (
          <div className="action-panel">
            <button className="action-button reset-button" onClick={handleReset}>
              Reset Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// CommunityCards component (make it seperate eventually)
const CommunityCards = ({ cards = [] }) => {
  // Number of cards to display when no cards are present
  const DEFAULT_CARD_COUNT = 5;

  // If we have cards, display them
  if (cards.length > 0) {
    return (
      <div className="community-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.includes('♥') || card.includes('♦') ? 'red' : 'black'}`}
          >
            {card}
          </div>
        ))}
      </div>
    );
  }

  // If no cards, display card backs
  return (
    <div className="community-cards">
      {Array(DEFAULT_CARD_COUNT).fill(null).map((_, index) => (
        <div key={index} className="card back" />
      ))}
    </div>
  );
};

export default PokerTable;
