import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // checking if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    // Add event kusteber for window resize
    window.addEventListener('resize', handleResize);

    handleResize();

    // cleanup the eventn listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <div className="App">
      <Header 
        isMobile={isMobile}
      />
      
    </div>
  );
}

export default App;
