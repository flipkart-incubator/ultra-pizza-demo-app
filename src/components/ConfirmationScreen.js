import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ConfirmationScreen extends React.Component{

    render(){
        return(
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>Order Confirmed.</Text>
                <Text style={styles.textitem}>Order Id: ZHAUYF65</Text>
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