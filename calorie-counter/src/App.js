import { useState } from "react";

import "./Header/default.css";
import "./TodayCard/today-card.css";
import "./Cards/meal-card.css";
import "./LogHistory/loghistory.css";
import "./SearchFood/searchfood.css";
/*import "./SearchModal/search-modal.css";*/

import Header from "./Header/header";
import TodayCard from "./TodayCard/TodayCard";
import MealCard from "./Cards/MealCard";
import NoResult from "./NoResult";
import LogHistory from "./LogHistory/LogHistory";
import SearchFood from "./SearchFood/SearchFood";
/*import SearchModal from "./SearchModal/SearchModal";*/

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isLoggingFood, setIsLoggingFood] = useState(false);
  const [logHistory, setLogHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);

  console.log(searchQuery);
  return (
    <>
      <Header
        isCustomizing={isCustomizing}
        setIsCustomizing={setIsCustomizing}
        isLoggingFood={isLoggingFood}
        setSearchQuery={setSearchQuery}
      />
      {!isLoggingFood && (
        <Section
          isCustomizing={isCustomizing}
          setIsCustomizing={setIsCustomizing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoggingFood={isLoggingFood}
          setIsLoggingFood={setIsLoggingFood}
        />
      )}
      {isLoggingFood &&
        !isCustomizing &&
        !searchQuery &&
        logHistory?.length === 0 && <NoResult />}
      {isLoggingFood &&
        !isCustomizing &&
        !searchQuery &&
        logHistory?.length > 0 && <LogHistory logHistory={logHistory} />}
      {isLoggingFood && !isCustomizing && searchQuery && (
        <SearchFood searchQuery={searchQuery} />
      )}
    </>
  );
}

function Section({
  isCustomizing,
  setIsCustomizing,
  isModalOpen,
  setIsModalOpen,
  isLoggingFood,
  setIsLoggingFood,
}) {
  return (
    <>
      <section className="flex flex-col">
        <TodayCard />
      </section>
      <section className="meals">
        <MealCard
          type={"Snack"}
          isCustomizing={isCustomizing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoggingFood={isLoggingFood}
          setIsLoggingFood={setIsLoggingFood}
        />
        <MealCard
          type={"Breakfast"}
          isCustomizing={isCustomizing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoggingFood={isLoggingFood}
          setIsLoggingFood={setIsLoggingFood}
        />
        <MealCard
          type={"Lunch"}
          isCustomizing={isCustomizing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoggingFood={isLoggingFood}
          setIsLoggingFood={setIsLoggingFood}
        />
        <MealCard
          type={"Select Color"}
          isCustomizing={isCustomizing}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isLoggingFood={isLoggingFood}
          setIsLoggingFood={setIsLoggingFood}
        />
      </section>
      {!isCustomizing && (
        <button
          className="customize-btn flex"
          onClick={() => setIsCustomizing(!isCustomizing)}
        >
          <span class="material-icons">edit</span>Customize
        </button>
      )}
    </>
  );
}
