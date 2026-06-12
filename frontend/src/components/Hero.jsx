import React, { useState } from 'react';

const Hero = () => {
  const [activeDot, setActiveDot] = useState(0);
  return (
    <section className="hero" data-testid="hero-section">
      <div className="hero-wave"></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 data-testid="hero-headline">
            Just Put The Headphones On,<br/>
            And Go <span>With The Flow!</span>
          </h1>
          <p data-testid="hero-description">
            Experience JBL's Premium 3D Sound Engine. Hands-Free Calling Activated
            By Voice Assistant. Smart Ambient Aware & Talk-Thru Technology For Total
            Control Of Your Surroundings.
          </p>
          <a href="#shop" className="btn-primary" data-testid="hero-shop-btn">Shop Now</a>
        </div>
        <div className="hero-image" data-testid="hero-image">
          <img
            src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80"
            alt="JBL Headphones"
          />
        </div>
      </div>
      <div className="hero-dots" data-testid="hero-dots">
        {[0,1,2].map((i) => (
          <span
            key={i}
            className={activeDot === i ? 'active' : ''}
            onClick={() => setActiveDot(i)}
            data-testid={`hero-dot-${i}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
