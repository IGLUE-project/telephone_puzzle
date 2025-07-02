import './../assets/scss/main.scss';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const  SafeBoxDial = ( props ) => {
    const {  appSettings } = useContext(GlobalContext);
    const [initialRotation, setInitialRotation] = useState(0); // Ángulo inicial del lock
    const [isMouseDown, setIsMouseDown] = useState(false); // Estado para saber si el mouse está presionado
    const [startAngle, setStartAngle] = useState(0); // Ángulo inicial del ratón
    const [rotationDirection, setRotationDirection] = useState(""); // Dirección de rotación
    const [isReseting, setIsReseting] = useState(false); // Estado para saber si se está reiniciando el lock


    const handleMouseMove = (event) => {
        if (!isMouseDown || props.checking) return ; // Solo ejecuta si el mouse está presionado    
        let audio  = document.getElementById("audio_wheel");
        let rounded = calculateAngle(event); // Calcula el ángulo 
      // Calcula la diferencia de ángulos de forma cíclica
        const angleDifference = normalizeAngleDifference(rounded - startAngle);
      // Calcula la rotación acumulada y normalízala
        const newRotation = normalizeAngle(initialRotation + angleDifference);
        const rotationDir = getRotationDirection(props.rotationAngle/6, newRotation/6);
        //Si se intenta girar en sentido contrario a la rotacion actual, no se hace nada
        if(rotationDirection === ''){
          setRotationDirection(rotationDir);
        }else if(rotationDirection !== rotationDir){
          return;}
        if(rotationDirection === 'counter-clockwise'){return;}
        if(newRotation >353) return;
        //console.log("rotation angle: " ,props.rotationAngle, ", new rotation ", newRotation, " abs: ",(props.rotationAngle-newRotation)/6);
        if(props.rotationAngle!==354 && Math.abs((props.rotationAngle-newRotation)/6) > 6) return; // No actualiza si el ángulo no ha cambiado
        if(props.rotationAngle === newRotation)return; // No actualiza si el ángulo no ha cambiado
        props.setRotationAngle(newRotation);     // Actualiza el ángulo de rotación
        audio.play();
    };

    const handleMouseUp = () => {
        if (props.checking) return ;
        setIsMouseDown(false); // Indica que el mouse ya no está presionado
        let audio  = document.getElementById("audio_return");
        //reset(); // Reinicia la rotación //Poniendolo aqui, hace efecto de teelfono de dial
        //Para poder poner -55 si va contrarreloj o 30 si va a favor
        //props.setSolutionArray((sol) => [...sol, (rotationDirection === "clockwise" ? props.rotationAngle/6 : -props.rotationAngle/6)]);
        //setRotationDirection(''); //Reinicia la direccion de rotacion
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
        setIsMouseDown(true); // Indica que el mouse está presionado    
        let rounded = calculateAngle(event); // Calcula el ángulo inicial
        setStartAngle(rounded);     // Guarda el ángulo inicial y el ángulo actual del lock
        setInitialRotation(props.rotationAngle); // Guarda el ángulo actual del lock    
      };

    const calculateAngle = (event) => {
        const lockElement = document.getElementById("dial");
        const rect = lockElement.getBoundingClientRect();  
        // Calcula el centro del div
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;  
        // Calcula el ángulo inicial en radianes y lo convierte a grados
        const radians = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angle = radians * (180 / Math.PI);  
        // Normaliza el ángulo para que esté entre 0° y 360°
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
        //setRotationDirection("");
        setTimeout(() => {      
          setIsReseting(false);
        }, 1300);
    }

    useEffect(() => {    
        if (isReseting) { 
            reset(); // Reinicia el lock
        }}, [isReseting]); // Se ejecuta cuando isReseting cambia

      return(
          <div className='dialContainer' style={{// width: props.boxWidth , height: props.boxHeight ,  
              width: props.boxWidth, 
              height: props.boxHeight, 
              left: props.marginLeft,
              top: props.marginTop,}}
              onDragStart={(event) => event.preventDefault()
            } onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}>
            
              <div id='dial' className='dial' style={{ 
                width: props.boxWidth, // Usa el menor valor para asegurar que sea cuadrado
                height: props.boxHeight, // Usa el menor valor para asegurar que sea cuadrado
                backgroundImage: `url(${appSettings.backgroundDial})`, // Cambia la imagen de fondo según el skin
                transform: `rotate(${props.rotationAngle}deg)`, // Rotación dinámica.
                transition: isReseting ? "transform 1.3s ease" : "none", // Transición suave solo durante el reset
              }}/>
                <div className="pivote" style={{
                  backgroundImage: `url(${appSettings.backgroundMarker})`, // Cambia la imagen de fondo según el skin
                  width: props.boxWidth * 0.9, // Usa el menor valor para asegurar que sea cuadrado
                  height: props.boxHeight * 0.9,
                }}/>
                <audio id="audio_wheel" src={appSettings.soundDial} autostart="false" preload="auto" />
                <audio id="audio_return" src={appSettings.soundRetract} autostart="false" preload="auto" />     
          </div>
    
    );
}

export default SafeBoxDial;