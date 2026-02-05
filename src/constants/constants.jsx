export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  keysType: "NUMBERS",
  background: "images/standard/background.png",
  backgroundTelephone : "images/standard/background_telephone.png",
  backgroundDial: "images/standard/dial_telephone.png",
  backgroundMarker: "images/standard/marker.png",
  backgroundTelephoneMessage: "images/standard/background_telephone_message.png",
  numbers: ["1","2","3","4","5","6","7","8","9","0"],
  letters: ["A","B","C","D","E","F","G","H","I","J"],
  colors : [
    "Red", //#FF0000
    "Green", //#008000
    "Blue", //#0000FF
    "Yellow", //#FFFF00
    "Orange", //#FFA500
    "Pink", //#FF1493
    "Cyan", //#00FFFF
    "Purple", //#800080
    "Brown", //#8B4513
    "Black", //#000000
  ],
  symbols: [
    "Triangle",
    "Square",
    "Circle",
    "Rhombus",
    "Hearts",
    "Diamonds",
    "Star",
    "Moon",
    "Sun",
    "Puzzle",
  ],
  symbolsBackground: [
    {viewBox:"80 -880 800 800", path:"M80-160 480-800l400 640H80Zm144-80h512L480-650 224-240Zm256-205Z",},
    {viewBox:"120 -840 720 720", path:"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"},   
    {viewBox:"80 -880 800 800", path:"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"},
    {viewBox:"79 -881 802 802", path:"M480-79q-16 0-30.5-6T423-102L102-423q-11-12-17-26.5T79-480q0-16 6-31t17-26l321-321q12-12 26.5-17.5T480-881q16 0 31 5.5t26 17.5l321 321q12 11 17.5 26t5.5 31q0 16-5.5 30.5T858-423L537-102q-11 11-26 17t-31 6Zm0-80 321-321-321-321-321 321 321 321Zm0-321Z"},
    {viewBox:"80 -887 800 800", path:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"},
    {viewBox:"80 -880 800 800", path:"M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z"},
    {viewBox:"80 -900 800 800", path:"m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"},
    {viewBox:"120 -840 720 720", path:"M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"},
    {viewBox:"40 -920 880 880", path:"M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"},
    {viewBox:"80 -880 800 800", path:"M120-272q0-16 10.5-27t25.5-11q8 0 15.5 2.5T186-300q13 8 26 14t28 6q33 0 56.5-23.5T320-360q0-33-23.5-56.5T240-440q-15 0-29 5t-25 15q-6 5-14 7.5t-16 2.5q-15 0-25.5-11T120-448v-152q0-17 11.5-28.5T160-640h150q-5-15-7.5-30t-2.5-30q0-75 52.5-127.5T480-880q75 0 127.5 52.5T660-700q0 15-2.5 30t-7.5 30h150q17 0 28.5 11.5T840-600v152q0 17-11.5 28.5T800-408q-8 0-14-3.5t-12-8.5q-11-10-25-15t-29-5q-33 0-56.5 23.5T640-360q0 33 23.5 56.5T720-280q15 0 29-5t25-15q5-5 11.5-8.5T800-312q17 0 28.5 11.5T840-272v152q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-152Zm80 112h560v-46q-10 3-19.5 4.5T720-200q-66 0-113-47t-47-113q0-66 47-113t113-47q11 0 20.5 1.5T760-514v-46H578q-17 0-28.5-11T538-598q0-8 2.5-16.5T550-628q17-12 23.5-31.5T580-700q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 21 6.5 40.5T410-628q7 5 9.5 12.5T422-600q0 17-11.5 28.5T382-560H200v46q10-3 19.5-4.5T240-520q66 0 113 47t47 113q0 66-47 113t-113 47q-11 0-20.5-1.5T200-206v46Zm280-320Z"},
  ],
  numbersPosition:[
    {top: "39.6%", right: "40.2%"},
    {top: "35.4%", right: "44%"},
    {top: "34.3%", right: "48.9%"},
    {top: "36.4%", right: "53.7%"},
    {top: "41.3%", right: "57%"},
    {top: "47.7%", right: "58%"},
    {top: "54.1%", right: "56.65%"},
    {top: "58.6%", right: "53.2%"},
    {top: "60.3%", right: "48.4%"},
    {top: "58.8%", right: "43.6%"},
  ],
  imageLightOff: "images/standard/light_off.png",
  imageLightNok: "images/standard/light_nok.png",
  imageLightOk: "images/standard/light_ok.png",
  soundNok: "sounds/solution_nok.wav",
  soundOk: "sounds/solution_ok.mp3",
  soundDial: "sounds/spin.wav",
  soundRetract: "sounds/retract.wav",
  soundCalling: "sounds/calling.wav",
  soundPostSuccess: "sounds/post_success.mp3", // Sound played after the solution is correct and the message is shown
  dialWidth: 0.7, // Relative size of the dial compared to the box width
  dialHeight: 0.7, // Relative size of the dial compared to the box height
  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#000000", // Color for the dial text
  angleMultiplier: 30, // Angle multiplier to divide the dial into 10 parts
  initialAngle: 50, // Initial angle of the dial in degrees
  fontSize : "6vmin", // Font size for the numbers, letters, colors, or symbols
  fontColor: "#FFFFFF", // Color for the numbers, letters, colors, or symbols
  telephoneNumbers: [
    { number: "1234", src: "sounds/contestador_mensaje.wav" },
    { number: "111111", src: "sounds/contestador_no_mensaje.wav" },
  ],

};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",  
  backgroundTelephone : "images/retro/background_telephone.png",
  backgroundDial: "images/retro/background_dial.png",
  backgroundMessage: "images/retro/background.png",
  imageLightOff: "images/retro/light_off.png",
  imageLightNok: "images/retro/light_nok.png",
  imageLightOk: "images/retro/light_ok.png",
  backgroundTelephoneMessage: null,
  fontSize : "5vmin", // Font size for the numbers, letters, colors, or symbols
  dialTextColor: "#FFFFFF", // Color for the dial text
  angleMultiplier: 30, // Angle multiplier to divide the dial into 10 parts
  initialAngle: 50, // Initial angle of the dial in degrees
  dialWidth: 0.25, // Relative size of the dial compared to the box width
  dialHeight: 0.25, // Relative size of the dial compared to the box height
  numbersPosition:[
    {top: "46.6%", right: "37.3%"},
    {top: "42.4%", right: "41.2%"},
    {top: "41.3%", right: "46.2%"},
    {top: "43.5%", right: "51.3%"},
    {top: "48.5%", right: "54.8%"},
    {top: "55.3%", right: "55.8%"},
    {top: "62%", right: "54.37%"},
    {top: "66.5%", right: "50.6%"},
    {top: "68.4%", right: "45.8%"},
    {top: "67%", right: "40.8%"},
  ],
};

export const SKIN_SETTINGS_FUTURISTIC = {
  background: "images/futuristic/background.png",
  backgroundTelephone : "images/futuristic/background_telephone.png",
  backgroundKey: "images/futuristic/button.png",
  backgroundKeyCall: "images/futuristic/button_call.png",
  backgroundMessage: "images/futuristic/background_message_futuristic.png",
  imageLightNok: "images/futuristic/light_nok_futuristic.png",
  imageLightOk: "images/futuristic/light_ok_futuristic.png",
  imageLightWaiting: "images/futuristic/light_waiting.png",
  backgroundTelephoneMessage: null,
  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#0fbdfd", // Color for the dial text
  fontSize : "5vmin", // Font size for the numbers, letters, colors, or symbols
  fontColor: "#FFFFFF",
  soundBeep: "sounds/beep.wav",
  soundsBeeps: [
    "sounds/beeps/beep1.wav",
    "sounds/beeps/beep2.wav",
    "sounds/beeps/beep3.wav",
    "sounds/beeps/beep4.wav",
    "sounds/beeps/beep5.wav",
    "sounds/beeps/beep6.wav",
    "sounds/beeps/beep7.wav",
    "sounds/beeps/beep8.wav",
    "sounds/beeps/beep9.wav",
    "sounds/beeps/beep10.wav",
  ],    
  screenFontSize: 5, // Font size for the screen text
  screenFontColor: "#0fbdfd", // Color for the screen text
  callButtonSize: "4.5vmin", // Size of the call button
  maxNumber: 15, // Maximum number of digits in the call input
  callingFontSize: 0.1, // Font size for the calling text
  callingFontColor: "white", // Color for the calling text
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";