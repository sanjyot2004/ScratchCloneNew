import React from "react";
import sidebarItems, {
  controlColor,
  motionColor,
} from "../constants/sidebarBlocks";

export default function Sidebar() {
  const handleDragStart = (event, actionType, payload, text) => {
    event.dataTransfer.setData("actionType", actionType);
    event.dataTransfer.setData("text", text);
    event.dataTransfer.setData("payload", JSON.stringify(payload));
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {Object.keys(sidebarItems).map((category) => (
        <div key={category}>
          <div className="font-bold">{category}</div>
          <div>
            {sidebarItems[category].map((item, idx) => {
              let bgColor = "";
              let textColor = "";

              switch (category) {
                case "Motion":
                  bgColor = motionColor.bgColor;
                  textColor = motionColor.textColor;
                  break;
                case "Control":
                  bgColor = controlColor.bgColor;
                  textColor = controlColor.textColor;
                  break;
                default:
                  break;
              }

              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      item.type,
                      item.defaultPayload,
                      item.text
                    )
                  }
                  className={`flex flex-row ${bgColor} ${textColor} px-2 py-1 my-2 text-sm cursor-pointer`}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
