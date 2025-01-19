import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ThreeCanvas from '../components/ThreeCanvas';
import AIPanel from '../components/AIPanel';
import styles from '../styles/Home.module.css';
import Scene from '@/components/Scene';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          atom
        </h1>
        <ThreeCanvas />

        <AIPanel />
        <Scene />
      </main>
    </div>
  );
};

export default Home;