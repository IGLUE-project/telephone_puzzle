import './../assets/scss/main.scss';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const  Dial = ( props ) => {
    const {  appSettings } = useContext(GlobalContext);
    const [initialRotation, setInitialRotation] = useState(0); // Ángulo inicial del lock
    const [startAngle, setStartAngle] = useState(0); // Ángulo inicial del ratón
    const [rotationDirection, setRotationDirection] = useState(""); 
    const [isReseting, setIsReseting] = useState(false);


    const handleMouseMove = (event) => {
        if (!props.isMouseDown || props.checking) return ;   
        let rounded = calculateAngle(event); 
        if (rounded >= 30 && rounded <= 40) handleMouseUp(); //No permite pasar por el tope
        let audio  = document.getElementById("audio_wheel");
        const angleDifference = normalizeAngleDifference(rounded - startAngle);
        const newRotation = normalizeAngle(initialRotation + angleDifference);
        const rotationDir = getRotationDirection(props.rotationAngle/6, newRotation/6);
        if(rotationDirection === ''){
          setRotationDirection(rotationDir);
        }else if(rotationDirection !== rotationDir){
          return;}
        if(rotationDirection === 'counter-clockwise'){return;}
        if(newRotation >353) return;
        
        if(props.rotationAngle!==354 && Math.abs((props.rotationAngle-newRotation)/6) > 6) return; // No actualiza si el ángulo no ha cambiado
        if(props.rotationAngle === newRotation)return; 
        props.setRotationAngle(newRotation);     
        audio.play();
    };

    const handleMouseUp = () => {
        if (props.checking) return ;
        props.setIsMouseDown(false); 
        let audio  = document.getElementById("audio_return");
        if(props.rotationAngle>0){
          setIsReseting(true);
          
          audio.play();
          getNumber(props.rotationAngle)
        }
    };

    const getNumber = (angle) => {
      props.setPassword((prevPassword) => prevPassword + findNumber(angle)); // Concatena el número al estado `password`
    }

    const findNumber = (angle) => {
      let number=""
      let angleMultiplier= appSettings.angleMultiplier; // Multiplicador de ángulo para dividir el dial en 10 partes
      let initialAngle = appSettings.initialAngle; // Ángulo inicial del dial
      if(angle > initialAngle && angle <= initialAngle+angleMultiplier*1)number="1";
      else if(angle > initialAngle+angleMultiplier*1 && angle <= initialAngle+angleMultiplier*2)number="2";
      else if(angle > initialAngle+angleMultiplier*2 && angle <= initialAngle+angleMultiplier*3)number="3";
      else if(angle > initialAngle+angleMultiplier*3 && angle <= initialAngle+angleMultiplier*4)number="4";
      else if(angle > initialAngle+angleMultiplier*4 && angle <= initialAngle+angleMultiplier*5)number="5";
      else if(angle > initialAngle+angleMultiplier*5 && angle <= initialAngle+angleMultiplier*6)number="6";
      else if(angle > initialAngle+angleMultiplier*6 && angle <= initialAngle+angleMultiplier*7)number="7";
      else if(angle > initialAngle+angleMultiplier*7 && angle <= initialAngle+angleMultiplier*8)number="8";
      else if(angle > initialAngle+angleMultiplier*8 && angle <= initialAngle+angleMultiplier*9)number="9";
      else if(angle > initialAngle+angleMultiplier*9)number="0";
      return number;
    }

    const handleMouseDown = (event) => {
        if (props.checking) return ;
        props.setIsMouseDown(true); 
        let rounded = calculateAngle(event); 
        setStartAngle(rounded);     
        setInitialRotation(props.rotationAngle);   
      };

    const calculateAngle = (event) => {
        const lockElement = document.getElementById("dial");
        const rect = lockElement.getBoundingClientRect();  
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;  
        const radians = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angle = radians * (180 / Math.PI);  
        if (angle < 0) {
          angle += 360;}
        return Math.round(angle / 6) * 6; 
      }

    function getRotationDirection(prev, curr) {
        const diff = (curr - prev + 60) % 60;
        if (diff === 0) return '';
        return diff < 30 ? 'clockwise' : 'counter-clockwise';
    }

    const normalizeAngleDifference = (angle) => {
        return ((angle + 180) % 360) - 180;
    };    
    const normalizeAngle = (angle) => {
        return ((angle % 360) + 360) % 360; // Asegura que el ángulo esté entre 0 y 360
    };

    const reset = () => {
        setStartAngle(0);
        props.setRotationAngle(0); // Reinicia el ángulo de rotación
        props.setIsMouseDown(false);
        setTimeout(() => {      
          setIsReseting(false);
        }, 1300);
    }

    
    useEffect(() => {
      if (!props.softReset) return; 
      setIsReseting(true); 
      setStartAngle(0);
      props.setRotationAngle(0); 
      setTimeout(() => {      
        props.setSoftReset(false); 
        setIsReseting(false); 
      }, 1300);
    }, [props.softReset]); 
    

    useEffect(() => {    
        if (isReseting) { 
            reset(); // Reinicia el lock
        }}, [isReseting]); // Se ejecuta cuando isReseting cambia

      return(
          <div className='dialContainer' style={{width: props.boxWidth, height: props.boxHeight, 
             left: props.marginLeft, top: props.marginTop,}} onDragStart={(event) => event.preventDefault()}
             onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
            
            <div id='dial' className='dial' style={{ width: props.boxWidth, height: props.boxHeight, 
                backgroundImage: `url(${appSettings.backgroundDial})`, transform: `rotate(${props.rotationAngle}deg)`, 
                transition: isReseting ? "transform 1.3s ease" : "none", }}/>
                <div className="pivote" style={{backgroundImage: `url(${appSettings.backgroundMarker})`, 
                  width: props.boxWidth * 0.9, height: props.boxHeight * 0.9,}}/>
                <audio id="audio_wheel" src={appSettings.soundDial} autostart="false" preload="auto" />
                <audio id="audio_return" src={appSettings.soundRetract} autostart="false" preload="auto" />     
          </div>
    
    );
}

export default Dial;