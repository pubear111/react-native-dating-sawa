import React, {Component} from 'react';
import {AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Back_button_pink from '../components/Back_button_pink';
import Wave_background from '../components/Wave_background';
import consume from '../../contexts/GlobalConsumer'

class EnterEmailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            code: '',
            isFetching: false,
        }
    }


    next = () => {
        if (this.state.email === "") {
            alert('Please input your email!')
        } else {
            this.validate(this.state.email)
        }
    }

    validate = (text) => {
        const {auth, navigation} = this.props
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(text) === false) {
            alert("Email is a not valid!")
            return false
        } else {

            const {email} = this.state
            this.setState({isFetching: true})
            auth.checkEmail(email).then((userState) => {
                this.setState({isFetching: false})
                if (!userState.isExist) {
                    navigation.navigate('IntroduceYourself')
                } else if (!userState.isActive) {
                    navigation.navigate('NotActive')
                } else if (userState.isExist && userState.isVerified && userState.isProfileCompleted) {
                    navigation.navigate('Password')
                } else if (userState.isExist && !userState.isProfileCompleted) {
                    navigation.navigate('IntroduceYourself')
                } else if (userState.isExist && !userState.isVerified && userState.isProfileCompleted) {
                    navigation.navigate('VerificationCode')
                }
            }).catch((error) => {
                this.setState({isFetching: false})
                console.log(error)
            });
        }
    }


    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Back_button_pink navigation={this.props.navigation}/>
                <Wave_background/>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'flex-end'}}>
                        {this.state.isFetching ? (
                            <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        ) : (
                            <Image source={require("../../assets/start/logo_with_text.png")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        )}
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 20, fontWeight: "bold", color: '#FBB06E'}}>Know me better</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={styles.TextInput}
                                   placeholder="Enter your email address here"
                                   onChangeText={(email) => this.setState({email: email.replace(/^\s+|\s+$/g, "")})}
                                   value={this.state.email}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'space-around', padding: 5}}>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={this.next} disabled={this.state.isFetching}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA986C', '#F97579', '#F75385']} style={styles.button}>
                                <Text style={styles.submitText}>SUBMIT</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center', flexDirection: "row"}}>
                            <TouchableOpacity>
                                <Text style={styles.text}>Terms and conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginStart: '5%'}}>
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
    text: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    submitText: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    }
});

export default consume(EnterEmailScreen)