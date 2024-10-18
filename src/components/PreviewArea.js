import React from "react";
import CharacterControls from "./SpriteControls";
import CharacterPreview from "./SpriteScratch";

export default function DisplaySection() {
  return (
    <div className="flex flex-col h-full w-full p-2">
      <CharacterPreview />
      <CharacterControls />
    </div>
  );
}
