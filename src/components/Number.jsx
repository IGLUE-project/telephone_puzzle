import { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import { iconMap } from "../icons/shapesIcons";

const Number = (props) => {
    const {appSettings} = useContext(GlobalContext);
    const numberSize = props.containerWidth * 0.042;
    const renderContent = () => {
    switch (appSettings.keysType) {
        case "COLORS":
            return <div className="color" style={{width:appSettings.fontSize, height:appSettings.fontSize, borderRadius:"50%" ,backgroundColor: appSettings.colors[props.value], }}/>;
        case "SYMBOLS":
            const Icon = iconMap[appSettings.symbols[props.value]];
            return Icon ? (
              <Icon
                width={appSettings.fontSize}
                height={appSettings.fontSize}
                color={appSettings.fontColor}
              />
            ) : null;
        case "LETTERS":
            return <p style={{fontSize: appSettings.fontSize, color:appSettings.fontColor,
                 margin: 0, padding: 0, lineHeight: 1, alignItems:"center"}}>{appSettings.letters[props.value]}</p>;
        case "NUMBERS":
        default:
            return <p style={{margin: 0,padding: 0, lineHeight: 1,}}>{appSettings.numbers[props.value]}</p>;
        }
    };

    return (
        <div className='number' style={{ height: numberSize, width: numberSize, fontSize: appSettings.fontSize, color:appSettings.fontColor, right:appSettings.numbersPosition[props.value].right , top: appSettings.numbersPosition[props.value].top, position:"absolute"}}>
          {renderContent()}
        </div>  
    );
}

export default Number;