import React, { useEffect, useState } from 'react';
import styles from './AIPanel.module.css'; // Import the CSS Module

const AIPanel: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleAsk = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const res = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      setResponse(data.answer);
      console.log(data.answer);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Failed to fetch response from the server.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
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
          <div className={styles.formContent}>
            <h2>Q&A</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
            />
            <button onClick={handleAsk} disabled={isLoading}>
              {isLoading ? <div className={styles.loader}></div> : 'Ask'}
            </button>
            {response && (
              <div className={styles.response}>
                <h3>Response:</h3>
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPanel;