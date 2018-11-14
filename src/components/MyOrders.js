import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import FKPlatform from "fk-platform-sdk"
var getOrders = require('../server/getOrders.js');
var loginHelper = require('../LoginHelper.js');

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
                renderItem={({item}) => <View style={{flexDirection: 'column', padding: 10}}>
                    <Text>Pizza, {item.pizza}</Text>
                    <Text>Beverage, {item.beverage}</Text>
                    <Text>Sides, {item.sides}</Text>
                </View>
            }
            />
        );
    }
}