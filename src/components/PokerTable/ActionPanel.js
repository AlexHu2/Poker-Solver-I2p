// ActionPanel.js
import React from 'react';
import './ActionPanel.css';

const ActionPanel = ({ actions, onAction }) => {
  return (
    <div className="action-panel">
      {Object.keys(actions).map((action) => (
        <button
          key={action}
          className={`action-button ${action.toLowerCase().replace(/\s+/g, '-')}-button`}
          onClick={() => onAction(action)}
        >
          {action}
        </button>
      ))}
    </div>
  );
};

export default ActionPanel;
