import React, { useState, useEffect } from 'react';
import ActionPanel from './ActionPanel';
import './PokerTable.css';
import Player from './Player';

const generateDeck = () => {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(`${rank}${suit}`);
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const PokerTable = ({ theme }) => {
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    // Initialize deck and shuffle it
    const initialDeck = shuffleDeck(generateDeck());
    setDeck(initialDeck);

    // Distribute cards to 4 players
    const playersWithCards = [];
    for (let i = 0; i < 4; i++) {
      playersWithCards.push({
        name: `Player ${i + 1}`,
        position: ['bottom', 'top', 'left', 'right'][i],
        cards: [initialDeck.pop(), initialDeck.pop()],
      });
    }
    setPlayers(playersWithCards);
  }, []);

  // Event handlers for ActionPanel buttons
  const handleFold = () => {
    console.log('Player chose to Fold');
  };

  const handleCheck = () => {
    console.log('Player chose to Check');
  };

  const handleRaiseHalfPot = () => {
    console.log('Player chose to Raise 1/2 Pot');
  };

  const handleRaiseFullPot = () => {
    console.log('Player chose to Raise Full Pot');
  };

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
        <div className="pot">3 BB</div>
        {players.map((player) => (
          <Player
            key={player.name}
            position={player.position}
            name={player.name}
            cards={player.cards}
          />
        ))}
        {/* Render the ActionPanel */}
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
