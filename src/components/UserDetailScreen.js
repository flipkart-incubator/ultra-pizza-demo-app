import React from 'react';
import {Button, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import FKPlatform from "fk-platform-sdk"
let fkPlatform = new FKPlatform('playground.pizza');
var getUser = require('../server/getUserDetails');

export default class UserDetailScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: '', phone: '', address: ''};
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
        return true;
        // if(this.state.name == '' || this.state.phone == '' || this.state.address == ''){
        //     return false;
        // }else{
        //     return true;
        // }
    }

    render(){
        var scopeReq = [{"scope":"user.mobile","isMandatory":false,"shouldVerify":false},{"scope":"user.name","isMandatory":false,"shouldVerify":false}];
        fkPlatform.getModuleHelper().getPermissionsModule().getToken(scopeReq).then(
        function (e) {
            console.log("Your grant token is: " + e.grantToken);
            var request = {
                token: e.grantToken
            }
            var user = getUser.getUserDetails(request, null);
        }).catch(
        function (e) {
            console.log(e.message);
        })
        return(
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>User Details</Text>
                <TextInput 
                    placeholder="Name *" 
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.state.name = text}/>
                <TextInput 
                    placeholder="Phone Number *" 
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => this.state.phone = text}/>
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