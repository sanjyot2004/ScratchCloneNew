import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSprite, toggleCollision } from "../redux/spritesSlice";
import { AddSprites } from "./AddSprites";
import SpriteCard from "./SpriteCard";

const SpriteControls = () => {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpriteId = spritesState.selectedSpriteId;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-4" style={{ flex: 0.2 }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <div className="flex items-center justify-between py-2 px-4 w-64 bg-white rounded-lg shadow-md">
            <label htmlFor="enableCollision" className="text-gray-700 text-sm font-medium mr-4">
              Swap Actions On Collision
            </label>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="enableCollision"
                className="opacity-0 w-0 h-0"
                checked={spritesState.showCollisionAnimation}
                onChange={(e) => {
                  // Dispatch the toggleCollision action directly without animation
                  dispatch(toggleCollision({ showCollisionAnimation: e.target.checked }));
                }}
              />
              <label
                htmlFor="enableCollision"
                className={`absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-full transition-colors duration-200 ${
                  spritesState.showCollisionAnimation ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-none ${
                    spritesState.showCollisionAnimation ? 'transform translate-x-6' : ''
                  }`}
                ></span>
              </label>
            </div>
          </div>
          <AddSprites />
        </div>
      </div>
      <div className="flex gap-4 items-start overflow-x-auto">
        {sprites.map((sprite) => (
          <SpriteCard
            key={sprite.id} // Use sprite ID as the key for better performance
            spriteName={sprite.name}
            selected={sprite.id === selectedSpriteId}
            onClick={(e) => {
              e.preventDefault();
              dispatch(selectSprite(sprite.id));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpriteControls;
