import React from 'react';
import {Button, DeviceEventEmitter, FlatList, ToastAndroid, View} from 'react-native';
import LandingListItem from './LandingListItem';

//This component displays Main Food Menu screen of the app
export default class MenuRender extends React.Component {

  constructor(props){
    super(props);

    const onSessionConnect = (event) => {
      if(event.loadUri === 'my_orders'){
        const { navigate } = this.props.navigation;
        navigate('Orders');
      }
    };
    //registering Device Events Listener to handle user calls to My orders from Menu icon
    DeviceEventEmitter.addListener('loadUri', onSessionConnect);
  }

  onProceed = () =>{
    if(this.canProceed()){
      const { navigate } = this.props.navigation;
      navigate('ConfirmQty');
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
    return (
      <View>
        <FlatList
          data={[
            {key: 'Pizza', quantity: this.props.screenProps.pizza, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/pizza.jpg'},
            {key: 'Beverages', quantity: this.props.screenProps.beverage, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/beverage.jpg'},
            {key: 'Sides', quantity: this.props.screenProps.sides, imglocation: 'https://raw.githubusercontent.com/flipkart-incubator/ultra-pizza-demo-app/master/images/sides.jpg'}
          ]}
          renderItem={({item}) => <LandingListItem name= {item.key} quantity={item.quantity} 
          imglocation= {item.imglocation} dispatch= {this.props.screenProps.dispatch}/> }/>
        <Button 
          style={{width: 50, padding: 10}}
          onPress={this.onProceed}
              title="Proceed"/>
        <View style={{width: 10, height: 10}}/>
        <Button title='Click to view your orders' onPress={this.onMyOrdersPress}/>
      </View>
    );
  }
}
