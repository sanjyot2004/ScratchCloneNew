import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  shiftSprite,
  turnSprite,
  exchangeAnimations,
} from "../redux/spritesSlice";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const spriteList = useSelector((state) => state.sprites.sprites);

  const handleShift = (identifier) => {
    dispatch(shiftSprite({ identifier, steps: 10 }));
  };

  const handleTurn = (identifier) => {
    dispatch(turnSprite({ identifier, degrees: 15 }));
  };

  const handleExchangeAnimations = () => {
    if (spriteList.length >= 2) {
      dispatch(
        exchangeAnimations({
          sprite1Id: spriteList[0].id,
          sprite2Id: spriteList[1].id,
        })
      );
    }
  };

  return (
    <div className="control-panel flex space-x-4">
      {spriteList.map((sprite) => (
        <div key={sprite.id}>
          <button
            onClick={() => handleShift(sprite.id)}
            className="bg-green-500 px-2 py-1"
          >
            Shift Sprite {sprite.id}
          </button>
          <button
            onClick={() => handleTurn(sprite.id)}
            className="bg-blue-500 px-2 py-1"
          >
            Turn Sprite {sprite.id}
          </button>
        </div>
      ))}
      <button
        onClick={handleExchangeAnimations}
        className="bg-red-500 px-2 py-1"
      >
        Exchange Animations
      </button>
    </div>
  );
};

export default ControlPanel;
