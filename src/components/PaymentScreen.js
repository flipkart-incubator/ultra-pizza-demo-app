import React from 'react';
import {ActivityIndicator, Button, DeviceEventEmitter, StyleSheet, Text, View} from 'react-native';
var addOrderInServer = require('../server/addorders');
var payments = require('../server/Payments');
var userDetailsScreen = require('./UserDetailScreen');
var oms = require('../server/updateOMS.js');
import FKPlatform from "fk-platform-sdk"

require("firebase/functions");


export default class PaymentScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading: true};
    }

    onButtonPress = () =>{
        this.saveTransactionOnServer();
        const { navigate } = this.props.navigation;
        navigate('Confirmation');
    }

    saveTransactionOnServer = () =>{
        var orderId = Math.floor(Math.random() * 1000000);
        console.log('Saving order with id',orderId);

        this.props.screenProps.dispatch({type: 'UPDATE_ORDERID', orderId: orderId});
        var identityToken;
        if(FKPlatform.isPlatformAvailable()){
            identityToken = this.props.screenProps.identityToken;
        }else{
            identityToken = '8123456789';
        }
        req = {
            pizza: this.props.screenProps.pizza,
            beverage: this.props.screenProps.beverage,
            sides: this.props.screenProps.sides,
            state: 'PENDING_PAYMENT',
            orderId: orderId,
            identityToken: identityToken
        }
        //Server call to save order in firebase DB.
        addOrderInServer.addOrder(req);
    }
    
    getRandomAmount(){
        return Math.floor(Math.random() * 1000);
    }

    componentDidMount(){
        if(FKPlatform.isPlatformAvailable()){
            //Declaring observer for payment gateway response
            const onSessionConnect = (event) => {
                if(event.loadUri === undefined){
                    //ignore this event
                }else if(event.loadUri === "/success"){
                    this.saveTransactionOnServer();
                    //push order to OMS
                    oms.updateUltraOMS({
                        orderId: this.props.screenProps.orderId
                    });
                    const { navigate } = this.props.navigation;
                    navigate('Confirmation');
                }else if(event.loadUri === "/failure"){
                    const { navigate } = this.props.navigation;
                    navigate('PaymentFailure');
                }
                
            };
            //registering observer for payment gateway callback
            DeviceEventEmitter.addListener('loadUri', onSessionConnect);
            
            var req = {
                amount: (this.getRandomAmount()+50)*100,
                itemCount: this.props.screenProps.pizza + this.props.screenProps.beverage + this.props.screenProps.sides
            }
            //Server call to fetch payment token
            payments.getPaymentToken(req).then((response)=> {
                let navigationModule = userDetailsScreen.fkPlatform.getModuleHelper().getNavigationModule();
                // Start payment using client side sdk and pass payment tpken received from server.
                navigationModule.startPayment(response.token)
            });
        }else{
            this.setState({
                isLoading: false
            })
        }
    }

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <Text style={styles.textitem}>Transacting...</Text>
                <ActivityIndicator/>
              </View>
            )
        }
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