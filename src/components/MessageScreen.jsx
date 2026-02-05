import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/message.scss';

const MessageScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [msgWidth, setMsgWidth] = useState(0);
  const [msgHeight, setMsgHeight] = useState(0);
  const [msgMarginRight, setMsgMarginRight] = useState(0);
  const [msgMarginTop, setMsgMarginTop] = useState(0);

  const [telWidth, setTelWidth] = useState(0);
  const [telHeight, setTelHeight] = useState(0);
  const [telMarginLeft, setTelMarginLeft] = useState(0);
  const [telMarginTop, setTelMarginTop] = useState(0);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _lockWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _lockHeight = _lockWidth / aspectRatio;

    let _msgWidth;
    let _msgHeight;
    let _msgMarginRight;
    let _msgMarginTop;

    let _telWidth = _lockWidth;
    let _telHeight = _lockHeight;
    let _telMarginLeft = 0;
    let _telMarginTop = 0;

    switch(appSettings.skin){
      case "RETRO":
        _msgWidth = _keypadWidth * 0.4;
        _msgHeight = _keypadHeight * 0.4;
        _msgMarginRight = 0;
        _msgMarginTop = - _keypadHeight * 0.05;

        _telWidth = _lockWidth * 0.8;
        _telHeight = _lockHeight * 0.8;
        break;
      case "FUTURISTIC":
        _msgWidth = _keypadWidth * 0.49;
        _msgHeight = _keypadHeight * 0.5;
        _msgMarginRight = _keypadWidth * 0.018;
        _msgMarginTop = _keypadHeight * 0.03;

        _telMarginLeft = _lockWidth * 0.02;
        _telMarginTop = _lockHeight * 0.001;
        _telWidth = _lockWidth * 0.25;
        _telHeight = _lockHeight * 0.61;
        break;
      default:
        //Standard skin
        _msgWidth = _keypadWidth * 0.49;
        _msgHeight = _keypadHeight * 0.5;
        _msgMarginRight = _keypadWidth * 0.018;
        _msgMarginTop = _keypadHeight * 0.03;
    }

    setMsgWidth(_msgWidth);
    setMsgHeight(_msgHeight);
    setMsgMarginRight(_msgMarginRight);
    setMsgMarginTop(_msgMarginTop);

    setTelWidth(_telWidth);
    setTelHeight(_telHeight);
    setTelMarginLeft(_telMarginLeft);
    setTelMarginTop(_telMarginTop);
  }

  let backgroundImage = 'url("' + appSettings.backgroundMessage + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    <div id="screen_message" className="screen_content" style={{ backgroundImage: backgroundImage }}>
      <div id="telephoneContainer" className="telephoneContainer" 
        style={{backgroundImage: appSettings.backgroundTelephoneMessage ? 'url('+appSettings.backgroundTelephoneMessage+')' : undefined, width: telWidth, height: telHeight, top: telMarginTop, left: telMarginLeft, position:"relative" }}>
          <div id="message_text" style={{ width: msgWidth, height: msgHeight, marginRight: msgMarginRight, marginTop: msgMarginTop }}>
            <pre>{appSettings.message}</pre>
          </div>
      <div className="message_button" onClick={() => props.submitPuzzleSolution()}>{I18n.getTrans("i.continue")}</div>
        </div>
    </div>
  );
};

export default MessageScreen;