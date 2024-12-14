import { useState, useEffect } from "react";

// Norman IMG

import neilWacky from "./assets/neil.png";
import doge from "./assets/doge.png";

// Gifs
import danceGif from "./assets/dance.gif";
import budotsGif from "./assets/budots.gif";
import discoBall from "./assets/discoBall.gif";
import boogieMp3 from "./assets/boogie.mp3";
import sheeshMp3 from "./assets/sheesh.mp3";
import vineBoomMp3 from "./assets/boom.mp3";


// Pekeng pera

import twenty from "./assets/twenty.png";
import fifty from "./assets/fifty.png";
import oneHundred from "./assets/oneHundred.png";
import twoHundred from "./assets/twoHundred.png";
import fiveHundred from "./assets/fiveHundred.png";
import oneThousand from "./assets/oneThousand.png";

function App() {
  const [text, setText] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [mode, setMode] = useState("evenA");
  const [isShaking, setIsShaking] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [bonkEffect, setBonkEffect] = useState(false);
  const [audio] = useState(new Audio(boogieMp3));
  const [sheeshAudio] = useState(new Audio(sheeshMp3));
  const [vineBoomAudio] = useState(new Audio(vineBoomMp3));
  const [showNeil, setShowNeil] = useState(false);
  const [discoBuildUp, setDiscoBuildUp] = useState(0);
  const [discoMode, setDiscoMode] = useState(false);

  useEffect(() => {
    if (rainbowMode) {
      const buildUpInterval = setInterval(() => {
        setDiscoBuildUp((prev) => Math.min(prev + 1, 100));
      }, 150);

      const discoTimer = setTimeout(() => {
        setDiscoMode(true);
      }, 15000);

      return () => {
        clearInterval(buildUpInterval);
        clearTimeout(discoTimer);
        setDiscoBuildUp(0);
        setDiscoMode(false);
      };
    } else {
      setDiscoBuildUp(0);
      setDiscoMode(false);
    }
  }, [rainbowMode]);

  useEffect(() => {
    if (rainbowMode) {
      const timer = setTimeout(() => {
        setShowNeil(true);
        setTimeout(() => setShowNeil(false), 2000);
      }, 15000);

      sheeshAudio.play().catch((e) => console.log("Sheesh failed:", e));

      const vineBoomInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          vineBoomAudio.currentTime = 0;
          vineBoomAudio
            .play()
            .catch((e) => console.log("Vine boom failed:", e));
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearInterval(vineBoomInterval);
      };
    }
  }, [rainbowMode, sheeshAudio, vineBoomAudio]);

  useEffect(() => {
    if (!isMatch) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      setIsDancing(true);
      setTimeout(() => setIsDancing(false), 1000);
    }
  }, [isMatch]);

  useEffect(() => {
    if (rainbowMode) {
      audio.loop = true;
      audio.play().catch((e) => console.log("Audio play failed:", e));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [rainbowMode, audio]);

  function handleTextChange(event) {
    setText(event.target.value);
    checkPattern(event.target.value, mode);
  }

  function toggleMode() {
    setBonkEffect(true);
    setTimeout(() => setBonkEffect(false), 300);
    const newMode = mode === "evenA" ? "template" : "evenA";
    setMode(newMode);
    checkPattern(text, newMode);
  }

  function toggleRainbow() {
    setRainbowMode(!rainbowMode);
  }

  function checkPattern(text, currentMode) {
    switch (currentMode) {
      case "evenA": {
        const aCount = (text.match(/a/g) || []).length;
        setIsMatch(aCount % 2 === 0);
        break;
      }
      case "logicMoDitoJil": {
        break;
      }
      default: {
        break;
      }
    }
  }

  function getMessage() {
    if (mode === "evenA") {
      return isMatch
        ? 'The string has an even number of "a"s.'
        : 'The string does not have an even number of "a"s.';
    }
    // Lagay ka else if dito Jil for the return messages

    return "Lagay ka din pasabog";
  }

  function createFloatingElements() {
    if (!rainbowMode) return null;

    const emojis = ["😂", "💀", "🗿", "🅱️", "👌", "💯", "🔥", "⭐"];
    const moneyImages = [
      twenty,
      fifty,
      oneHundred,
      twoHundred,
      fiveHundred,
      oneThousand,
    ];
    const elements = [];

    for (let i = 0; i < 20; i++) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomRotation = Math.random() * 720 - 360;

      elements.push(
        <div
          key={`emoji-${i}`}
          className="floating-emoji"
          style={{
            left: `${randomLeft}vw`,
            animationDelay: `${randomDelay}s`,
            transform: `rotate(${randomRotation}deg)`,
          }}
        >
          {randomEmoji}
        </div>
      );
    }

    for (let i = 0; i < 15; i++) {
      const randomMoney =
        moneyImages[Math.floor(Math.random() * moneyImages.length)];
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomRotation = Math.random() * 20 - 10;
      const randomScale = 1 + Math.random() * 0.8;

      elements.push(
        <div
          key={`money-${i}`}
          className="floating-money"
          style={{
            left: `${randomLeft}vw`,
            animationDelay: `${randomDelay}s`,
            transform: `rotate(${randomRotation}deg) scale(${randomScale})`,
          }}
        >
          <img
            src={randomMoney}
            alt="Money"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    return elements;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        rainbowMode
          ? "disco-background"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      }`}
    >
      <div className="w-full max-w-md px-6">
        <div className="relative">
          {rainbowMode && (
            <>
              <div className="spinning-doge left" />
              <div className="spinning-doge right" />
            </>
          )}
          <div className={`disco-ball ${rainbowMode ? "visible" : ""}`}>
            <img src={discoBall} alt="Disco Ball" />
          </div>

          {showNeil && (
            <div className="neil-wacky">
              <img src={neilWacky} alt="Neil" />
            </div>
          )}

          {rainbowMode && createFloatingElements()}

          <div className={`gif-container left ${rainbowMode ? "visible" : ""}`}>
            <img src={danceGif} alt="Dancing figure left" />
          </div>
          <div
            className={`gif-container right ${rainbowMode ? "visible" : ""}`}
          >
            <img src={budotsGif} alt="Dancing figure right" />
          </div>

          <div
            className={`backdrop-blur-sm bg-white/80 p-8 rounded-2xl shadow-xl border border-white/50 transition-all
              ${isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""}
              ${isDancing ? "animate-[dance_0.5s_ease-in-out]" : ""}
              ${bonkEffect ? "animate-[bonk_0.3s_ease-in-out]" : ""}
              ${rainbowMode ? "animate-[rainbow_2s_linear_infinite]" : ""}`}
          >
            <h1
              className={`text-3xl font-bold mb-6 text-center ${
                rainbowMode
                  ? "rainbow-text"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              Pattern Checker (AFL)
            </h1>
            <h2>click the rainbow</h2>

            <button
              onClick={toggleRainbow}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            >
              🌈
            </button>

            <div className="flex items-center justify-center mb-6 bg-gray-100/50 p-3 rounded-xl">
              <span
                className={`mr-2 transition-colors duration-300 ${
                  mode === "evenA"
                    ? "font-semibold text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                Even A
              </span>
              <button
                onClick={toggleMode}
                className="relative inline-flex items-center h-7 rounded-full w-14 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{
                  backgroundColor: mode === "template" ? "#818CF8" : "#E2E8F0",
                }}
              >
                <span
                  className={`inline-block w-5 h-5 transform transition-transform duration-300 bg-white rounded-full shadow-md ${
                    mode === "template" ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`ml-2 transition-colors duration-300 ${
                  mode === "template"
                    ? "font-semibold text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                Case mo dito Jil
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={handleTextChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isMatch ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
            </div>

            <div
              className={`mt-6 p-4 rounded-xl text-center transition-colors duration-300 ${
                isMatch
                  ? "bg-green-100/50 text-green-700"
                  : "bg-red-100/50 text-red-700"
              }`}
            >
              {getMessage()}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        /*
        DO NOT TOUCH! VERY FRAGILE!
        */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-1deg); }
            75% { transform: translateX(5px) rotate(1deg); }
          }

          @keyframes dance {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }

          @keyframes bonk {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }

          @keyframes floatEmoji {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes floatMoney {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 0;
            }
             10% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
          }

          @keyframes spinDoge {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }


          .disco-background {
            background: ${
              discoMode
                ? `
              linear-gradient(
                45deg,
                hsl(${(Date.now() / 20) % 360}deg, 80%, 60%),
                hsl(${(Date.now() / 20 + 120) % 360}deg, 80%, 60%),
                hsl(${(Date.now() / 20 + 240) % 360}deg, 80%, 60%)
              )
            `
                : `
              linear-gradient(
                45deg,
                hsl(${(Date.now() / 50) % 360}deg, ${
                    40 + discoBuildUp * 0.4
                  }%, 50%),
                hsl(${(Date.now() / 50 + 120) % 360}deg, ${
                    40 + discoBuildUp * 0.4
                  }%, 50%),
                hsl(${(Date.now() / 50 + 240) % 360}deg, ${
                    40 + discoBuildUp * 0.4
                  }%, 50%)
              )
            `
            };
            background-size: ${discoMode ? "200% 200%" : "400% 400%"};
            animation: ${discoMode ? "discoParty 1s linear infinite" : "none"};
            transition: background 0.3s ease;
          }

          @keyframes discoParty {
            0% {
              background-position: 0% 50%;
              filter: hue-rotate(0deg);
            }
            25% {
              background-position: 100% 0%;
              filter: hue-rotate(90deg);
            }
            50% {
              background-position: 100% 50%;
              filter: hue-rotate(180deg);
            }
            75% {
              background-position: 0% 100%;
              filter: hue-rotate(270deg);
            }
            100% {
              background-position: 0% 50%;
              filter: hue-rotate(360deg);
            }
          }

          .floating-emoji {
            position: fixed;
            animation: floatEmoji 3s linear forwards;
            font-size: 2rem;
            pointer-events: none;
            z-index: 40;
          }

           .floating-money {
              position: fixed;
              animation: floatMoney 4s linear forwards;
              width: 300px;
              height: 180px;
              pointer-events: none;
              z-index: 35;
              --rotation: 0deg;
              filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
              transform-origin: 50% 100%;
           }

          .floating-money img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .spinning-doge {
            position: absolute;
            width: 150px;
            height: 150px;
            background-image: url(${doge});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            animation: spinDoge 2s linear infinite;
            opacity: 0.5;
            z-index: 30;
            pointer-events: none;
          }

          .spinning-doge.left {
            left: calc(50% - 300px);
            top: -200px;
          }

          .spinning-doge.right {
            right: calc(50% - 300px);
            top: -200px;
          }

          .rainbow-text {
            background: linear-gradient(
              45deg,
              #ff0000,
              #ff7f00,
              #ffff00,
              #00ff00,
              #0000ff,
              #4b0082,
              #8f00ff
            );
            background-size: 200% auto;
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            animation: rainbow-text 2s linear infinite;
          }

          @keyframes rainbow-text {
            to {
              background-position: 200% center;
            }
          }

          .gif-container {
            position: absolute;
            width: 500px;
            height: 500px;
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .gif-container.visible {
            opacity: 1;
          }

          .gif-container.left {
            left: -600px;
            top: 50%;
            transform: translateY(-50%);
          }

          .gif-container.right {
            right: -600px;
            top: 50%;
            transform: translateY(-50%);
          }

          .gif-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .disco-ball {
            position: absolute;
            top: -250px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          .disco-ball.visible {
            opacity: 1;
            transform: translateX(-50%) rotate(360deg);
          }

          @keyframes flyAcross {
            0% {
              transform: translateX(-100vw);
            }
            100% {
              transform: translateX(100vw);
            }
          }

          .neil-wacky {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            width: 250px;
            height: 250px;
            z-index: 50;
            animation: flyAcross 2s linear forwards;
          }

          .disco-ball img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        `}
      </style>
    </div>
  );
}

export default App;
