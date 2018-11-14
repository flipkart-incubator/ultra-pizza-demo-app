import React from 'react';
import MenuRender from './MenuRender.js';
import ConfirmQuantityScreen from './ConfirmQuantityScreen.js';
import UserDetailScreen from './UserDetailScreen.js';
import PaymentScreen from './PaymentScreen.js';
import ConfirmationScreen from './ConfirmationScreen.js';
import MyOrders from './MyOrders';
import PaymentFailedScreen from './PaymentFailedScreen.js';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';


const RootStack = createStackNavigator(
  {
    Home: MenuRender,
    ConfirmQty: ConfirmQuantityScreen,
    UserDetail: UserDetailScreen,
    Payment: PaymentScreen,
    Confirmation: ConfirmationScreen,
    Orders: MyOrders,
    PaymentFailure: PaymentFailedScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export class MainScreen extends React.Component {

  render() {
    return(
      <RootStack screenProps={{dispatch: this.props.propstoMainScreen.dispatch, pizza: this.props.pizza, beverage: this.props.beverage, 
        sides: this.props.sides, orderId: this.props.orderId, identityToken:this.props.identityToken, authToken: this.props.propstoMainScreen.authToken, mobile: this.props.propstoMainScreen.mobile}}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
  pizza: state.pizza,
  beverage: state.beverage,
  sides: state.sides,
  orderId: state.orderId,
  identityToken: state.identityToken
})};

const AppContainer = connect(
  mapStateToProps
)(MainScreen);

export default AppContainer;
