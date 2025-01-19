import React, { useEffect, useState } from 'react';
import styles from './AIPanel.module.css'; // Import the CSS Module

const AIPanel: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAsk = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.aiPanelContainer}>
      {!isOpen && (
        <button className={styles.toggleButton} onClick={togglePanel}>
          Ask a Question
        </button>
      )}
      {isOpen && (
        <div className={styles.aiPanel}>
          <button className={styles.closeButton} onClick={togglePanel}>
            X
          </button>
          <h2>Q&A</h2>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
          />
          <button onClick={handleAsk}>Ask</button>
          {response && (
            <div className={styles.response}>
              <h3>Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIPanel;