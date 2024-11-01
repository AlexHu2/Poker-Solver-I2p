import React from 'react';
import './ActionPanel.css';

const ActionPanel = ({ onFold, onCheck, onRaiseHalfPot, onRaiseFullPot }) => {
  return (
    <div className="action-panel">
      <button className="action-button fold-button" onClick={onFold}>Fold</button>
      <button className="action-button check-button" onClick={onCheck}>Check</button>
      <button className="action-button raise-half-button" onClick={onRaiseHalfPot}>Raise 1/2 Pot</button>
      <button className="action-button raise-full-button" onClick={onRaiseFullPot}>Raise Full Pot</button>
    </div>
  );
};

export default ActionPanel;