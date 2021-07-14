import React, { Component } from 'react';
import {Alert, AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Back_button_pink from '../components/Back_button_pink';
import Wave_background from '../components/Wave_background';
import consume from "../../contexts/GlobalConsumer";
import {empty} from "../../helpers/functions";


class PasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            isFetching: false,
        }
    }

    next = () => {
        if (this.state.password === "") {
            Alert.alert('Please enter your password!')
        } else {
            const {auth} = this.props
            this.setState({isFetching: true})
            auth.login(this.state.password).then((response) => {
                this.setState({isFetching: false})
                if (response.code === 1) {
                    const sessionId = response.data.session_id
                    const user = response.data.user
                    AsyncStorage.setItem('sessionId', sessionId);
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    if(!empty(user)) this.props.user.setUserSettings(user)
                    this.props.navigation.navigate('App')
                } else {
                    Alert.alert('Wrong Password!')
                }
            }).catch(error => {
                this.setState({isFetching: false})
                console.log(error)
            })
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Back_button_pink navigation={this.props.navigation} />
                <Wave_background />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
                        {this.state.isFetching ? (
                            <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        ) : (
                            <Image source={require("../../assets/start/logo_with_text.png")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        )}
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 20, fontWeight: "bold", color: '#FBB06E' }}>Know me better</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TextInput style={styles.TextInput}
                                secureTextEntry={true}
                                placeholder="Enter your password"
                                onChangeText={(password) => this.setState({ password: password })}
                                value={this.state.password} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ alignContent: 'flex-end' }} onPress={()=>this.props.navigation.navigate("ForgetPassword")}>
                                <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 16 }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-around', padding: 5 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.next} disabled={this.state.isFetching}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA986C', '#F97579', '#F75385']} style={styles.button}>
                                <Text style={styles.button_text}>SUBMIT</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center', flexDirection: "row" }}>
                            <TouchableOpacity>
                                <Text style={styles.text}>Terms and conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginStart: '5%' }}>
                                <Text style={styles.text}>Privacy policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    TextInput: {
        width: '90%',
        height: 45,
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16
    },
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
        fontWeight: "bold",
        color: 'white'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
});


export default consume(PasswordScreen)