export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  showLightFeedback: "FALSE", //only for RETRO
  actionAfterSolve: "NONE",
  message: undefined,
  soundAfterSolve: undefined,
  keysType: "NUMBERS", //keys can be "NUMBERS", "LETTERS", "COLORS" or "SYMBOLS".
  letters: ["A","B","C","D","E","F","G","H","I","J","K","L"],
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
    "Gray", //#808080
    "White", //#FFFFFF
  ],
  symbols: [
    "Triangle",
    "Square",
    "Circle",
    "Rhombus",
    "Spades",
    "Hearts",
    "Clubs",
    "Diamonds",
    "Star",
    "Moon",
    "Sun",
    "Puzzle",
  ],
  telephoneNumbers: [],
};

export const SKIN_SETTINGS_STANDARD = {
  numbers: ["1","2","3","4","5","6","7","8","9","*","0","#"],
  background: "images/standard/background.png",
  backgroundTelephone : "images/standard/background_telephone.png",
  backgroundKey: "images/standard/button.png",
  backgroundKeyCallOn: "images/standard/button_call.png",
  backgroundKeyCallOff: "images/standard/button_call_end.png",
  imageCalling: "images/standard/calling_icon.png",
  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#0fbdfd", // Color for the dial text
  fontSize: "5vmin", // Font size for the numbers, letters, colors, or symbols
  fontColor: "#FFFFFF",
  soundBeepGeneric: "sounds/beeps/beep_generic.wav",
  soundBeepDelete: "sounds/beeps/beep_delete.wav",
  soundsBeepsNumbers: [
    "sounds/beeps/0.wav",
    "sounds/beeps/1.wav",
    "sounds/beeps/2.wav",
    "sounds/beeps/3.wav",
    "sounds/beeps/4.wav",
    "sounds/beeps/5.wav",
    "sounds/beeps/6.wav",
    "sounds/beeps/7.wav",
    "sounds/beeps/8.wav",
    "sounds/beeps/9.wav",
  ],
  soundCalling: "sounds/calling_standard.wav",
  soundWrongNumber: "sounds/disconnect_standard.wav",
  soundPickup: "sounds/pickup_standard.mp3",
  screenPhoneNumberFontSize: "5vmin",
  screenPhoneSymbolFontSize: "4.5vmin",
  screenPhoneNumberFontColor: "#eee",
  screenCallingTextFontSize: "2.5vmin",
  screenCallingTextFontColor: "#eee",
  callButtonSize: "4.5vmin", // Size of the call button
  maxNumber: 9, // Maximum number of digits in the call input
  callingFontSize: 0.1, // Font size for the calling text
  callingFontColor: "white", // Color for the calling text
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

export const SKIN_SETTINGS_RETRO = {
  numbers: ["1","2","3","4","5","6","7","8","9","0"],
  background: "images/retro/background.png",  
  backgroundTelephone : "images/retro/background_telephone.png",
  backgroundDial: "images/retro/dial_telephone.png",
  backgroundMarker: "images/retro/marker.png",
  imageLightOff: "images/retro/light_off.png",
  imageLightNok: "images/retro/light_nok.png",
  imageLightOk: "images/retro/light_ok.png",
  dialWidth: 0.25, // Relative size of the dial compared to the box width
  dialHeight: 0.25, // Relative size of the dial compared to the box height
  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#FFFFFF", // Color for the dial text
  angleMultiplier: 30, // Angle multiplier to divide the dial into 10 parts
  initialAngle: 50, // Initial angle of the dial in degrees
  fontSize : "6vmin", // Font size for the numbers, letters, colors, or symbols
  fontColor: "#FFFFFF", // Color for the numbers, letters, colors, or symbols
  numbersPosition:[
    {top: "37.6%", right: "37.7%"},
    {top: "32.3%", right: "42.7%"},
    {top: "30.9%", right: "48.9%"},
    {top: "33.4%", right: "55.0%"},
    {top: "39.7%", right: "59.1%"},
    {top: "47.8%", right: "60.4%"},
    {top: "56.0%", right: "58.65%"},
    {top: "61.6%", right: "54.3%"},
    {top: "63.8%", right: "48.2%"},
    {top: "61.9%", right: "42.1%"},
  ],
  soundDial: "sounds/dial_click_retro.wav",
  soundRetract: "sounds/dialing_back_retro.mp3",
  soundCalling: "sounds/calling_retro.mp3",
  soundWrongNumber: "sounds/disconnect_retro.mp3",
  soundPickup: "sounds/pickup_retro.mp3",
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";