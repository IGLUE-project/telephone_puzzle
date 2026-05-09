import React from 'react';
import {useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/app.scss';

import { DEFAULT_APP_SETTINGS, SKIN_SETTINGS_STANDARD, SKIN_SETTINGS_RETRO, ESCAPP_CLIENT_SETTINGS, MAIN_SCREEN } from '../constants/constants.jsx';
import MainScreen from './MainScreen.jsx';

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);
  const [loading, setLoading] = useState(true);
  const solution = useRef(null);
  const [appWidth, setAppWidth] = useState(0);
  const [appHeight, setAppHeight] = useState(0);
  
  useEffect(() => {
    //Init Escapp client
    if(escapp !== null){
      return;
    }
    //Create the Escapp client instance.
    let _escapp = new ESCAPP(ESCAPP_CLIENT_SETTINGS);
    setEscapp(_escapp);
    Utils.log("Escapp client initiated with settings:", _escapp.getSettings());

    //Use the storage feature provided by Escapp client.
    setStorage(_escapp.getStorage());

    //Get app settings provided by the Escapp server.
    let _appSettings = processAppSettings(_escapp.getAppSettings());
    setAppSettings(_appSettings);
    Utils.log("App settings:", _appSettings);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  function processAppSettings(_appSettings){
    if(typeof _appSettings !== "object"){
      _appSettings = {};
    }
    if((typeof _appSettings.skin === "undefined")&&(typeof DEFAULT_APP_SETTINGS.skin === "string")){
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }

    let skinSettings;
    switch(_appSettings.skin){
      case "STANDARD":
        skinSettings = SKIN_SETTINGS_STANDARD;
        break;
      case "RETRO":
        skinSettings = SKIN_SETTINGS_RETRO;
        break;
      default:
        skinSettings = {};
    }
    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);
 
     // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);
    
    const allowedActions = ["NONE", "PLAY_SOUND"];
    if(!allowedActions.includes(_appSettings.actionAfterSolve)) {
      _appSettings.actionAfterSolve = DEFAULT_APP_SETTINGS.actionAfterSolve;
    }

    switch(_appSettings.keysType){
      case "LETTERS":
        _appSettings.keys = _appSettings.letters;
        break;
      case "COLORS":
        _appSettings.keys = _appSettings.colors;
        break;
      case "SYMBOLS":
        _appSettings.keys = _appSettings.symbols;
        break;
      default:
        //NUMBERS
        _appSettings.keys = _appSettings.numbers;
    }

    //Init internacionalization module
    I18n.init(_appSettings);

    if(typeof _appSettings.message !== "string"){
      _appSettings.message = I18n.getTrans("i.message");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    //Utils.preloadImages([_appSettings.backgroundMessage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags

    return _appSettings;
  }

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;

      //Register callbacks in Escapp client and validate user.
      escapp.registerCallback("onNewErStateCallback", function(erState){
        try {
          Utils.log("New escape room state received from ESCAPP", erState);
          restoreAppState(erState);
        } catch (e){
          Utils.log("Error in onNewErStateCallback", e);
        }
      });

      escapp.registerCallback("onErRestartCallback", function(erState){
        try {
          Utils.log("Escape Room has been restarted.", erState);
          if(typeof Storage !== "undefined"){
            Storage.removeSetting("state");
          }
        } catch (e){
          Utils.log("Error in onErRestartCallback", e);
        }
      });

      //Validate user. To be valid, a user must be authenticated and a participant of the escape room.
      escapp.validate((success, erState) => {
        try {
          Utils.log("ESCAPP validation", success, erState);
          if(success){
            restoreAppState(erState);
            setLoading(false);
          }
        } catch (e){
          Utils.log("Error in validate callback", e);
        }
      });
    }
  }, [escapp, appSettings, Storage]);

  useEffect(() => {
    if(loading === false){
      handleResize();
    }
  }, [loading]);

  function handleResize(){
    setAppWidth(window.innerWidth);
    setAppHeight(window.innerHeight);
  }

  function restoreAppState(erState){
    Utils.log("Restore application state based on escape room state:", erState);
  }

  function saveAppState(){
    if(typeof Storage !== "undefined"){
      let currentAppState = {solution: solution.current};
      Utils.log("Save app state in local storage", currentAppState);
      Storage.saveSetting("state",currentAppState);
    }
  }

  function onPhoneSolved(_solution){
    Utils.log("onPhoneSolved with solution:", _solution);
    if(typeof _solution !== "string"){
      return;
    }
    solution.current = _solution;

    switch(appSettings.actionAfterSolve){
      case "SHOW_MESSAGE":
        // TO DO
        return;
      case "PLAY_SOUND":
        // TO DO
        return; 
      case "NONE":
      default:
        return submitPuzzleSolution();
    }
  }

  function submitPuzzleSolution(){
    Utils.log("Submit puzzle solution", solution.current);
    escapp.submitNextPuzzle(solution.current, {}, (success, erState) => {
      Utils.log("Solution submitted to Escapp", solution.current, success, erState);
    });
  }

  const renderScreens = (screens) => {
    if (loading === true) {
      return null;
    } else {
      return (
        <>
          {screens.map(({ id, content }) => renderScreen(id, content))}
        </>
      );
    }
  };

  const renderScreen = (screenId, screenContent) => (
    <div key={screenId} className={`screen_wrapper active`} >
      {screenContent}
    </div>
  );

  let screens = [
    {
      id: MAIN_SCREEN,
      content: <MainScreen appHeight={appHeight} appWidth={appWidth} onPhoneSolved={onPhoneSolved} />
    }
  ];

  return (
    <div id="global_wrapper" className={`${(appSettings !== null && typeof appSettings.skin === "string") ? appSettings.skin.toLowerCase() : ''}`}>
      {renderScreens(screens)}
    </div>
  )
}