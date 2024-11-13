import { useState, useEffect } from "react";

import NutrientIcons from "../NutrientIcons";
import Loader from "../Loader";
import NoResult from "../NoResult";

export default function SearchFood({ searchQuery }) {
  const API_KEY = "aMMj0WFNNEDj7YCOVwAKRYJbhBn9pVgYEjGmRjsl";

  const [queryResults, setQueryResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery === null) return;

    async function searchMeal() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery
            .split(" ")
            .map((q) => q + "%20")
            .join(
              ""
            )}&dataType=Branded&pageSize=10&pageNumber=1&sortBy=dataType.keyword&api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("An error occurred!");
        }
        const data = await res.json();
        setQueryResults(data.foods);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    }

    searchMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="logs-result-wrapper results-wrapper flex">
      {isLoading && <Loader />}
      {!isLoading && queryResults.length === 0 && <NoResult />}
      {!isLoading && (
        <>
          <DisplayResults queryResults={queryResults} />
        </>
      )}
    </div>
  );
}

function DisplayResults({ queryResults }) {
  const [currExpanded, setCurrExpanded] = useState(null);
  return queryResults.map((result, index) => (
    <FoodItem
      key={index}
      result={result}
      index={index}
      currExpanded={currExpanded}
      setCurrExpanded={setCurrExpanded}
    />
  ));
}

function FoodItem({ result, index, currExpanded, setCurrExpanded }) {
  let {
    description,
    foodNutrients,
    ingredients,
    servingSize,
    servingSizeUnit,
  } = result;

  const foodName = description
    .replace(/[, ]|[ ]|[,]/g, " ")
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");

  const newSerSizeUnit = servingSizeUnit === "mlt" ? "ml" : servingSizeUnit;

  const mainNutrients = Object.fromEntries(
    Object.entries(NutrientIcons).slice(0, 4)
  );

  const otherNutrients = Object.fromEntries(
    Object.entries(NutrientIcons).slice(5, -1)
  );

  const newFoodNutrients = foodNutrients.reduce((acc, nutrient) => {
    acc[nutrient.nutrientName] =
      nutrient.nutrientNumber + nutrient.unitName.toLowerCase();
    return acc;
  }, {});

  const newIngredients = ingredients
    .split(" ")
    .filter((w) => w !== "INGREDIENTS:")
    .join(" ")
    .split(",")
    .map((w) => w.trim())
    .map((w) => w.toLowerCase())
    .map((w, index) =>
      index === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w
    ) // Capitalize only the first word
    .join(", ");

  return (
    <div className="food-card" onClick={() => setCurrExpanded(index)}>
      <div>
        <div className="food-title flex">
          <div className="title-wrapper">
            <h2>{foodName} ·</h2> <span></span>{" "}
            <p>
              {servingSize}
              {newSerSizeUnit.toLowerCase()}
            </p>
          </div>
          <button className="log-food-btn flex">
            <span class="material-icons">add</span>
          </button>
        </div>
        <div className="flex">
          <Nurtients
            nutrientsToDisplay={mainNutrients}
            newFoodNutrients={newFoodNutrients}
          />
        </div>
        {currExpanded === index && (
          <div className="other-food-info-wrapper enter">
            <Nurtients
              nutrientsToDisplay={otherNutrients}
              newFoodNutrients={newFoodNutrients}
              classname={"otherfoods-info"}
            />
            <div className="ingredients-source-wrapper flex">
              <p className="ingredients">{newIngredients}</p>
              <p className="citation ">
                U.S. Department of Agriculture, Agricultural Research Service.
                FoodData Central, 2019.
                <a target="_blank" href="fdc.nal.usda.gov">
                  fdc.nal.usda.gov.
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Nurtients({ nutrientsToDisplay, newFoodNutrients, classname }) {
  const nutrients = Object.entries(nutrientsToDisplay);
  console.log("Nut", nutrients);

  return (
    <div
      className={`food-nutrients nutrients flex ${
        classname ? "other-food-wrapper" : ""
      }`}
    >
      {nutrients.map(([nutrient, nutrientInfo], i) => (
        <div key={i}>
          <p className="flex nutrient-name">
            {nutrientInfo.svg}
            <span>{nutrientInfo.name}</span>
          </p>
          <p className="nutrient-value">
            {newFoodNutrients[nutrient] || "N/A"}{" "}
          </p>
        </div>
      ))}
    </div>
  );
}
