import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
var firebase = require("firebase");

export default class MyOrders extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
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
            //console.log('pizza: ',responseJson.pizza, ', beverage: ',responseJson.beverage,', sides: ',responseJson.sides);
        }).catch((error) => {
            console.error(error);
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