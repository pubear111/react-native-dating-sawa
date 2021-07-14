import { Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Back_button_white from '../components/Back_button_white';

export default class ChatScreen extends Component {

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello there! Need help? Reach out to us right here, and we will get back to you as soon as we want!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))
  }


  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA986C', '#F97579', '#F75385']}
          style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginStart: 10, flexDirection: "row", alignItems: "center" }}>
            <Back_button_white navigation={this.props.navigation} />
            <Thumbnail source={require("../../assets/home/profile.png")} style={{ width: 40, height: 40, marginStart: 10 }} />
            <View style={{ marginStart: 10 }}>
              <Text style={{ color: 'white' }}>Jonathan</Text>
              <View style={{ marginTop: 5, height: 16, aspectRatio: 4, borderRadius: 8, backgroundColor: 'white', alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Icon name="circle" size={8} color="#28C563" />
                <Text style={{ fontSize: 10, marginStart: 5 }}>Online</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 7 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});