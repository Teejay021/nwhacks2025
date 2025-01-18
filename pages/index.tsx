import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ThreeCanvas from '../components/ThreeCanvas';
import AIPanel from '../components/AIPanel';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>3D Scrolling Feature</title>
        <meta name="description" content="A Next.js app with a 3D scrolling feature and AI-generated content." />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          atom
        </h1>
        <ThreeCanvas />
        <AIPanel />
      </main>
    </div>
  );
};

export default Home;