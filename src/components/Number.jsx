import { useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
const Number = (props) => {
    const {appSettings} = useContext(GlobalContext);
    const renderContent = () => {
    switch (appSettings.keysType) {
        case "COLORS":
            return <div className="color"  style={{width:appSettings.fontSize, height:appSettings.fontSize, borderRadius:"50%" ,backgroundColor: appSettings.colors[props.value], marginLeft:"25%"}}/>;
        case "SYMBOLS":
            return <svg viewBox={appSettings.symbolsBackground[props.value].viewBox} style={{marginLeft:"25%"}}                width={appSettings.fontSize} height={appSettings.fontSize} 
                fill={appSettings.colors[props.value]}> {/*//appSettings.fontColor}>*/}
                <path d={appSettings.symbolsBackground[props.value].path} />
                </svg>
        case "LETTERS":
            return <p style={{fontSize: appSettings.fontSize, color:appSettings.fontColor,
                 margin: 0, padding: 0, lineHeight: 1, alignItems:"center"}}>{appSettings.letters[props.value]}</p>;
        default:
            return <p style={{margin: 0,padding: 0, lineHeight: 1,}}>
                {appSettings.numbers[props.value]}</p>;
        }
    };
    return (
        
            <div className='number' style={{fontSize: appSettings.fontSize, color:appSettings.fontColor, right:appSettings.numbersPosition[props.value].right , top: appSettings.numbersPosition[props.value].top, position:"absolute"}}>
              {renderContent()}
            </div>
          
    );
}
export default Number;