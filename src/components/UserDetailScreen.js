import React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
var loginHelper = require('../LoginHelper.js');
import FKPlatform from "fk-platform-sdk"
export let fkPlatform
if(FKPlatform.isPlatformAvailable()){
    fkPlatform = new FKPlatform('playground');
}

export default class UserDetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading: true, name: '', phone: '', address: ''};
    }

    onButtonPress = () => {
        if(this.canProceed()){
            const { navigate } = this.props.navigation;
            navigate('Payment');
        }else{
            ToastAndroid.show('Enter all required fields to Proceed', ToastAndroid.SHORT);
        }
    }

    canProceed = () => {
        if(this.state.name == '' || this.state.phone == '' || this.state.address == ''){
            return false;
        }else{
            return true;
        }
    }

    componentDidMount(){
        if(FKPlatform.isPlatformAvailable()){
            loginHelper.ultraSignIn()
            .then((userResponse) => {
                this.props.screenProps.dispatch({type: 'UPDATE_IDENTITY_TOKEN', identityToken: userResponse.identityToken});
                this.setState({
                    isLoading: false,
                    name: userResponse.name,
                    phone: userResponse.mobile,
                    address: ''
                });
            })
            
        }else{
            this.setState({
                isLoading: false
            });
        }
    }

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
        }
        return(
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>User Details</Text>
                <TextInput 
                    placeholder="Name *" 
                    style={styles.input}
                    value={this.state.name}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({name: text})}/>
                <TextInput 
                    placeholder="Phone Number *" 
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    keyboardType={'phone-pad'}
                    value={this.state.phone}
                    onChangeText={(text) => this.setState({phone: text})}/>
                <TextInput 
                    placeholder="Address *" 
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.state.address = text}/>
                <Button title='PROCEED TO PAY' onPress={this.onButtonPress}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textitem: {
        textAlign: 'center',
        padding: 10,
        fontSize: 24
    },
    input: {
        textAlign: 'center',
        padding: 10,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    }
})

