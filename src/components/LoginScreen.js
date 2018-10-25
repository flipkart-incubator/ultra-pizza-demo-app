import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class LoginScreen extends React.Component {
    state = { phone: '', otp: '', errorMessage: null }

    render() {
        return(
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Phone Number"
                    onChangeText={phone => this.setState({ phone })}
                    value={this.state.phone}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="OTP"
                    onChangeText={otp => this.setState({ otp })}
                    value={this.state.otp}
                />
                <Button title="Login" onPress={this.handleLogin} />
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })