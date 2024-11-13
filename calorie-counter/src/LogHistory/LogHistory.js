import NutrientIcons from "../NutrientIcons";

export default function LogHistory() {
  return (
    <div className="logs-result-wrapper">
      <div className="recent-logs-card flex">
        <div className="food-info-wrapper">
          <h2 className="food-name">
            Refil de Refrigerantes Teas sssss Refil de Refrigerantes
          </h2>
          <p>200g</p>
        </div>
        <div className="food-nutrients flex">
          <div>
            {NutrientIcons[0]} <p>232kcal</p>
          </div>
          <div>
            {NutrientIcons[1]} <p>15mg</p>
          </div>
          <div>
            {NutrientIcons[2]} <p>0.7mg</p>
          </div>
          <div>
            {NutrientIcons[3]} <p>22mg</p>
          </div>
        </div>
      </div>
      <div className="recent-logs-card"></div>
      <div className="recent-logs-card"></div>
      <div className="recent-logs-card"></div>
    </div>
  );
}
