import React from "react";
import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div data-testid="card-inner" className={flipped ? "flipped" : ""}>
        <img
          data-testid="front-image"
          className="front"
          src={card.src}
          alt="card front"
        />
        <img
          data-testid="back-image"
          className="back"
          src="/img/bullar.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
