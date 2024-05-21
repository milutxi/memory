import { useEffect, useRef, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CountDown from "./components/CountDown/CountDown";
import Confetti from "react-confetti";
import GameOver from "./components/GameOver/GameOver";

const cardImages = [
  { src: "/img/baby.png", matched: false },
  { src: "/img/cusins.png", matched: false },
  { src: "/img/elias.png", matched: false },
  { src: "/img/fingerUp.png", matched: false },
  { src: "/img/marina.png", matched: false },
  { src: "/img/nora.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showTimer, setShowTimer] = useState(false);
  const timerRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setShowConfetti(false);
    setShowTimer(true);
    setGameOver(false);
    timerRef.current && timerRef.current.reset(120 * 1000); // reset the timer state
  };
  // console.log(cards, turns)

  //handle a choice
  const handleChoice = (card) => {
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log ('those cards match')
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log('those cards do not match')
        //give some time to see if do not match
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //check if all the cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setShowConfetti(true);
      timerRef.current && timerRef.current.stop();
    }
  }, [cards]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automaticly
  useEffect(() => {
    shuffleCards();
  }, []);

  const onExpire = () => {
    console.log("Expired");
    setShowConfetti(false);
    setGameOver(true);
    setShowTimer(false);
  };

  //restart the game when you loose
  const handleRestart = () => {
    shuffleCards();
  };

  return (
    <div className="App">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
      <Header />
      {gameOver ? (
        <GameOver onRestart={handleRestart} />
      ) : (
        <div>
          <p className="text">Get the pairs before the time catch you</p>
          <section className="secondPart">
            <button onClick={shuffleCards}>New Game</button>
            <div className="timer">
              {showTimer && (
                <CountDown
                  ref={timerRef}
                  // duration={2 * 24 * 60 * 60 * 1000}, if i want longer time for future projects(2 days)
                  duration={120 * 1000}
                  onExpire={onExpire}
                />
              )}
            </div>
          </section>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turns: {turns}</p>
        </div>
      )}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
