import React, { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const BoxButton = (props) => {
  const {  appSettings } = useContext(GlobalContext);

  const renderContent = () => {
    switch (appSettings.keysType) {
      case "COLORS":
        return <div className="color"  style={{width:appSettings.fontSize, height:appSettings.fontSize, borderRadius:"50%" ,backgroundColor: appSettings.colors[props.value], marginLeft:"18%"}}/>;
      case "SYMBOLS":
        return <svg viewBox={appSettings.symbolsBackground[props.value].viewBox} style={{marginLeft:"18%"}}  width={appSettings.fontSize} height={appSettings.fontSize} 
                fill={appSettings.fontColor}>
                <path d={appSettings.symbolsBackground[props.value].path} />
                </svg>;
      case "LETTERS":
          return <p style={{fontSize: appSettings.fontSize, color:appSettings.fontColor,
                margin: 0, padding: 0, lineHeight: 1, alignItems:"center"}}>{appSettings.letters[props.value]}</p>;
      default:
        return <p>{props.value}</p>;
    }
  };

  return (
    <div
      className={"boxButton boxButton" + props.position}
      onClick={() => props.onClick(props.value)}
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