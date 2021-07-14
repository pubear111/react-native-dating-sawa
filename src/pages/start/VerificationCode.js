import React, {Component} from 'react';
import {AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Back_button_pink from '../components/Back_button_pink';
import Wave_background from '../components/Wave_background';
import consume from "../../contexts/GlobalConsumer";
import {Toast} from 'native-base'

class VerificationCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            verifyCode: undefined
        }
    }

    next = async () => {
        const {auth} = this.props
        this.setState({isFetching: true})
        auth.verifyAccount(this.state.verifyCode).then((response) => {
            this.setState({isFetching: false})
            if (response.code === 1) {
                const sessionId = response.data.session_id
                AsyncStorage.setItem('sessionId', sessionId);
                this.props.navigation.navigate('App')
            } else {
                Toast.show({
                    text: "Invalid code",
                    duration: 3000
                })
            }
        }).catch(error => {
            this.setState({isFetching: false})
            console.log(error)
        })
    }

    resendCodePress = () => {
        const {auth} = this.props
        this.setState({isFetching: true})
        auth.resendCode().then((response) => {
            this.setState({isFetching: false})
            if (response.code === 1) {
                Toast.show({
                    text: "Resend code success",
                    // buttonText: "Okay",
                    duration: 3000
                })
            }
        }).catch(error => {
            this.setState({isFetching: false})
            console.log(error)
        })
    }

    render() {

        const {navigation, auth} = this.props;

        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Back_button_pink navigation={this.props.navigation}/>
                <Wave_background/>
                <View style={{flex: 1, flexDirection: "column"}}>
                    <View style={{flex: 3, alignItems: "center", justifyContent: 'flex-end'}}>
                        {this.state.isFetching ? (
                            <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        ) : (
                            <Image source={require("../../assets/start/logo_with_text.png")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        )}
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 20, fontWeight: "bold", color: '#FBB06E'}}>Know me better</Text>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", color: 'black', marginTop: 10}}>Verification Code</Text>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", color: 'darkgray', marginTop: 5}}>Sent to {auth.state.email}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", color: '#F74A89', marginTop: 5}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, alignItems: "center", justifyContent: "center"}}>
                        <SmoothPinCodeInput
                            placeholder="*"
                            cellStyle={{borderRadius: 5, marginStart: 10, backgroundColor: '#F7F7F7'}}
                            cellSize={40}
                            codeLength={4}
                            keyboardType='number-pad'
                            value={this.state.verifyCode}
                            onTextChange={verifyCode => this.setState({verifyCode})}/>
                        <TouchableOpacity onPress={this.resendCodePress}>
                            <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", color: '#F7538F', marginTop: 15}}>Resend the code?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity style={{alignItems: "center"}} onPress={this.next} disabled={this.state.isFetching}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA986C', '#F97579', '#F75385']}
                                            style={styles.button}>
                                <Text style={styles.button_text}>VERIFY NOW</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default consume(VerificationCodeScreen)