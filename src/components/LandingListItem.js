import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { connect } from 'react-redux';
// import { incrementPizza } from './../sagas'

export default class LandingListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        };
    }
    // _onPressButton = () =>{
    //     this.props.navigation('SelectQty', {name: this.props.name});
    //   }

    _onIncrement = () =>{
        //console.log('dispatch type in landing lsit item');
        //incrementPizza();
        this.props.dispatch({type: 'INCREMENT', item: this.props.name});
        //action({type: INCREMENT, item:'pizza'});
        // this.setState({
        //     quantity: this.state.quantity+1
        // })
    }

    _onDecrement = () =>{
        this.props.dispatch({type: 'DECREMENT', item: this.props.name});
        // if(this.state.quantity >= 1){
        //     this.setState({
        //         quantity: this.state.quantity-1
        //     })
        // }
    }

    render () {
        return(
            //<TouchableHighlight onPress={this._onPressButton} underlayColor="white" style={styles.container}>
                <View style={styles.container}>
                    <Image source={{uri: this.props.imglocation}}
                        style={styles.imagesize}/>
                    <Text style={styles.item}>{this.props.name}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button onPress={this._onIncrement}
                            title=" + " style={styles.button}/>
                        <Text style={styles.item}>{this.props.quantity}</Text>
                        <Button onPress={this._onDecrement}
                            title=" - " style={styles.button}/>
                    </View>
                </View>
                
            //</TouchableHighlight>
        );
    }
}


const styles = StyleSheet.create({
    imagesize: {
        width: 100,
        height: 100
    },
    item: {
        textAlign: 'center',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white', 
        marginBottom: 5, 
        flexDirection: 'row', 
        padding: 10
    },
    button: {
        padding: 10,
        width: 30
    }
})