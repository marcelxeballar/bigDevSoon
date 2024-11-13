import { useEffect, useState } from "react";

const cardColors = [
  "dark-blue",
  "dark-purple",
  "dark-green",
  "dark-orange",
  "dark-pink",
  "light-blue",
  "light-purple",
  "light-green",
  "light-orange",
  "light-pink",
];

export default function MealCard({
  type,
  isCustomizing,
  isLoggingFood,
  setIsLoggingFood,
}) {
  const [isChangingColor, setIsChangingColor] = useState(false);
  const [cardColor, setCardColor] = useState(cardColors[5]);
  const [prevCardColor, setPrevCardColor] = useState(cardColor);

  useEffect(() => {
    if (!isCustomizing) {
      setIsChangingColor(false);
      setCardColor(prevCardColor);
    }
  }, [isCustomizing, prevCardColor]);

  return (
    <div
      className={`meal-card card ${isCustomizing ? "wiggle" : ""} `}
      style={{
        background: isCustomizing
          ? `var(--${cardColor})`
          : `var(--${prevCardColor})`,
      }}
    >
      {/* Meal Info */}
      {/* Meal Info */}

      {!isChangingColor && (
        <>
          <MealInfo type={type} />
          <Message />
          <AddMeal
            isCustomizing={isCustomizing}
            isChangingColor={isChangingColor}
            setIsChangingColor={setIsChangingColor}
            isLoggingFood={isLoggingFood}
            setIsLoggingFood={setIsLoggingFood}
          />
          <RemoveCard isCustomizing={isCustomizing} />
        </>
      )}

      {/* Color Changer */}
      {/* Color Changer */}
      {isChangingColor && (
        <>
          <div className={`color-changer `}>
            <h2>Select a Color</h2>
          </div>
          <div className="color-container flex">
            {cardColors.map((color) => (
              <div className="color-choice">
                <div
                  className={`color ${
                    cardColor === color ? "current-color" : ""
                  }`}
                  style={{ background: `var(--${color})` }}
                  onClick={() => {
                    setCardColor(color);
                  }}
                ></div>
              </div>
            ))}
          </div>
          <button
            className="check-btn flex"
            onClick={() => {
              setIsChangingColor(!isChangingColor);
              setPrevCardColor(cardColor);
            }}
          >
            <span class="material-icons">check</span>
          </button>
        </>
      )}
    </div>
  );
}

function MealInfo({ type }) {
  return (
    <div className="meal-info">
      <h2>{type}</h2>
      <h2 className="meal-stats">345/323</h2>
    </div>
  );
}

function Message() {
  return <p>Log to update your stats!</p>;
}

function AddMeal({
  isCustomizing,
  setIsChangingColor,
  isChangingColor,
  isLoggingFood,
  setIsLoggingFood,
}) {
  console.log(isCustomizing);
  return (
    <button
      className="add-meal-btn flex"
      onClick={() => {
        if (!isLoggingFood) {
          setIsLoggingFood(!isLoggingFood);
          scrollTop();
        }
        if (isCustomizing) {
          setIsChangingColor(!isChangingColor);
          console.log("Setting change color to opposite.");
        }
      }}
    >
      {isCustomizing ? (
        <span class="material-icons">palette</span>
      ) : (
        <span class="material-icons">add</span>
      )}
    </button>
  );
}

function RemoveCard({ isCustomizing }) {
  return (
    isCustomizing && (
      <button className="remove-card-btn flex pop-in">
        <span class="material-icons">remove</span>
      </button>
    )
  );
}

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // Smooth scroll
  });
};
