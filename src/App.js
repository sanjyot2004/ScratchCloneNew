import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import CharacterPreview from "./components/SpriteScratch";

export default function App() {
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen flex flex-row overflow-hidden">
        {/* Main workspace area */}
        <div className="flex-1 h-screen flex flex-row overflow-hidden bg-white border-t border-r border-gray-200 rounded-tr-xl ">
          <Sidebar />
         <MidArea />
        </div>
        {/* Preview section */}
        <div className="w-1/3 h-screen flex flex-row overflow-hidden bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        
        </div>
      </div>
    </div>
  );
}
