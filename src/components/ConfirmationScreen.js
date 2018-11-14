import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class ConfirmationScreen extends React.Component{

    onButtonPress = () =>{
        const { navigate } = this.props.navigation;
        navigate('Orders');
    }

    render(){
        return(
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>Order Confirmed.</Text>
                <Text style={styles.textitem}>Order Id: {this.props.screenProps.orderId}</Text>
                <Button title='Click to view your orders' onPress={this.onButtonPress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textitem: {
        textAlign: 'center',
        padding: 10,
        fontSize: 24
    }
})