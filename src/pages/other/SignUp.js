import React, { Component } from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from "react-native-fbsdk";
import Wave_background from '../components/Wave_background';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLogged: true,
      email: 'admin@admin.com',
      password: '12345qwert'
    }
    // Login.self = this;
  }

  async componentWillMount() {
    let value = await AsyncStorage.getItem('isLogged')
    if (value == "true") {
      this.props.navigation.navigate('OnBoarding')
    } else {
      this.setState({ isLogged: false })
      var that = this
      BackHandler.addEventListener('hardwareBackPress', function () {
        that.props.navigation.navigate('LoginHome')
        return true;
      });
      // recover previous data
      this.props.actions.verifyToken();
    }
  }

  login = () => {
    const { email, password } = this.state;
    console.log('i am logging');
    this.props.actions.login({ email, password }, this.loginFailed);
  };

  loginFailed = () => {
    return Alert.alert(
      "Authentication Failed",
      "Incorrect email/password",
      [{ text: "OK", onPress: () => null }],
      { cancelable: true }
    );
  };

  _responseInfoCallback = (error, result) => {
    console.log('mememe', result);
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log('result', result);
      this.props.actions.fblogin(result.name, result.id, result.email, result.picture.data.url, this.loginFailed)
    }
  }

  fblogin = () => {
    LoginManager.logInWithReadPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data.accessToken.toString());
              this.props.navigation.navigate('BuildYourProfile')
              const infoRequest = new GraphRequest('/me', {
                parameters: {
                  fields: {
                    string: 'email,name,id,picture' // what you want to get
                  },
                  access_token: {
                    string: data.accessToken.toString() // put your accessToken here
                  }
                }
              },
                Login.self._responseInfoCallback,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          );
        }
      },
      function (error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  render() {
    if (this.state.isLogged)
      return null
    else
      return (
        <View style={{ backgroundColor: 'white', flex: 1, flexDirection: "column" }}>
          <Wave_background />
          <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../assets/logo.png")} style={{ width: 120, height: 120, resizeMode: "contain" }} />
            <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 20, fontWeight: "bold", color: '#FBB06E' }}>Know me better</Text>
          </View>
          <View style={{ flex: 2, alignItems: "center", justifyContent: "space-around" }}>
            <TouchableOpacity style={[styles.TouchableOpacity, { backgroundColor: '#3B5998' }]} onPress={this.fblogin}>
              <Image source={require("../assets/white_facebook.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginStart: '10%' }}>Login with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TouchableOpacity, { backgroundColor: '#F54A4A' }]} onPress={() => this.props.navigation.navigate('EnterEmail')}>
              <Image source={require("../assets/white_mail.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginStart: '10%' }}>Login with Email</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 12 }}>Don't worry! We never post to facebook.</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <TouchableOpacity>
                <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 12, borderBottomWidth: 1, borderBottomColor: 'darkgray' }}>Terms and conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginStart: '5%' }}>
                <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 12, borderBottomWidth: 1, borderBottomColor: 'darkgray' }}>Privacy policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      );
  }
}

const styles = StyleSheet.create({
  TouchableOpacity: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    paddingStart: '20%',
    flexDirection: "row"
  }
});