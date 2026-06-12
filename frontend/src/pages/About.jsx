import React, { useState } from 'react';

const historyData = [
  {
    year: '2024',
    subtitle: 'IN TUNE WITH THE ENVIRONMENT',
    img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=700&q=80',
    desc: 'Introducing The JBL Clip 4 And Go 3 In An Eco-Friendly Material Made From 90% Post-Consumer Recycled Plastic. It’s Part Of Our Ongoing Plan To Redesign Our Products And Packaging As We Move Towards Becoming Carbon Neutral.',
  },
  {
    year: '2018',
    subtitle: 'BORN TO BE WIRELESS',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80',
    desc: 'JBL Launched A Whole Range Of Wireless Headphones And Speakers, Setting New Standards For Bluetooth Audio And Truly Liberating Sound From The Tether Of Cables.',
  },
  {
    year: '1946',
    subtitle: 'THE BEGINNING',
    img: 'https://images.unsplash.com/photo-1558379850-8b3acc8a4cce?w=700&q=80',
    desc: 'James B. Lansing Founded JBL With A Commitment To Quality Sound. From Hollywood Cinemas To Music Festivals, JBL Has Powered Performances For Over 75 Years.',
  },
];

const offerTabs = [
  { key: 'bluetooth', label: 'Bluetooth', title: 'BLUETOOTH SPEAKER', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=80' },
  { key: 'headphones', label: 'Headphones', title: 'PREMIUM HEADPHONES', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80' },
  { key: 'gaming', label: 'Gaming', title: 'GAMING HEADSETS', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=700&q=80' },
  { key: 'home', label: 'Home', title: 'HOME AUDIO', img: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=700&q=80' },
  { key: 'specialty', label: 'Specialty', title: 'SPECIALTY AUDIO', img: 'https://images.unsplash.com/photo-1558379850-8b3acc8a4cce?w=700&q=80' },
  { key: 'car', label: 'Car', title: 'CAR AUDIO', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&q=80' },
  { key: 'toyota', label: 'Toyota', title: 'TOYOTA AUDIO', img: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=700&q=80' },
];

const About = () => {
  const [hIndex, setHIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('bluetooth');
  const current = historyData[hIndex];
  const offer = offerTabs.find((t) => t.key === activeTab);

  return (
    <div data-testid="about-page">
      {/* About hero banner */}
      <section className="about-hero" data-testid="about-hero">
        <div className="about-hero-content">
          <h1>ABOUT US</h1>
          <p>Discover high-quality Bluetooth headphones and speakers designed to deliver powerful sound and seamless connectivity</p>
          <div className="about-breadcrumb"><a href="/">Home Page</a><span>›</span>About Us</div>
        </div>
      </section>

      {/* Find your true sound */}
      <section className="find-sound" data-testid="find-sound">
        <div className="find-sound-container">
          <h2 className="find-sound-title">FIND<br/>YOUR<br/><span>TRUE</span>SOUND</h2>
          <p className="find-sound-text">
            JBL Has Always Believed That Sound Should Be An Open Stage.
            A Place Of Free Expression Where Voices Are Heard, Without Restrictions,
            Without Limitations. That's Why We Surface And Celebrate The Unfiltered
            Self-Expression Of Courageous Artists, Creators, And Performers. JBL Is
            Here To Help You Express Your True Self, So You Can Experience The Joy
            And Excitement Of Being You.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="our-history" data-testid="our-history">
        <h2>OUR HISTORY</h2>
        <h3>75 YEARS OF JBL SOUND</h3>
        <div className="history-slider">
          <button
            className="slider-arrow"
            onClick={() => setHIndex((hIndex - 1 + historyData.length) % historyData.length)}
            data-testid="history-prev"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <img src={current.img} alt={current.subtitle} className="history-img" />
          <button
            className="slider-arrow"
            onClick={() => setHIndex((hIndex + 1) % historyData.length)}
            data-testid="history-next"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="history-year" data-testid="history-year">{current.year}</div>
        <div className="history-subtitle">{current.subtitle}</div>
        <p className="history-desc">{current.desc}</p>
      </section>

      {/* What we offer */}
      <section className="what-we-offer" data-testid="what-we-offer">
        <h2>WHAT WE OFFER</h2>
        <p className="subtitle">Any Way You Want To Listen, We Got You.</p>
        <div className="offer-tabs">
          {offerTabs.map((t) => (
            <button
              key={t.key}
              className={`offer-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
              data-testid={`offer-tab-${t.key}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="offer-content">
          <div>
            <h3>{offer.title}</h3>
            <p>Lorem  Experience deep bass and crystal clear sound with JBL's flagship lineup designed for every mood.</p>
            <a href="#" className="btn-learn">Learn More</a>
          </div>
          <img src={offer.img} alt={offer.title} />
        </div>
      </section>
    </div>
  );
};

export default About;
