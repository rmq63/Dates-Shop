import React from 'react';
import Hero, { TextHeroSection } from './Hero';
import MainSection from './MainSection';

const Home = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <Hero />
      </div>
      <div className="lg:hidden">
        <TextHeroSection />
      </div>
      <MainSection />
    </div>
  );
};

export default Home;
