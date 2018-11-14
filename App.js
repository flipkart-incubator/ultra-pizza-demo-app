import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import appreducer from './src/reducer';
import AppContainer from './src/components/MainScreen';
var firebase = require("firebase");

const store = createStore(appreducer);

export default class App extends React.Component {

  render() {
    //Below firebase app config will be used later for communication with firebase database
    var config = {
      apiKey: "AIzaSyBAMUXFxgwK5vks7SBQ6EDnMaYuNRIT5Yc",
      authDomain: "pizzadelivery-38e91.firebaseapp.com",
      databaseURL: "https://pizzadelivery-38e91.firebaseio.com/",
      storageBucket: "pizzadelivery-38e91.appspot.com"
    };
    firebase.initializeApp(config);

    return (
      <Provider store={store}>
        <AppContainer propstoMainScreen = {{dispatch: store.dispatch, authToken: this.props.AuthToken,
          mobile: this.props.MobileNumber}}/>
      </Provider>
    );
  }
}