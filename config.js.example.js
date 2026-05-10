//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "STANDARD", //skin can be "STANDARD" or "RETRO".
  //showLightFeedback: "TRUE", //only for RETRO
  //background: "NONE", //background can be "NONE" or a URL.
  keysType: "NUMBERS", //keys can be "NUMBERS", "LETTERS", "COLORS" or "SYMBOLS".
  actionAfterSolve: "PLAY_SOUND", //actionAfterSolve can be "NONE", "SHOW_MESSAGE" or "PLAY_SOUND".
  //message: "Custom message",
  //soundAfterSolve: "sounds/pickup_standard.mp3",
  //disablePhoneAfterSolve: "TRUE", //Disable phone actions after solve the linked puzzle
  telephoneNumbers: [
    { 
      number: "1;2;3;4",
      audio: "sounds/pickup_standard.mp3",
      avatar: "images/standard/calling_icon.png"
    },
    { 
      number: "Moon;Moon",
      audio: "sounds/pickup_standard.mp3",
      avatar: "images/standard/calling_icon.png"
    }
  ],

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale:"en",

  escappClientSettings: {
    endpoint:"https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};