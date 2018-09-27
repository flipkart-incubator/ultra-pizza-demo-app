import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default class ChooseQuantityScreen extends React.Component {
    constructor(props){
        super(props);
        //this.state = {screentype: this.getScreenNumber()};
        //(this.state.screentype);
    }

    onButtonPress = () => {
        const { navigate } = this.props.navigation;
        navigate('UserDetail');
    }

    // getScreenNumber = () => {
    //     if(this.props.navigation.getParam('name', 'Pizza') == 'Pizza')
    //         return 1;
    //     else if(this.props.navigation.getParam('name', 'Pizza') == 'Beverages')
    //         return 2;
    //     else
    //         return 3;
    // }

    render () {
        let pizzaView;
        if(this.props.screenProps.pizza > 0){
            pizzaView = <Text style={styles.textitem}>{this.props.screenProps.pizza} Pizza</Text>;
        }
        
        let beverageView;
        if(this.props.screenProps.beverage > 0){
            beverageView = <Text style={styles.textitem}>{this.props.screenProps.beverage} beverage</Text>;
        }

        let sidesView;
        if(this.props.screenProps.sides > 0){
            sidesView = <Text style={styles.textitem}>{this.props.screenProps.sides} Sides</Text>;
        }
        

        return (
            <View style={{padding: 20}}>
                <Text style={styles.textitem}>You selected following items</Text>
                {pizzaView}
                {beverageView}
                {sidesView}
                <Button title='CONFIRM' onPress={this.onButtonPress}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textitem: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }
})