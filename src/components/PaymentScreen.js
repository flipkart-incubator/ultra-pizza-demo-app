import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class PaymentScreen extends React.Component{

    onButtonPress = () =>{
        const { navigate } = this.props.navigation;
        navigate('Confirmation');
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