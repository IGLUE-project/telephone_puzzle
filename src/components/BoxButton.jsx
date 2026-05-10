import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import { iconMap } from "../icons/shapesIcons";

const BoxButton = (props) => {
  const { appSettings } = useContext(GlobalContext);

  const renderContent = () => {
    switch (appSettings.keysType) {
      case "COLORS":
        return <div className="color" style={{width:appSettings.fontSize, height:appSettings.fontSize, borderRadius:"50%" ,backgroundColor: appSettings.colors[props.position-1], }}/>;
      case "SYMBOLS":
        const Icon = iconMap[appSettings.symbols[props.position-1]];
        return Icon ? (
          <Icon
            width={appSettings.fontSize}
            height={appSettings.fontSize}
            color={appSettings.fontColor}
          />
        ) : null;
      case "LETTERS":
          return <p style={{fontSize: appSettings.fontSize, color:appSettings.fontColor, margin: 0, padding: 0, lineHeight: 1, alignItems:"center"}}>{appSettings.letters[props.position-1]}</p>;
      case "NUMBERS":
      default:
        return <p>{appSettings.numbers[props.position-1]}</p>;
    }
  };

  return (
    <div
      className={"boxButton boxButton" + props.position}
      onClick={() => props.onClick(appSettings.keys[props.position-1])}
      style={{
        width: props.boxWidth,
        height: props.boxHeight,
        backgroundImage: 'url("' + appSettings.backgroundKey + '")',
      }}
    >
      <div>{renderContent()}</div>
    </div>
  );
};

export default BoxButton;