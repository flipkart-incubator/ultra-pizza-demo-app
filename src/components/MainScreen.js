import React from 'react';
import MenuRender from './MenuRender.js';
import ChooseQuantityScreen from './ChooseQuantityScreen.js';
import UserDetailScreen from './UserDetailScreen.js';
import PaymentScreen from './PaymentScreen.js';
import ConfirmationScreen from './ConfirmationScreen.js';
import LoginScreen from './LoginScreen.js';
import MyOrders from './MyOrders';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';


const RootStack = createStackNavigator(
  {
    SignIn: LoginScreen,
    Home: MenuRender,
    SelectQty: ChooseQuantityScreen,
    UserDetail: UserDetailScreen,
    Payment: PaymentScreen,
    Confirmation: ConfirmationScreen,
    Orders: MyOrders
   },

  {
    initialRouteName: 'Home'
  }
);

export class MainScreen extends React.Component {

  render() {
   
    return(
      <RootStack screenProps={{dispatch: this.props.propstoMainScreen.dispatch, pizza: this.props.pizza, beverage: this.props.beverage, 
        sides: this.props.sides, authToken: this.props.propstoMainScreen.authToken, mobile: this.props.propstoMainScreen.mobile}}/>
    )
    
  }

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
