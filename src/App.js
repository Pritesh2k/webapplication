import { useEffect, useState } from 'react';
import './App.css';
import CardNav from './Components/CardNav';
import DotGrid from './Components/DotGrid';
import TextPressure from './Components/TextPressure';
import RotatingText from './Components/RotatingText'

function App() {
  const [fadeIn, setFadeIn] = useState(false);
  const [dotGridEnabled, setDotGridEnabled] = useState(true); // new state

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <div className="App">

      <div style={{ position: 'absolute', width: '50dvw', height: '25dvh', top: '15rem', left: '25dvw', overflow: 'hidden', fontWeight: 'bold', fontSize: '2rem', color: '#333', fontStyle: 'italic' }}>
        Bali
      </div>

      <div style={{ position: 'absolute', height: '30dvh', width: '50dvw', left: '25dvw', top: '25dvh' }}>
        <TextPressure
          text="Welcome To"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#000000ff"
          strokeColor="#ff0000"
          minFontSize={36}
        />

        <div
          className="rotating-text-container"
          style={{
            
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 40px",
            borderRadius: "12px",
            marginTop: "-12rem", // spacing below PressureText
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <RotatingText
            texts={['Paradise', 'Nature', 'Bliss', 'Tranquility']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </div>
      </div>

      {/* DotGrid background */}
      {/* {dotGridEnabled && (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DotGrid
            dotSize={2}
            gap={15}
            baseColor="#474747ff"
            activeColor="#ffffffff"
            proximity={120}
            shockRadius={250}
            shockStrength={6}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      )} */}

      {/* CardNav */}
      <CardNav
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        switchOn={dotGridEnabled}               // pass current state
        onSwitchChange={setDotGridEnabled}      // pass setter
      />
    </div>
  );
}

export default App;
