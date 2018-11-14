import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';

export default class PaymentFailedScreen extends React.Component {
    render () {
        return (
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>Your Payment Failed. Please try after some time</Text>
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