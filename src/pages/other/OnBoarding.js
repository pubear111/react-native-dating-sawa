import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RaisedTextButton } from 'react-native-material-buttons';
import Swiper from 'react-native-swiper';

export default class OnBoardingScreen extends Component {

  render() {
    return (
      <Swiper>
        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: "column", alignItems: "center" }}>
          <RaisedTextButton title='Skip' titleColor="white" color="#ED6186" style={{ position: "absolute", top: 10, right: 10, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Home')} />
          <Image source={require("../assets/start/logo.png")} style={{ width: '20%', height: '15%', resizeMode: "contain", marginTop: '5%' }} />
          <Image source={require("../assets/start/illustration1.png")} style={{ width: '100%', height: '55%', resizeMode: "contain" }} />
          <Text style={{ textAlign: "center", fontSize: 20, color: '#FBAB66' }}>Discover new people and contact {"\n"} who you're interested in.</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: "column", alignItems: "center" }}>
          <RaisedTextButton title='Skip' titleColor="white" color="#ED6186" style={{ position: "absolute", top: 10, right: 10, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Home')} />
          <Image source={require("../assets/start/logo.png")} style={{ width: '20%', height: '15%', resizeMode: "contain", marginTop: '5%' }} />
          <Image source={require("../assets/start/illustration2.png")} style={{ width: '100%', height: '55%', resizeMode: "contain" }} />
          <Text style={{ textAlign: "center", fontSize: 20, color: '#FBAB66' }}>Check out the profiles of the people {"\n"} you've crossed paths with.</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: "column", alignItems: "center" }}>
          <RaisedTextButton title='Skip' titleColor="white" color="#ED6186" style={{ position: "absolute", top: 10, right: 10, borderRadius: 10 }} onPress={() => this.props.navigation.navigate('Home')} />
          <Image source={require("../assets/start/logo.png")} style={{ width: '20%', height: '15%', resizeMode: "contain", marginTop: '5%' }} />
          <Image source={require("../assets/start/illustration3.png")} style={{ width: '100%', height: '55%', resizeMode: "contain" }} />
          <Text style={{ textAlign: "center", fontSize: 20, color: '#FBAB66', marginTop: 5 }}>The receiver has 48 hours to answer {"\n"} or the massage will be expired.</Text>
          <TouchableOpacity style={{ width: '100%', alignItems: "center", marginTop: '5%' }} onPress={() => this.props.navigation.navigate('Home')}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA986C', '#F97579', '#F75385']}
              style={{ width: '90%', height: 50, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontFamily: "monospace", fontWeight: "bold", color: 'white' }}>DISCOVER</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}

