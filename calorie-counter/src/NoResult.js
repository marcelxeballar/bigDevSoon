import noResultGIF from "../src/empty.gif";
export default function NoResult() {
  return (
    <div className="logs-result-wrapper">
      <div className="flex flex-col no-result-wrapper">
        <img src={noResultGIF} alt="No Results GIF" />
        <h2>Opps! Your bowl seems empty. </h2>
      </div>
    </div>
  );
}
