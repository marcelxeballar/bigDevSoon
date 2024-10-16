import "./styles.css";
import { assets } from "./assets";
import { useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [characterAsset, setCharacterAsset] = useState({
    background: assets.background[3],
    hair: assets.hair[1],
    eye: assets.eye[1],
    nose: assets.nose[1],
    mouth: assets.mouth[1],
    accessories: assets.accessories[3],
    ear: assets.ear[1],
  });

  return (
    <>
      <header></header>
      <div className="character-generator flex-col">
        <h1>CHARACTER GENERATOR</h1>
        <CharacterMaker
          characterAsset={characterAsset}
          setCharacterAsset={setCharacterAsset}
        />
        <CharacterExport
          characterAsset={characterAsset}
          setCharacterAsset={setCharacterAsset}
        />
      </div>
    </>
  );
}

function CharacterMaker({ characterAsset, setCharacterAsset }) {
  const [lookButton, setLookButton] = useState("hair");

  const assetsKeys = Object.keys(assets);
  return (
    <div className="character-frame flex-row">
      <Character
        background={characterAsset.background}
        hair={characterAsset.hair}
        eye={characterAsset.eye}
        nose={characterAsset.nose}
        mouth={characterAsset.mouth}
        accessories={characterAsset.accessories}
        ear={characterAsset.ear}
      />
      {/* Character here on top. */}

      <div className="character-customizer flex-col">
        <h3>Customize Look</h3>
        <div className="customizer-buttons flex-row">
          {Array.from({ length: assetsKeys.length - 1 }, (_, i) => (
            <button onClick={() => setLookButton(assetsKeys[i + 1])}>
              {assetsKeys[i + 1][0].toLocaleUpperCase() +
                assetsKeys[i + 1].slice(1)}
            </button>
          ))}
        </div>
        <div className="customizer-picker flex-row">
          <CustomizerChoices
            lookButton={lookButton}
            characterAsset={characterAsset}
            setCharacterAsset={setCharacterAsset}
          />
        </div>
      </div>
    </div>
  );
}

function CharacterExport({ characterAsset, setCharacterAsset }) {
  return (
    <div className="character-export flex-row">
      <button
        onClick={() => {
          setCharacterAsset((prevAssets) => {
            return Object.keys(prevAssets).reduce((newAssets, asset) => {
              newAssets[asset] =
                assets[asset][
                  Math.floor(
                    Math.random() * Object.keys(assets[asset]).length
                  ) + 1
                ];
              return newAssets;
            }, {});
          });
        }}
      >
        Random
      </button>

      <button
        id="downlaod-character"
        onClick={() => {
          html2canvas(document.body).then((canvas) => canvas.toDataURL());
        }}
      >
        Download
      </button>
    </div>
  );
}

function CustomizerChoices({ lookButton, setCharacterAsset, characterAsset }) {
  return (
    <>
      {Object.values(assets[lookButton]).map((asset, i) => (
        <div
          className={`flex-row ${
            Object.values(characterAsset).includes(asset) ? "active" : ""
          }`}
          onClick={() =>
            setCharacterAsset((prevAssets) => ({
              ...prevAssets,
              [lookButton]: asset,
            }))
          }
        >
          {lookButton !== "background" ? (
            <img src={asset} alt={asset}></img>
          ) : (
            <div style={{ background: asset }}></div>
          )}
        </div>
      ))}
    </>
  );
}

function Character({ background, hair, eye, nose, mouth, accessories, ear }) {
  const characterParts = {
    hair,
    eye,
    nose,
    mouth,
    accessories,
    ear,
  };
  return (
    <div className="character" style={{ background }}>
      <img src={assets.body} id="body" alt="body" />
      {Object.entries(characterParts).map(([partName, partSrc]) => (
        <img key={partName} src={partSrc} alt={partName} id={partName} />
      ))}
    </div>
  );
}
