import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Scene from '../components/Scene';
import AIPanel from '../components/AIPanel'; // Correct import for AIPanel
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.sceneContainer}>
            <Scene />
          </div>
        </div>
        <AIPanel />
      </main>
    </div>
  );
};

export default Home;