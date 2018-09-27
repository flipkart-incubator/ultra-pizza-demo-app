import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import appreducer from './src/reducer';
import AppContainer from './src/components/MainScreen';

const store = createStore(appreducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer dispatch = {store.dispatch} />
      </Provider>
    );
  }
}