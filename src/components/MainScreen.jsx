import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Dial from './Dial.jsx';
import BoxButton from './BoxButton.jsx';
import Number from './Number.jsx';
import { iconMap } from "../icons/shapesIcons";

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [light, setLight] = useState("off");
  const [callState, setCallState] = useState("off");
  const callStateRef = useRef(callState);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerMarginTop, setContainerMarginTop] = useState(0);
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);
  const [telephoneMarginLeft, setTelephoneMarginLeft] = useState(0);
  const [telephoneMarginTop, setTelephoneMarginTop] = useState(0);
  const [telephoneScreenWidth, setTelephoneScreenWidth] = useState(0); 
  const [telephoneScreenHeight, setTelephoneScreenHeight] = useState(0); 
  const [telephoneScreenMarginLeft, setTelephoneScreenMarginLeft] = useState(0); 
  const [telephoneScreenMarginTop, setTelephoneScreenMarginTop] = useState(0); 
  const [callingTextMarginLeft, setCallingTextMarginLeft] = useState(0); 
  const [callingTextMarginTop, setCallingTextMarginTop] = useState(0); 
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0); 
  const [lightHeight, setLightHeight] = useState(0); 
  const [lightLeft, setLightLeft] = useState(0);
  const [lightTop, setLightTop] = useState(0);
  
  const [rotationAngle, setRotationAngle] = useState(0); // Estado para la rotación
  const [softReset, setSoftReset] = useState(false); // Estado para saber si se está reiniciando el lock  
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timer, setTimer] = useState(0); 
  const callingEndedRef = useRef(false);
  const puzzleCheckedRef = useRef(false);
  const resultRef = useRef({success: false, solution: ""});
  const telephoneRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;

    let _phoneWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _phoneHeight = _phoneWidth / aspectRatio;

    let _containerWidth = _phoneWidth;
    let _containerHeight = _phoneHeight;

    let _containerMarginLeft;
    let _containerMarginTop;

    let _boxWidth;
    let _boxHeight;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;

    let _telephoneMarginLeft;
    let _telephoneMarginTop;

    let _telephoneScreenWidth;
    let _telephoneScreenHeight;
    let _telephoneScreenMarginLeft;
    let _telephoneScreenMarginTop;

    let _callingTextMarginLeft;
    let _callingTextMarginTop;

    switch(appSettings.skin){
      case "RETRO":
        _containerMarginLeft= _phoneWidth*0.265;
        _containerMarginTop= _phoneHeight * 0.265;
        _boxWidth = _phoneWidth * 0.47;
        _boxHeight = _phoneHeight * 0.47;
        _lightWidth = _phoneWidth * 0.08;
        _lightHeight = _phoneHeight * 0.08;
        _lightLeft =  _phoneWidth  * 0.285;
        _lightTop =  _phoneHeight  * 0.279;
        _telephoneMarginLeft = 0;
        _telephoneMarginTop = 0;
        break;
      case "STANDARD":
      default:
        _containerMarginLeft = _phoneWidth * 0.379;
        _containerMarginTop = _phoneHeight * 0.350;
        _boxHeight = _phoneHeight * 0.084;
        _boxWidth = _phoneWidth * 0.084;

        _lightWidth = 0;
        _lightHeight = 0;
        _lightLeft = 0;
        _lightTop =  0;
        _telephoneMarginLeft = 0;
        _telephoneMarginTop = 0;

        _telephoneScreenWidth = _boxWidth *3.5;
        _telephoneScreenHeight = _boxHeight*1.5;
        _telephoneScreenMarginLeft = _boxWidth * 4.21;
        _telephoneScreenMarginTop = _boxHeight * 2.3;

        _callingTextMarginLeft = _containerWidth * -0.05;
        _callingTextMarginTop = _containerHeight * 0.5;
        break;
    }

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setTelephoneMarginLeft(_telephoneMarginLeft);
    setTelephoneMarginTop(_telephoneMarginTop);

    setTelephoneScreenWidth(_telephoneScreenWidth);
    setTelephoneScreenHeight(_telephoneScreenHeight);
    setTelephoneScreenMarginLeft(_telephoneScreenMarginLeft);
    setTelephoneScreenMarginTop(_telephoneScreenMarginTop);

    setCallingTextMarginLeft(_callingTextMarginLeft);
    setCallingTextMarginTop(_callingTextMarginTop);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
    setLightLeft(_lightLeft);
    setLightTop(_lightTop);
  }

  useEffect(() => {
    callStateRef.current = callState;
  }, [callState])

  const checkSolution = () => {
    setProcessingSolution(true);

    if(appSettings.skin === "RETRO"){
      reset();
    }

    callingEndedRef.current = false;
    puzzleCheckedRef.current = false;

    callStateRef.current = "calling";
    setCallState("calling");
    
    const audio_calling = document.getElementById("audio_calling");
    audio_calling.play();
    audio_calling.onended = () => {
      callingEndedRef.current = true;
      afterCheckSolution();
    };

    const solution = phoneNumber.join(";");
    Utils.log("Check solution", solution);
    
    if((phoneNumber.length === appSettings.solutionLength)&&(appSettings.noLinkedPuzzles===false)){
      escapp.checkNextPuzzle(solution, {}, (success, erState) => {
        Utils.log("Check solution Escapp response", success, erState);
        puzzleCheckedRef.current = true;
        resultRef.current = {success, solution};
        afterCheckSolution();    
      });
    } else {
      puzzleCheckedRef.current = true;
      resultRef.current = {success: false, solution};
      afterCheckSolution();
    }
  }

  function afterCheckSolution(){
    if (callingEndedRef.current && puzzleCheckedRef.current) {
      afterRingbackTone();
    }
  }

  function afterRingbackTone(){
    if(callStateRef.current === "off"){
      return;
    }

    callStateRef.current = "oncall";
    setCallState("oncall");
    
    let audio;
    if(resultRef.current.success === true){
      setLight("ok");
      if(appSettings.actionAfterSolve === "PLAY_SOUND"){
        if(typeof appSettings.soundAfterSolve === "string"){
          audio = document.getElementById("audio_telephone_success");
        } else {
          audio = document.getElementById("audio_pickup");
        }
      }
    }
    
    if(typeof audio === "undefined"){
      const phoneNumberText = phoneNumber.join(";");
      const telephoneNumberData = appSettings.telephoneNumbers.find((telephoneNumber) => telephoneNumber.number === phoneNumberText);
      if (telephoneNumberData) {
        audio = document.getElementById("audio_telephone_" + phoneNumberText);
      } else {
        if(resultRef.current.success !== true){
          audio = document.getElementById("audio_wrongNumber");
          setLight("nok");
        }
      }
    }

    if(audio){
      audio.onended = () => {
        onCallEnd(resultRef.current.success,resultRef.current.solution);
      };
      audio.play();
    } else {
      let onCallEndDelay = 0;
      if((appSettings.skin === "RETRO")&&(appSettings.showLightFeedbackBoolean === true)){
        onCallEndDelay = 2000;
      }
      setTimeout(() => {
        onCallEnd(resultRef.current.success,resultRef.current.solution);
      }, onCallEndDelay);
    }
  }

  const onCallEnd = (success, solution) => {
    if(callStateRef.current === "off"){
      return;
    }
    
    if (success) {
      if(appSettings.actionAfterSolve === "SHOW_MESSAGE"){
        let dialogOptions = {escapp: false, icon: undefined};
        dialogOptions.buttons = [
          {
            "response":"continue",
            "label":I18n.getTrans("i.continue"),
          }
        ];
        escapp.displayCustomDialog("",appSettings.message,dialogOptions,function(response){
          props.onPhoneSolved(solution);
          setTimeout(() => {
            afterOnCallEnd(success);
          }, 1000);
        });
      } else {
        props.onPhoneSolved(solution);
        setTimeout(() => {
          afterOnCallEnd(success);
        }, 1000);
      }
    } else {
      afterOnCallEnd(success);
    }
  }

  const afterOnCallEnd = (success) => {
      if((success===true)&&(appSettings.disablePhoneAfterSolveBoolean===true)){
        return;
      }
      callStateRef.current = "off";
      setCallState("off");
      if(appSettings.skin !== "RETRO") reset();
      setLight("off");
      setProcessingSolution(false);
  }

  //Pone la imagen del fondo
  let backgroundImage = "";
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage = 'url("' + appSettings.background + '")';
  }

  const buttonSound = (value) => {
    let shortBeep = document.getElementById("audio_beep_"+value);
    if(shortBeep === null){
      shortBeep = document.getElementById("audio_beep");
    }
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();
  }

  const onClickButton = (value) => {
    if (processingSolution) {
      return;
    }
    buttonSound(value);
    if(phoneNumber.length >= appSettings.maxNumber) return;
    setPhoneNumber(prev => [...prev, value]);
  }

  const removeNumber = () => {
    if (processingSolution) return;
    buttonSound("delete");
    if(phoneNumber.length === 0) return;
    setPhoneNumber(prev => prev.slice(0, -1));
  }

  const onClickCallButton = () => {
    if(callState === "off"){
      return makeCall();
    } else {
      return cancelCall();
    }
  }

  const makeCall = () => {
    if ((processingSolution)||(phoneNumber.length === 0)) return;

    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();

    checkSolution();
  }

  const cancelCall = () => {
    if((resultRef.current.success === true)&&(callStateRef.current==="oncall")&&(appSettings.disablePhoneAfterSolveBoolean===true)){
      return;
    }

    callStateRef.current = "off";
    setCallState("off");
    setProcessingSolution(false);
    setLight("off");
    reset();

    document.querySelectorAll("audio").forEach(audio => {
      audio.pause();
      audio.currentTime = 0; // opcional: reinicia el audio
    });
  }

  const phoneNumberContent = useMemo(() => {
    if(phoneNumber.length === 0) return null;
    return phoneNumber.map((keyValue, i) => {
      switch(appSettings.keysType) {
        case "COLORS":
             return <div key={i} style={{
                border: "1px solid #fff",
                display: 'inline-block',
                width: '0.6em', 
                height: '0.6em', 
                borderRadius: '50%', 
                backgroundColor: keyValue,
                margin: '0 0.05em',
                verticalAlign: 'middle'
             }}/>;
        case "SYMBOLS":
          const Icon = iconMap[keyValue];
          return Icon ? (
            <Icon
              key={i}
              width={appSettings.screenPhoneSymbolFontSize}
              height={appSettings.screenPhoneSymbolFontSize}
              color={appSettings.screenPhoneNumberFontColor}
            />
          ) : null;
        case "NUMBERS":
        case "LETTERS":
        default:
            return <span key={i}>{keyValue}</span>;
      }
    });
  }, [phoneNumber]);

  const standardRender = () => {
    let imageCalling = appSettings.imageCalling;
    if (callState !== "off"){
      const phoneNumberText = phoneNumber.join(";");
      const telephoneNumberData = appSettings.telephoneNumbers.find((telephoneNumber) => telephoneNumber.number === phoneNumberText);
      if((typeof telephoneNumberData == "object")&&(typeof telephoneNumberData.avatar === "string")){
        imageCalling = telephoneNumberData.avatar;
      }
    }
    return (<>
      <div className='telephone_screen' style={{left: telephoneScreenMarginLeft, top: telephoneScreenMarginTop, width: telephoneScreenWidth, height: telephoneScreenHeight, }}>
        <div className='callingText' style={{ visibility: (callState === "calling") ? "visible" : "hidden", opacity: (callState === "calling")  ? "1" : "0",  transition: "opacity 1s, transform 1s"}} >
          <p style={{fontSize: appSettings.screenCallingTextFontSize, color: appSettings.screenCallingTextFontColor}}>{I18n.getTrans("i.calling")}<span className="dot-ellipsis"></span></p>
        </div>
        <div className='standardPhoneText' style={{fontSize: appSettings.screenPhoneNumberFontSize, color: appSettings.screenPhoneNumberFontColor}} id="telephonePhoneNumber">
          {phoneNumberContent}
        </div>
      </div>
      <div className="calling_icon" style={{ visibility: (callState !== "off") ? "visible" : "hidden", opacity: (callState !== "off") ? "1" : "0", width: (telephoneScreenWidth*0.6), height: (telephoneScreenWidth*0.6), backgroundImage: 'url("' + imageCalling + '")', transition: "opacity 1s, transform 0.5s",}} />
      <div className='phone' id='phone' style={{ width: telephoneScreenWidth, height: (containerHeight*0.50), left: containerMarginLeft, top: containerMarginTop}}>
        <div id="row1" className="row" style={{visibility: (callState === "off") ? "visible" : "hidden", top: 0}}>
          <BoxButton position={1} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={2} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={3} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row2" className="row" style={{visibility: (callState === "off") ? "visible" : "hidden", top: containerHeight*0.10}}>
          <BoxButton position={4} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={5} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={6} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row3" className="row" style={{visibility: (callState === "off") ? "visible" : "hidden", top: containerHeight*0.20}}>
          <BoxButton position={7} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={8} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={9} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row4" className="row" style={{visibility: (callState === "off") ? "visible" : "hidden", top: containerHeight*0.30}}>
          <BoxButton position={10} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={11} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={12} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row5" className="row" style={{top: containerHeight*0.42}}>
          <div
            className='boxButton callButton'
            onClick={onClickCallButton}
            style={{
              cursor: "pointer",
              width: boxWidth,
              height: boxHeight,
              backgroundImage: `url("${
                callState === "off"
                  ? appSettings.backgroundKeyCallOn
                  : appSettings.backgroundKeyCallOff
              }")`
            }}
          ></div>
          <div className='boxButton removeNumberButton' onClick={removeNumber} style={{ visibility: (callState === "off") ? "visible" : "hidden", cursor:"pointer",width: boxWidth, height: boxHeight, backgroundImage: 'url("' + appSettings.backgroundKey + '")'}}>
            <svg width={appSettings.callButonSize} height={appSettings.callButonSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.5 7H27C28.1 7 29 7.9 29 9V23C29 24.1 28.1 25 27 25H11.5C10.9 25 10.3 24.7 9.9 24.25L3 16L9.9 7.75C10.3 7.3 10.9 7 11.5 7Z" stroke="white" strokeWidth="2.4" strokeLinejoin="round" /> <path d="M15 12L22 19M22 12L15 19" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>
      <audio id="audio_beep" src={appSettings.soundBeepGeneric} preload="auto"></audio>
      <audio id="audio_beep_delete" src={appSettings.soundBeepDelete} preload="auto"></audio>
      <audio id="audio_beep_0" src={appSettings.soundsBeepsNumbers[0]} preload="auto"></audio>
      <audio id="audio_beep_1" src={appSettings.soundsBeepsNumbers[1]} preload="auto"></audio>
      <audio id="audio_beep_2" src={appSettings.soundsBeepsNumbers[2]} preload="auto"></audio>
      <audio id="audio_beep_3" src={appSettings.soundsBeepsNumbers[3]} preload="auto"></audio>
      <audio id="audio_beep_4" src={appSettings.soundsBeepsNumbers[4]} preload="auto"></audio>
      <audio id="audio_beep_5" src={appSettings.soundsBeepsNumbers[5]} preload="auto"></audio>
      <audio id="audio_beep_6" src={appSettings.soundsBeepsNumbers[6]} preload="auto"></audio>
      <audio id="audio_beep_7" src={appSettings.soundsBeepsNumbers[7]} preload="auto"></audio>
      <audio id="audio_beep_8" src={appSettings.soundsBeepsNumbers[8]} preload="auto"></audio>
      <audio id="audio_beep_9" src={appSettings.soundsBeepsNumbers[9]} preload="auto"></audio>
      </>);
  }

  useEffect(() => {
    let interval;
    if (light === "ok") {
      setTimer(0);
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [light]);


  const retroRender = () => {
    const lightVisible = appSettings.showLightFeedbackBoolean === true && (light === "off" || light === "nok" || light === "ok");
    const lightOffVisible = lightVisible && light === "off";
    const lightNokVisible = lightVisible && light === "nok";
    const lightOkVisible = lightVisible && light === "ok";

    return (
      <>
        <div className="numbersContainer" style={{ width: boxWidth, height: boxHeight }}>
          {appSettings.numbers.map((number, index) => (
            <Number key={index} value={index} containerWidth={containerWidth} />
          ))}
        </div>

        <Dial
          boxWidth={boxWidth}
          boxHeight={boxHeight}
          checking={processingSolution}
          rotationAngle={rotationAngle}
          setRotationAngle={setRotationAngle}
          softReset={softReset}
          setSoftReset={setSoftReset}
          setPhoneNumber={setPhoneNumber}
          marginLeft={containerMarginLeft}
          marginTop={containerMarginTop}
          isMouseDown={isMouseDown}
          setIsMouseDown={setIsMouseDown}
        />

        <div
          className="boxLight boxLight_off"
          style={{
            visibility: lightOffVisible ? "visible" : "hidden",
            opacity: lightOffVisible ? "1" : "0",
            width: lightWidth,
            height: lightHeight,
            backgroundImage: `url("${appSettings.imageLightOff}")`,
            left: lightLeft,
            top: lightTop,
          }}
        />

        <div
          className="boxLight boxLight_nok"
          style={{
            visibility: lightNokVisible ? "visible" : "hidden",
            opacity: lightNokVisible ? "1" : "0",
            width: lightWidth,
            height: lightHeight,
            backgroundImage: `url("${appSettings.imageLightNok}")`,
            left: lightLeft,
            top: lightTop,
          }}
        />

        <div
          className="boxLight boxLight_ok"
          style={{
            visibility: lightOkVisible ? "visible" : "hidden",
            opacity: lightOkVisible ? "1" : "0",
            width: lightWidth,
            height: lightHeight,
            backgroundImage: `url("${appSettings.imageLightOk}")`,
            left: lightLeft,
            top: lightTop,
          }}
        />
      </>
    );
  };

  const reset = () =>{
    setPhoneNumber([]);
    if (timer) {
      clearTimeout(timer); 
      setTimer(null);
    }
  }

  useEffect(() => {
    if(appSettings.skin !== "RETRO" || processingSolution || phoneNumber.length <= 0) return;

    if (timer) {
      clearTimeout(timer); 
    }
    if(!isMouseDown) {
      const newTimer = setTimeout(() => {    
        checkSolution();
        setSoftReset(true);
      }, 4500);
      setTimer(newTimer);
      Utils.log("Solution: ", phoneNumber);
    }
  }, [isMouseDown]);

  return (
    <div id="screen_main" className={`screen_content screen_content_${appSettings.keysType}`} style={{ backgroundImage: backgroundImage }}>
      <div id="telephoneContainer" className="telephoneContainer" ref={telephoneRef} 
        style={{backgroundImage: 'url('+appSettings.backgroundTelephone+')', width: containerWidth, height: containerHeight, top: telephoneMarginTop, left: telephoneMarginLeft, position:"relative" }}>
          {appSettings.skin === "STANDARD" ? standardRender() : retroRender()}
      </div>
      <audio id="audio_calling" src={appSettings.soundCalling} preload="auto"></audio>
      <audio id="audio_wrongNumber" src={appSettings.soundWrongNumber} preload="auto"></audio>
      <audio id="audio_pickup" src={appSettings.soundPickup} preload="auto"></audio>
      {appSettings.soundAfterSolve !== undefined && ( <audio id="audio_telephone_success" src={appSettings.soundAfterSolve} preload="auto" ></audio> )}
      {appSettings.telephoneNumbers && appSettings.telephoneNumbers.map((telephoneNumber, index) => (
          telephoneNumber.audio && <audio key={`telephone-audio-${index}`} id={`audio_telephone_${telephoneNumber.number}`} 
            src={telephoneNumber.audio} preload="auto"></audio> ))}
    </div>);
};

export default MainScreen;