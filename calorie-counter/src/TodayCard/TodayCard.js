import { useState } from "react";

export default function AccountCard() {
  const [consumedPercent, setConsumedPercent] = useState(30);
  const [remainsPercent, setRemainsPercent] = useState(100);
  return (
    <>
      <div className="today-card card">
        <h1 className="today-title">Today</h1>
        <div className="cal-consumption">
          <div className="consumed">
            <div className="flex flex-row">
              <h2>345 </h2>
              <p>kcal</p>
            </div>
            <p>Consumed</p>
          </div>
          <div className="remains">
            <h2>342 </h2>
            <p>Remains</p>
          </div>
        </div>
        <div className="consumed-progress flex flex-row">
          <div
            className="consumed-bar"
            style={{
              width: `${consumedPercent}%`,
              borderTopRightRadius: consumedPercent < 100 ? "0" : "99rem",
              borderBottomRightRadius: consumedPercent < 100 ? "0" : "99rem",
            }}
          ></div>
          <div
            className="remains-bar"
            style={{
              width: `${100 - consumedPercent}%`,
              borderTopLeftRadius: consumedPercent === 0 ? "99rem" : "0",
              borderBottomLeftRadius: consumedPercent === 0 ? "99rem" : "0",
            }}
          ></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
