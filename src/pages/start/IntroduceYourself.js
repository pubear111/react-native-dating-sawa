import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {RaisedTextButton} from 'react-native-material-buttons';
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';
import Back_button_white from '../components/Back_button_white';
import consume from "../../contexts/GlobalConsumer";
import * as UserFunctions from '../../contexts/user/UserFunctions'
import {Toast} from 'native-base'

class IntroduceYourselfScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    onPressNext = () => {
        const {user} = this.props
        if (user.state.name === "") {
            Toast.show({
                text: "Please enter your name!",
                // buttonText: "Okay",
                duration: 3000
            })
        } else if (user.state.password === '') {
            Toast.show({
                text: "Please enter your password!",
                // buttonText: "Okay",
                duration: 3000
            })
        } else if (user.state.password !== user.state.confirmPassword || user.state.password === '') {
            Toast.show({
                text: "Confirm Password is not identical!",
                // buttonText: "Okay",
                duration: 3000
            })
        } else {
            if (UserFunctions.showCurrentOld(user.state.date) < 18) {
                Toast.show({
                    text: "You are young!",
                    // buttonText: "Okay",
                    duration: 3000
                })
            } else {
                this.props.navigation.navigate('BuildYourProfile')
            }
        }
    }


    render() {
        const {user} = this.props
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA976D', '#F9737A', '#F75485']} style={{flex: 1}}>
                <View style={styles.topBar}>
                    <Back_button_white navigation={this.props.navigation}/>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white', marginStart: 10}}>Introduce yourself</Text>
                </View>
                <ScrollView style={styles.main}>
                    <Text style={styles.title}>Fill out the rest of your details so {'\n'} people know a little more about you.</Text>
                    <View style={{width: '90%', marginTop: 15, alignSelf: "center"}}>
                        <Text style={styles.sub_title}>I identify as a...</Text>
                        <View style={{width: '50%', height: 40, position: 'absolute', left: 0, top: 25, alignItems: 'center'}}>
                            <RadioGroup style={{alignSelf: "flex-start"}} radioButtons={user.state.gender} onPress={user.onPressGender} flexDirection='row'/>
                        </View>
                        <Text style={[styles.sub_title, {marginTop: 50}]}>Name</Text>
                        <TextInput style={styles.TextInput}
                                   placeholder="Type here..."
                                   onChangeText={(name) => user.onNameChange(name)}
                                   value={user.state.name}/>
                        <Text style={[styles.sub_title, {marginTop: 10}]}>Birthday</Text>
                        <TouchableOpacity
                            style={{width: '100%', height: 45, borderRadius: 5, backgroundColor: '#F7F7F7', marginTop: 10, paddingStart: 10, justifyContent: "center"}}
                            onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
                            <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14}}>{UserFunctions.showDate(user.state.date)}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.sub_title, {marginTop: 10}]}>Password</Text>
                        <TextInput style={styles.TextInput} secureTextEntry={true}
                                   placeholder="Type here..."
                                   onChangeText={(password) => user.onPasswordChange(password)}
                                   value={user.state.password}/>
                        <Text style={[styles.sub_title, {marginTop: 10}]}>Confirm password</Text>
                        <TextInput style={styles.TextInput} secureTextEntry={true}
                                   placeholder="Type here..."
                                   onChangeText={(confirmPassword) => user.onPasswordConfirmChange(confirmPassword)}
                                   value={user.state.confirmPassword}/>
                        <TouchableOpacity style={{width: '100%', marginTop: 20}} onPress={this.onPressNext}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA986C', '#F97579', '#F75385']} style={styles.button}>
                                <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 16, fontWeight: "bold", color: 'white'}}>SAVE</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Modal animationType={"fade"} isVisible={this.state.modalVisible} style={{borderRadius: 20}}>
                            <View style={{backgroundColor: 'white'}}>
                                <DatePicker date={user.state.date} mode={'date'}
                                            onDateChange={(date) => user.onDateChange(date)}/>
                            </View>
                            <View style={{backgroundColor: 'white', marginTop: 20}}>
                                <RaisedTextButton title='OK' titleColor="black" color="white" onPress={() => this.setState({modalVisible: !this.state.modalVisible})}/>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        height: '12%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10
    },
    main: {
        width: '100%',
        height: '88%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        flexDirection: "column"
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 14,
        color: 'darkgray',
        textAlign: 'center',
        marginTop: 15
    },
    sub_title: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 14,
        fontWeight: "bold",
        color: '#06324D'
    },
    TextInput: {
        width: '100%',
        height: 45,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        marginTop: 10,
        paddingStart: 10,
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 14
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default consume(IntroduceYourselfScreen)