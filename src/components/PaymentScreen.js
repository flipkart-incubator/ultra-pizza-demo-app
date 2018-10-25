import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
var firebase = require("firebase");
//var addOrder = require('./../../../pizza-server/src/addorders');
var add = require('../server/addorders');

require("firebase/functions");

export default class PaymentScreen extends React.Component{

    onButtonPress = () =>{
        const { navigate } = this.props.navigation;
        navigate('Confirmation');
        this.saveTransactionOnServer();
    }

    saveTransactionOnServer = () =>{
        add.addOrder(null, null);
        //---------------use DB directly----------
        // var config = {
        //     apiKey: "AIzaSyBAMUXFxgwK5vks7SBQ6EDnMaYuNRIT5Yc",
        //     authDomain: "pizzadelivery-38e91.firebaseapp.com",
        //     databaseURL: "https://pizzadelivery-38e91.firebaseio.com/",
        //     storageBucket: "pizzadelivery-38e91.appspot.com"
        // };
        // firebase.initializeApp(config);

        // firebase.database().ref('orders/' + 'manbendra').set({
        //     pizza: 5,
        //     beverage: 6,
        //     sides : 7
        //   });

        //----------------------------------------

        //-----------code to use cloud function--------------
        // var token = this.props.screenProps.authToken;
        // console.log("auth token passed to server", token);
        // fetch('https://us-central1-pizzadelivery-38e91.cloudfunctions.net/addOrder',
        //     {method: 'POST',
        //     headers: {
        //         'Authorization': 'Bearer ' + token,
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //       },
        //     body: JSON.stringify({
        //         mobile: this.props.screenProps.mobile,
        //         pizza: this.props.screenProps.pizza,
        //         beverage: this.props.screenProps.beverage,
        //         sides: this.props.screenProps.sides
        //     })
        // });
        //---------------------
    }
    
    getRandomAmount(){
        return Math.floor(Math.random() * 1000);
    }

    render(){
        return(
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>Dummy Payment Page</Text>
                <Text style={styles.amount}>Amount Rs {this.getRandomAmount()}</Text>
                <Button title='PAY' onPress={this.onButtonPress}/>
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
    amount: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }
})