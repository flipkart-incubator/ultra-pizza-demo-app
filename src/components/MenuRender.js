import React from 'react';
import {Button, FlatList, SafeAreaView, ToastAndroid, View} from 'react-native';
import ActionBar from 'react-native-action-bar';
import GlobalStyles from './GlobalStyles';
import LandingListItem from './LandingListItem';


export default class MenuRender extends React.Component {

  constructor(props) {
    super(props)
  }

  onProceed = () =>{
    if(this.canProceed()){
      const { navigate } = this.props.navigation;
      navigate('SelectQty');
    }else{
      ToastAndroid.show('Select an item to Proceed', ToastAndroid.SHORT);
    }
  }

  canProceed = () => {
    if(this.props.screenProps.pizza > 0 || this.props.screenProps.beverage > 0 || this.props.screenProps.sides > 0){
      return true;
    }else{
      return false;
    }
  }

  onMyOrdersPress = () =>{
    const { navigate } = this.props.navigation;
    navigate('Orders');
}

  render () {
    //const { navigate } = this.props.navigation;
    //console.log('dispatch type in menuRender',typeof(this.props.screenProps));
    return (
      <View>
        <FlatList
          data={[
            {key: 'Pizza', quantity: this.props.screenProps.pizza, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg'},
            {key: 'Beverages', quantity: this.props.screenProps.beverage, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg'},
            {key: 'Sides', quantity: this.props.screenProps.sides, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/sides.jpg'}
          ]}
          renderItem={({item}) => <LandingListItem name= {item.key} quantity={item.quantity} 
          imglocation= {item.imglocation} dispatch= {this.props.screenProps.dispatch} /*navigation= {navigate}*//> }/>
        <Button 
          style={{width: 50, padding: 10}}
          onPress={this.onProceed}
                title="Proceed"/>
        <Button title='Click to view your orders' onPress={this.onMyOrdersPress}/>
      </View>
    );
  }
}
