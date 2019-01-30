import React from 'react';
import {ActivityIndicator, Button, FlatList, Text, ToastAndroid, View} from 'react-native';
import FKPlatform from "fk-platform-sdk"
var getOrders = require('../server/getOrders.js');
var loginHelper = require('../LoginHelper.js');
var addorders = require('../server/addorders');
var returnOrder = require('../server/ReturnOrder');
var oms = require('../server/updateOMS.js');

export default class MyOrders extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    /*
     * Fetches the orders placed by the loggedIn user from firebase DB
     */
    fetchOrdersList = (identityToken) => {
        getOrders.getOrders(identityToken).then((datamap) => {
            const datamaparr = Object.keys(datamap).map(key => datamap[key])
            this.setState({
                isLoading: false,
                listData: datamaparr
            });
        })
    }

    componentDidMount(){
        if(FKPlatform.isPlatformAvailable()){
            //checking if we are already logged in, if not we start ultra login step below
            if(this.props.screenProps.identityToken === undefined){
                loginHelper.ultraSignIn()
                .then((user) => {
                    this.props.screenProps.dispatch({type: 'UPDATE_IDENTITY_TOKEN', identityToken: user.identityToken});
                    this.fetchOrdersList(user.identityToken);
                });
            }else{
                this.fetchOrdersList(this.props.screenProps.identityToken);
            }
        }else{
            //Non Ultra flow, directly fetch orders list from DB
            var token = this.props.screenProps.authToken;
            return fetch('https://us-central1-pizzadelivery-38e91.cloudfunctions.net/getOrders',
                {method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.props.screenProps.mobile
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                const datamap = responseJson;
                const datamaparr = Object.keys(datamap).map(key => datamap[key])
                this.setState({
                    isLoading: false,
                    listData: datamaparr
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    onOrderCancel = (orderId) =>{
        var identityToken;
        if(FKPlatform.isPlatformAvailable()){
            identityToken = this.props.screenProps.identityToken;
        }else{
            identityToken = '8123456789';
        }

        returnOrder.returnOrder(orderId).then((response)=> {
            if(response === true) {
                req = {
                    orderId: orderId,
                    identityToken: identityToken
                }
                addorders.returnOrder(req);
                this.updateOrderInState(orderId);
                oms.updateOMSAfterRefund({
                    orderId: orderId
                });
            }else {
                ToastAndroid.show('Failed to cancel the order', ToastAndroid.SHORT);
            }
            
        });
    }

    updateOrderInState = (orderId) => {
        var listCopy = this.state.listData.slice();
        for(i = 0; i < listCopy.length; i++){
            if(listCopy[i].orderId == orderId){
                listCopy[i].state = 'REFUNDED';
                break;
            }
        }
        //To re render screen with updated orders list
        this.setState({
            isLoading: false,
            listData: listCopy
        });
    }

    render () {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
        }

        return (
            <FlatList
                data={this.state.listData}
                renderItem={({item}) => <View style={{flexDirection: 'row', padding: 10, flex: 1, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', padding: 10}}>
                        <Text>Pizza, {item.pizza}</Text>
                        <Text>Beverage, {item.beverage}</Text>
                        <Text>Sides, {item.sides}</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        { item.state === 'REFUNDED' && <Text>Cancelled</Text>}
                        { item.state === 'PAID' && <Button onPress={() => this.onOrderCancel(item.orderId)} title="Cancel Order"/>}
                    </View>
                </View>
                }
            />
        );
    }
}