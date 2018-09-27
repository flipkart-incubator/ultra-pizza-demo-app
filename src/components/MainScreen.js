import React from 'react';
import MenuRender from './MenuRender.js';
import ChooseQuantityScreen from './ChooseQuantityScreen.js';
import UserDetailScreen from './UserDetailScreen.js';
import PaymentScreen from './PaymentScreen.js';
import ConfirmationScreen from './ConfirmationScreen.js';
import { createStackNavigator } from 'react-navigation';

import createSagaMiddleware from 'redux-saga';
import { connect } from 'react-redux';

const sagaMiddleware = createSagaMiddleware()

// sagaMiddleware.run(mySaga)


const RootStack = createStackNavigator(
  {
    Home: MenuRender,
    SelectQty: ChooseQuantityScreen,
    UserDetail: UserDetailScreen,
    Payment: PaymentScreen,
    Confirmation: ConfirmationScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export class MainScreen extends React.Component {

  render() {
    // const RootComponent = this.rootComponent;
    return <RootStack screenProps={{dispatch: this.props.dispatch, pizza: this.props.pizza, beverage: this.props.beverage, 
    sides: this.props.sides}}/>
  }

  // componentDidUpdate(){
  //   console.log('app componentDidUpdate');
  // }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return true
  // }
}

const mapStateToProps = (state, ownProps) => ({
  pizza: state.pizza,
  beverage: state.beverage,
  sides: state.sides
});

const AppContainer = connect(
  mapStateToProps
)(MainScreen);

export default AppContainer;
