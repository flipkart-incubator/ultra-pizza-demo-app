import React from 'react';
import {Button, FlatList, SafeAreaView, ToastAndroid} from 'react-native';
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

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return true;
  // }

  // componentDidUpdate(){
  //   console.log('menu componentDidUpdate');
  // }

  canProceed = () => {
    if(this.props.screenProps.pizza > 0 || this.props.screenProps.beverage > 0 || this.props.screenProps.sides > 0){
      return true;
    }else{
      return false;
    }
  }

  render () {
    const { navigate } = this.props.navigation;
    //console.log('dispatch type in menuRender',typeof(this.props.screenProps));
    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
          {/* <ActionBar 
          title={'Flipkart Pizza'}
          backgroundColor='#2876F4'/> */}
        <FlatList
          data={[
            //code changes here
          ]}
          renderItem={({item}) => <LandingListItem name= {item.key} quantity={item.quantity} 
          imglocation= {item.imglocation} dispatch= {this.props.screenProps.dispatch} navigation= {navigate}/> }/>
        <Button 
          style={{width: 50}}
          onPress={this.onProceed}
                title="Proceed"/>
      </SafeAreaView>
    );
  }
}
