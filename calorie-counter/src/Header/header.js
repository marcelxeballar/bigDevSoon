import { useState, useEffect, useRef } from "react";
import logo from "./track-logo.png";

export default function Header({
  isCustomizing,
  setIsCustomizing,
  isLoggingFood,
  setSearchQuery,
}) {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 600);
  const searchEl = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 600
        ? setIsScreenSmall(true)
        : setIsScreenSmall(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="flex">
      {!isLoggingFood && <img src={logo} alt="track Logo" className="logo" />}
      {isLoggingFood && !isScreenSmall && (
        <img src={logo} alt="track Logo" className="logo" />
      )}
      {isCustomizing && (
        <button
          className="done-btn"
          onClick={() => setIsCustomizing(!isCustomizing)}
        >
          Done
        </button>
      )}
      {isLoggingFood && (
        <>
          <label className="searchbar-wrapper flex enter">
            <input
              type="text"
              placeholder="Search by keyword"
              ref={searchEl}
              onKeyDown={(e) =>
                e.key === "Enter" && setSearchQuery(searchEl.current.value)
              }
            />
            <button
              className="searchfood-btn flex"
              onClick={() => setSearchQuery(searchEl.current.value)}
            >
              <span class="material-icons">search</span>
            </button>
          </label>

          <button className="manual-log-btn-big flex enter">Add Food</button>
          <button className="manual-log-btn-medium flex enter">Add</button>
          {isScreenSmall && (
            <button className="manual-log-btn-small flex enter">
              <span class="material-icons ">add</span>
            </button>
          )}
        </>
      )}
    </header>
  );
}
