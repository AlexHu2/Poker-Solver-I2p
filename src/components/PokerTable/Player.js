// src/components/Player.js
import React from 'react';
import './Player.css';

const Player = ({ position, name, cards = [], stack}) => {
  // Function to determine card color based on suit
  const getCardColor = (card) => {
    if (card.includes('♠') || card.includes('♣')) {
      return 'black';
    } else if (card.includes('♥') || card.includes('♦')) {
      return 'red';
    }
    return 'transparent';
  };

  return (
    <div className={`player ${position}`}>
      <div className="player-name">{name}</div>
      <div className="player-chips"> {`${stack} BB`} </div>
      <div className="player-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card === 'back' ? 'back' : ''}`}
            style={{
              backgroundColor: card !== 'back' ? 'white' : '#1e88e5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8em',
              fontWeight: 'bold',
              border: '1px solid black',
              color: card !== 'back' ? getCardColor(card) : 'transparent',
            }}
          >
            {card !== 'back' && <span>{card}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
