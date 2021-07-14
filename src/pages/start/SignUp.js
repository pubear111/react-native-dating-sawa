import {Text} from 'native-base';
import React, {Component} from 'react';
import {Alert, AsyncStorage, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AccessToken, LoginManager, GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import Swiper from 'react-native-swiper';
import consume from '../../contexts/GlobalConsumer'
import {empty} from "../../helpers/functions";

class SignUpScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: false
        }
        this.accessToken = ''
    }

    fblogin = () => {
        this.setState({isFetching: true})
        const mainThis = this
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {

                            const infoRequest = new GraphRequest(
                                '/me?fields=name,email,picture.width(480).height(480)',
                                null,
                                mainThis._responseInfoCallback
                            );
                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start();
                            mainThis.accessToken = data.accessToken.toString()
                            console.log(mainThis.accessToken);
                        }
                    );
                }
            },
            function (error) {
                alert('Login failed');

            }
        );
    }

    _responseInfoCallback = (error, result) => {
        if (error) {
            console.log(error);
            Alert.alert('Something wrong!')

        } else {
            console.log(result);

            const {auth} = this.props
            const user = {
                ...result,
                token: this.accessToken
            }

            auth.loginFacebook(user).then((response) => {
                this.setState({isFetching: false})
                if (response.code === 1) {
                    const sessionId = response.data.session_id
                    const user = response.data.user
                    AsyncStorage.setItem('sessionId', sessionId);
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    if(!empty(user)) this.props.user.setUserSettings(user)
                    this.props.navigation.navigate('App')
                } else {
                    Alert.alert('Something wrong!')
                }
            }).catch(error => {
                this.setState({isFetching: false})
                console.log(error)
            })
        }
    }


    render() {
        const {lang} = this.props.user.state
        return (
            <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    {this.state.isFetching ? (
                        <Image source={require("../../assets/others/loader.gif")} style={{width: 100, height: 50, resizeMode: "contain"}}/>
                    ) : (
                        <Image source={require("../../assets/start/logo.png")} style={{width: 100, height: 50, resizeMode: "contain"}}/>
                    )}

                </View>
                <View style={{flex: 6}}>
                    <Swiper paginationStyle={{bottom: 5}} activeDotColor='#F7B143'>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>{lang.discover}</Text>
                            <Image source={require("../../assets/start/illustration1.png")} style={{width: '80%', height: '80%', resizeMode: 'cover'}}/>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>Check out the profiles of the people {"\n"} you've crossed paths with</Text>
                            <Image source={require("../../assets/start/illustration2.png")} style={{width: '80%', height: '80%', resizeMode: 'cover'}}/>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.title}>The receiver has 48 hours to answer {"\n"} or the massage will be expired</Text>
                            <Image source={require("../../assets/start/illustration3.png")} style={{width: '80%', height: '80%', resizeMode: 'cover'}}/>
                        </View>
                    </Swiper>
                </View>
                <View style={{flex: 3, alignItems: 'center', justifyContent: 'space-around', padding: 5}}>
                    <TouchableOpacity style={[styles.TouchableOpacity, {backgroundColor: '#3B5998'}]} onPress={this.fblogin}>
                        <Image source={require("../../assets/start/facebook.png")} style={{width: 25, height: 25, resizeMode: 'contain'}}/>
                        <Text style={styles.button_text}>Connect with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.TouchableOpacity, {backgroundColor: '#F54A4A'}]} onPress={() => this.props.navigation.navigate('EnterEmail')}>
                        <Image source={require("../../assets/start/email.png")} style={{width: 25, height: 25, resizeMode: 'contain'}}/>
                        <Text style={styles.button_text}>Connect with Email</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 12}}>Don't worry! We never post to facebook.</Text>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <TouchableOpacity>
                                <Text style={styles.text}>{lang.sign_up.terms_and_conditions}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginStart: '5%'}}>
                                <Text style={styles.text}>{lang.sign_up.privacy_policy}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#FBAB66',
        textAlign: 'center'
    },
    TouchableOpacity: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        paddingStart: '15%',
        flexDirection: "row"
    },
    button_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginStart: '10%'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    }
});

export default consume(SignUpScreen)