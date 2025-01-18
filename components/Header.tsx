import React from 'react';
import Head from 'next/head';

const Header: React.FC = () => {
  return (
    <header>
      <Head>
        <title>3D Scrolling Feature</title>
        <meta name="description" content="A Next.js app with a 3D scrolling feature and AI-generated content." />
      </Head>
      <h1>Welcome to CosmicZoom</h1>
    </header>
  );
};

export default Header;