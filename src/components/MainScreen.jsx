import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Dial from './Dial.jsx';
import BoxButton from './BoxButton.jsx';
import Number from './Number.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [light, setLight] = useState("off");
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
  const [password, setPassword] = useState("");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const secondarySolutionRef = useRef(false); 
  const [timer, setTimer] = useState(0); 
  const callingEndedRef = useRef(false);
  const puzzleCheckedRef = useRef(false);
  const resultRef = useRef({success: false, password: ""});
 

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

    let _containerWidth = _lockWidth ;
    let _containerHeight = _lockHeight;


    let _containerMarginLeft=_lockWidth*0.313;
    let _containerMarginTop=_lockHeight * 0.315;

    let _boxWidth = _lockWidth * 0.37;
    let _boxHeight = _lockHeight * 0.37;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;

    let _telephoneMarginLeft = 0;
    let _telephoneMarginTop = 0;

    let _telephoneScreenWidth = _boxWidth *0.46;
    let _telephoneScreenHeight = _boxHeight*0.25 ;
    let _telephoneScreenMarginLeft = _boxWidth * 0.07;
    let _telephoneScreenMarginTop = _boxHeight * 0.3;

    let _callingTextMarginLeft = 0;
    let _callingTextMarginTop = 0;



    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = _lockHeight * 0.3;
        _containerMarginLeft = _lockWidth * 0.265;
        _containerWidth = _lockWidth * 0.8;
        _containerHeight = _lockHeight *0.8;
        _boxWidth = _lockWidth * 0.31;
        _boxHeight = _lockHeight * 0.31;
        _lightWidth = _lockWidth * 0.15;
        _lightHeight = _lockHeight *0.15;
        _lightLeft = _lockWidth * 0.343;
        _lightTop =  _lockHeight * 0.735;
        break;
      case "FUTURISTIC":
        _containerMarginTop = _lockHeight * -0.04;
        _containerMarginLeft = _lockWidth * 0.025;
        _telephoneMarginLeft = _lockWidth * 0.02;
        _telephoneMarginTop = _lockHeight * 0.001;
        _containerWidth = _lockWidth * 0.25;
        _containerHeight = _lockHeight *0.61;
        _lightWidth = _containerWidth;
        _lightHeight = _containerHeight*0.93;
        _lightLeft = _lockWidth * -0.014;
        _lightTop =  _lockHeight * 0.01;
        _boxHeight = _lockHeight * 0.06;
        _boxWidth = _lockWidth * 0.06;
        _callingTextMarginLeft = _containerWidth * -0.05;
        _callingTextMarginTop = _containerHeight * 0.5;

        break;
      default:
        _lightWidth = _lockWidth * 0.08;
        _lightHeight = _lockHeight * 0.08;
        _lightLeft =  _lockWidth  * 0.33;
        _lightTop =  _lockHeight  * 0.32
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



  const checkSolution = () => {
    setProcessingSolution(true);
    if(appSettings.skin!=="FUTURISTIC")reset(); 
    else setLight("on");
    callingEndedRef.current = false;
    puzzleCheckedRef.current = false;
    const solution = password.split("").join(";");
    Utils.log("Check solution", solution);
    
    const audio_calling = document.getElementById("audio_calling");
    audio_calling.play();

    const telephoneCall = appSettings.telephoneNumbers.find((telephoneNumber) => telephoneNumber.number === password);
    if (telephoneCall) {
      puzzleCheckedRef.current = true;
      resultRef.current = {success: true, solution};
      secondarySolutionRef.current = true;
      maybeProceed();
    }

    audio_calling.onended = () => {
      callingEndedRef.current = true;
      maybeProceed();
    };
    
    if(!telephoneCall) {
      if(password.length === appSettings.solutionLength){
        escapp.checkNextPuzzle(solution, {}, (success, erState) => {
              Utils.log("Check solution Escapp response", success, erState);
                try {            
                    puzzleCheckedRef.current = true;
                    resultRef.current = {success, solution};
                    maybeProceed();         
                } catch(e){
                  Utils.log("Error in checkNextPuzzle",e);
                }              
            });
      }else{
        puzzleCheckedRef.current = true;
        resultRef.current = {success: false, solution};
        maybeProceed();
      }
    }
  }

  function maybeProceed() {
    if (callingEndedRef.current && puzzleCheckedRef.current) {
      setTimeout(() => {
        secondarySolutionRef.current ? secondaryCall() : changeBoxLight(resultRef.current.success, resultRef.current.password);
      }, 700);
    }
  }

  const changeBoxLight = (success, solution) => {
    let audio;
    let post_success_audio;
    let afterChangeBoxLightDelay = 3000;
    if (success) {      
      setLight("ok");
      audio = document.getElementById("audio_success");
      if(appSettings.actionAfterSolve === "PLAY_SOUND") 
        post_success_audio = document.getElementById("audio_post_success");
    } else {
      audio = document.getElementById("audio_failure");
      setLight("nok");
      reset(); 
    }
    audio.currentTime = 0;
    setTimeout(() => {
      if(!success){
        setLight("off");
        if(appSettings.skin === "FUTURISTIC")setPassword("");
        setProcessingSolution(false);
      }
    }, afterChangeBoxLightDelay);

    if(success){
      audio.play();
      audio.onended = () => {
        if(appSettings.actionAfterSolve === "PLAY_SOUND"){
          post_success_audio.play();
          post_success_audio.onended = () => {
            props.onKeypadSolved(solution);
          };
        }else{
          props.onKeypadSolved(solution);
        }
      }
    }else
      audio.play();
  }

  const secondaryCall = () => {
    Utils.log("secondaryCall", password);
    setLight("ok");
    let audio = document.getElementById("audio_success");
    audio.play();
    audio.onended = () => {
      let calling_audio = document.getElementById("audio_telephone_" + password);
      calling_audio.play();
      calling_audio.onended = () => {
        reset();  
        setProcessingSolution(false);
        setLight("off");
      };
    }

  }

  //Pone la imagen del fondo
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  const buttonSound = (value) => {
    const shortBeep = document.getElementById("audio_beep"+value);
    shortBeep.pause();
      shortBeep.currentTime = 0;
      shortBeep.play();
  }

  const onClickButton = (value) => {
    if (processingSolution) {
      return;
    }
    buttonSound(value);
    if(password.length>=appSettings.maxNumber) return;
    setPassword(password + value);
    
    
  }

  const removeNumber = () => {
    if (processingSolution) return;
    buttonSound(0);
    if(password.length === 0) return;
    setPassword(password.slice(0, -1));
  }

  const makeCall = () => {
    if (processingSolution) return;
    
    const shortBeep = document.getElementById("audio_beep");
    shortBeep.pause();
    shortBeep.currentTime = 0;
    shortBeep.play();
    Utils.log("onClickButton", password);
    checkSolution();
  }

  const pRef = useRef();
  useEffect(() => {
    if(appSettings.skin !== "FUTURISTIC") return;
    const container = document.querySelector('.telephone_screen');
    const p = pRef.current;
    if (!container || !p) return;
  
    const maxFontSize = parseFloat(appSettings.screenFontSize) || 6;
    let fontSize = maxFontSize;
    p.style.fontSize = fontSize + "vmin";

    // Reduce font size hasta que quepa
    while (p.scrollWidth > container.clientWidth && fontSize > 2) {
      fontSize -= 0.2;
      p.style.fontSize = fontSize + "vmin";
    }
  }, [password, appSettings.screenFontSize, telephoneScreenWidth]);

  const futuristicRender = () => {
    return (<>
      <div className='telephone_screen' style={{left: telephoneScreenMarginLeft, top: telephoneScreenMarginTop,
          width: telephoneScreenWidth, height: telephoneScreenHeight, }}>
        <p className='futuristicPhoneText' ref={pRef} style={{color: appSettings.screenFontColor, }} id="telephonePassword">
          {password}
        </p>
      </div>
      <div className='keypad' id='keypad' style={{ width: containerWidth, height: containerHeight, left: containerMarginLeft, top: containerMarginTop}}>
        <div id="row1" className="row">
          <BoxButton position={appSettings.keys[1]} value={1} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[2]} value={2} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[3]} value={3} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row2" className="row" style={{top: containerHeight*0.55}}>
          <BoxButton position={appSettings.keys[4]} value={4} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[5]} value={5} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[6]} value={6} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row3" className="row" style={{top: containerHeight*0.65}}>
          <BoxButton position={appSettings.keys[7]} value={7} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[8]} value={8} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
          <BoxButton position={appSettings.keys[9]} value={9} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />
        </div>
        <div id="row4" className="row" style={{top: containerHeight*0.75,}}>
          <div style={{width: boxWidth, height: boxHeight}}/>
          <BoxButton position={appSettings.keys[0]} value={0} boxWidth={boxWidth} boxHeight={boxHeight} onClick={(value) => onClickButton(value)} />          
          <div className='boxButton' onClick={removeNumber} style={{ cursor:"pointer",width: boxWidth, height: boxHeight, backgroundImage: 'url("' + appSettings.backgroundKey + '")'}}>
            <svg style={{marginLeft:"19%", marginTop:"5%"}} xmlns="http://www.w3.org/2000/svg" height={appSettings.callButonSize} viewBox="0 -960 960 960" width={appSettings.callButtonSize} fill="white"><path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z"/></svg>
          </div>
        </div>
        <div id="row5" className="row" style={{top: containerHeight*0.86,}}>
          <div style={{width: boxWidth, height: boxHeight}}/>
          <div className='boxButton' onClick={makeCall} style={{cursor:"pointer",width: boxWidth, height: boxHeight, backgroundImage: 'url("' + appSettings.backgroundKeyCall + '")'}}>
            <svg style={{marginLeft:"19%", marginTop:"5%"}} xmlns="http://www.w3.org/2000/svg" height={appSettings.callButonSize} viewBox="0 -960 960 960" width={appSettings.callButtonSize} fill="white"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
          </div>

        </div>
        <audio id="audio_beep" src={appSettings.soundBeep} preload="auto"></audio>
        <audio id="audio_beep0" src={appSettings.soundsBeeps[0]} preload="auto"></audio>
        <audio id="audio_beep1" src={appSettings.soundsBeeps[1]} preload="auto"></audio>
        <audio id="audio_beep2" src={appSettings.soundsBeeps[2]} preload="auto"></audio>
        <audio id="audio_beep3" src={appSettings.soundsBeeps[3]} preload="auto"></audio>
        <audio id="audio_beep4" src={appSettings.soundsBeeps[4]} preload="auto"></audio>
        <audio id="audio_beep5" src={appSettings.soundsBeeps[5]} preload="auto"></audio>
        <audio id="audio_beep6" src={appSettings.soundsBeeps[6]} preload="auto"></audio>
        <audio id="audio_beep7" src={appSettings.soundsBeeps[7]} preload="auto"></audio>
        <audio id="audio_beep8" src={appSettings.soundsBeeps[8]} preload="auto"></audio>
        <audio id="audio_beep9" src={appSettings.soundsBeeps[9]} preload="auto"></audio>
      </div>
      <div className="boxLight boxLight_on" style={{ visibility: (light === "on" ||  light === "nok" || light === "ok") ? "visible" : "hidden", opacity: (light === "on" || light==="nok" || light==="ok") ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightWaiting + '")', left: lightLeft, top: lightTop , transition: "opacity 1s, transform 0.5s",}} />
      
      <div style={{ visibility: (light === "on") ? "visible" : "hidden", opacity: (light === "on")  ? "1" : "0",  transition: "opacity 1s, transform 1s", zIndex:"4", left: callingTextMarginLeft, top: callingTextMarginTop, position:"absolute", display: "flex", justifyContent:"center", width:"100%"}} >
        <p style={{color:appSettings.callingFontColor, fontSize:containerWidth*appSettings.callingFontSize+"px"}}>{I18n.getTrans("i.calling")}<span className="dot-ellipsis"></span></p>
      </div>
      <div style={{ visibility: (light === "nok") ? "visible" : "hidden", opacity: (light === "nok")  ? "1" : "0",  transition: "opacity 1s, transform 1s", zIndex:"4", left: callingTextMarginLeft, top: callingTextMarginTop, position:"absolute", justifyContent:"center", display:"flex", width:"100%"}} >
        <p style={{color:appSettings.callingFontColor, fontSize:containerWidth*appSettings.callingFontSize+"px"}}>{I18n.getTrans("i.noResponse")}</p>
      </div>
      <div style={{ visibility: (light === "ok") ? "visible" : "hidden", opacity: (light === "ok")  ? "1" : "0", transition: "opacity 1s, transform 1s", zIndex:"4", left: callingTextMarginLeft, top: callingTextMarginTop, position:"absolute", justifyContent:"center", display:"flex", width:"100%"}} >
        <p style={{color:appSettings.callingFontColor, fontSize:containerWidth*appSettings.callingFontSize+"px"}}>{formatTime(timer)}</p>
      </div>
      </>);
  }

  function formatTime(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
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


  const  reset = () =>{
    setPassword("");
    secondarySolutionRef.current = false;
    if (timer) {
      clearTimeout(timer); 
      setTimer(null);
    }
  }

  useEffect(() => {
    if(appSettings.skin === "FUTURISTIC" || processingSolution || password.length <= 0) return;
    if (timer) {
      clearTimeout(timer); 
    }
    if(!isMouseDown) {
      const newTimer = setTimeout(() => {    
        checkSolution();
        setSoftReset(true);
      }, 4500);
      setTimer(newTimer);
      Utils.log("Solution: ", password);
    }
  }, [isMouseDown]);

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundImage }}>
      <div id="telephoneContainer" className="telephoneContainer" 
        style={{backgroundImage: 'url('+appSettings.backgroundTelephone+')', width: containerWidth, height: containerHeight, top: telephoneMarginTop, left: telephoneMarginLeft, position:"relative" }}>
          {appSettings.skin==="FUTURISTIC" ? futuristicRender() : <>
            <div className='numbersContainer' style={{ width: boxWidth, height: boxHeight, }}>
              <Number value={0}/>
              <Number value={1}/>
              <Number value={2}/>
              <Number value={3}/>
              <Number value={4}/>
              <Number value={5}/>
              <Number value={6}/>
              <Number value={7}/>
              <Number value={8}/>
              <Number value={9}/>
            </div>
            <Dial
                boxWidth={boxWidth} boxHeight={boxHeight} checking={processingSolution} 
                rotationAngle={rotationAngle} setRotationAngle={setRotationAngle} softReset={softReset} setSoftReset={setSoftReset}
                setPassword={setPassword} marginLeft={containerMarginLeft} marginTop={containerMarginTop} isMouseDown={isMouseDown} setIsMouseDown={setIsMouseDown}/>
          
        <div className="boxLight boxLight_off" style={{ visibility: light === "off" ? "visible" : "hidden", opacity: light === "off" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOff + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_nok" style={{ visibility: light === "nok" ? "visible" : "hidden", opacity: light === "nok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightNok + '")', left: lightLeft, top: lightTop }} ></div> 
        <div className="boxLight boxLight_ok" style={{ visibility: light === "ok" ? "visible" : "hidden", opacity: light === "ok" ? "1" : "0", width: lightWidth, height: lightHeight, backgroundImage: 'url("' + appSettings.imageLightOk + '")', left: lightLeft, top: lightTop }} ></div>
          </>}
      </div>     

        <audio id="audio_success" src={appSettings.soundOk} preload="auto"></audio>
        <audio id="audio_failure" src={appSettings.soundNok} preload="auto"></audio>
        <audio id="audio_calling" src={appSettings.soundCalling} preload="auto"></audio>
        <audio id="audio_call" src={appSettings.soundReset} preload="auto"></audio>
        {appSettings.actionAfterSolve === "PLAY_SOUND" && <audio id="audio_post_success" src={appSettings.soundPostSuccess} preload="auto"></audio>}        
        {appSettings.telephoneNumbers && appSettings.telephoneNumbers.map((telephoneNumber, index) => (
          telephoneNumber.src && <audio  key={`telephone-audio-${index}`} id={`audio_telephone_${telephoneNumber.number}`} 
            src={telephoneNumber.src} preload="auto"></audio> ))}
    </div>);
};

export default MainScreen;