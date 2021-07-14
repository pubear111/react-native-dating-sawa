import { Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import GeolocationExample from '../components/GeolocationExample';
import OfflineNotice from '../components/OfflineNotice';

const SCREEN_WIDTH = Dimensions.get("window").width;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={styles.scrollPage}>
        <Animated.View style={[styles.screen, transitionAnimation(this.props.index)]}>
          <Image source={this.props.image} style={{ width: '100%', height: '100%', borderRadius: 25, position: "absolute" }} />
          <View style={{ width: '95%', height: 200, position: "absolute", bottom: 10, alignSelf: 'center', alignItems: "center" }}>
            <Image source={require("../../assets/home/background.png")} style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute' }} />
            <View style={{ width: '90%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around', marginTop: -35 }}>
              <TouchableOpacity>
                <Image source={require("../../assets/home/white_pass.png")} style={{ width: 60, height: 60, resizeMode: "contain" }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../../assets/home/white_play.png")} style={{ width: 80, height: 80, resizeMode: "contain" }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../../assets/home/white_heart.png")} style={{ width: 60, height: 60, resizeMode: "contain" }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '80%', flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Bella, 24</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require("../../assets/home/black_location.png")} style={{ width: 20, height: 15, resizeMode: 'contain' }} />
                  <Text>3 miles</Text>
                </View>
              </View>
              <Text style={{ fontSize: 14, fontFamily: 'monospace', justifyContent: 'flex-end' }}>Hi, My name is Bella. I leaved in New York, Lorem ipsum dolor sit amet, consectetur adipiscidui leo blandit libero, nec mattis dolor lacus et orcing elit</Text>
            </View>
          </View>
          <Modal animationType={"fade"} isVisible={this.state.modalVisible}>
            <View style={{ width: 300, height: 200, borderRadius: 20, backgroundColor: 'white', padding: 20, alignSelf: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: 'black' }}>Interested in "Bella"</Text>
              <Text style={{ textAlign: "center", marginTop: 20 }}>Text for message is going here so user know the message</Text>
              <View style={{ width: '60%', alignSelf: "center", marginTop: 20, flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
                <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#FB4B58', alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                  <Text style={{ color: 'white' }}>SEND</Text>
                </TouchableOpacity>
                <Text>OR</Text>
                <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "#FB4B58", alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                  <Icon name="heart" size={25} color="#FB4B58" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Animated.View>
      </View>
    );
  }
}

const xOffset = new Animated.Value(0);

const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  };
};

export default class HomeScreen extends Component {

  state = {
    horizontal: [
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed"
      }
    ],
    vertical: [
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      },
      {
        "url": require('../../assets/home/profile.png'),
        "name": "Mohammed",
        "lastMessage": "Hey, how it's going?",
        "lastTime": "1h",
        "unReadMessage": "3"
      }
    ],
    discover: true,
  }

  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA976D', '#F9737A', '#F75485']} style={{ flex: 1 }}>
        <OfflineNotice />
        <GeolocationExample />
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
            <Image source={require("../../assets/home/white_settings.png")} style={{ width: 20, resizeMode: "contain" }} />
          </TouchableOpacity>
          <Image source={require("../../assets/home/white_logo.png")} style={{ width: 50, resizeMode: "contain" }} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter')}>
            <Image source={require("../../assets/home/white_filter.png")} style={{ width: 20, resizeMode: "contain" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ width: '100%', height: '100%', flex: 1, flexDirection: "row" }}>
              <TouchableOpacity style={styles.TouchableOpacity_Type_One} onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Thumbnail source={require("../../assets/home/profile.png")} style={{ width: '25%', height: '40%', resizeMode: "contain" }} />
                <Text style={{ fontSize: 10, marginTop: 5 }}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.TouchableOpacity_Type_One} onPress={() => this.setState({ discover: true })}>
                <Image source={this.state.discover ? require("../../assets/home/pink_discover.png") : require("../../assets/home/gray_discover.png")} style={{ width: '25%', height: '40%', resizeMode: "contain" }} />
                <Text style={{ fontSize: 10, marginTop: 5 }}>Discover</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.TouchableOpacity_Type_One} onPress={() => this.setState({ discover: false })}>
                <Image source={this.state.discover ? require("../../assets/home/gray_conversation.png") : require("../../assets/home/pink_conversation.png")} style={{ width: '25%', height: '40%', resizeMode: "contain" }} />
                <Text style={{ fontSize: 10, marginTop: 5 }}>Conversation</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 9, alignItems: "center" }}>
            {
              this.state.discover
                ? <View style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'column' }} hide={this.state.discover}>
                  <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                      { useNativeDriver: true }
                    )}
                    horizontal
                    pagingEnabled
                    style={styles.scrollView}>
                    <Screen text="Screen 1" image={require('../../assets/home/other_profile1.jpg')} index={0} />
                    <Screen text="Screen 2" image={require('../../assets/home/other_profile2.jpg')} index={1} />
                    <Screen text="Screen 3" image={require('../../assets/home/other_profile3.jpg')} index={2} />
                  </Animated.ScrollView>
                </View>
                : <View style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'column' }} hide={this.state.conversation}>
                  <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#EBEBEB', borderBottomWidth: 1, borderBottomColor: '#EBEBEB', flexDirection: "column", paddingStart: 10, paddingTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>INVITATIONS</Text>
                    <FlatList
                      data={this.state.horizontal}
                      horizontal
                      renderItem={({ item }) =>
                        <TouchableOpacity style={{ height: '100%', aspectRatio: 1, alignItems: "center", justifyContent: "center" }}>
                          <ProgressCircle
                            percent={30}
                            radius={25}
                            borderWidth={5}
                            color="#3399FF"
                            shadowColor="#999"
                            bgColor="#fff">
                            <Thumbnail source={item.url} style={{ width: 40, height: 40 }} />
                          </ProgressCircle>
                          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.name}</Text>
                        </TouchableOpacity>
                      }
                      keyExtractor={item => item.name} />
                  </View>
                  <View style={{ flex: 3, paddingStart: 10, paddingTop: 5, paddingEnd: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>RECEIVED</Text>
                    <FlatList
                      data={this.state.vertical}
                      renderItem={({ item }) =>
                        <TouchableOpacity style={styles.TouchableOpacity_Vertical} onPress={() => this.props.navigation.navigate('Chat')}>
                          <View style={{ height: '100%', aspectRatio: 1, alignItems: "center", justifyContent: "center" }}>
                            <Thumbnail source={item.url} style={{ width: 60, height: 60 }} />
                          </View>
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 4, flexDirection: 'column' }}>
                              <View style={{ flex: 1, justifyContent: "flex-end" }}><Text style={{ marginStart: 10, fontWeight: 'bold' }}>{item.name}</Text></View>
                              <View style={{ flex: 1 }}><Text style={{ color: '#DCDCDC', marginStart: 10 }}>{item.lastMessage}</Text></View>
                              <View style={{ flex: 1, flexDirection: "row" }}>
                                <TouchableOpacity style={{ height: 18, aspectRatio: 4, marginStart: 10 }}>
                                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA986C', '#F97579', '#F75385']}
                                    style={{ width: '100%', height: '100%', borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>Accept</Text>
                                  </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 18, aspectRatio: 4, borderRadius: 10, backgroundColor: '#F7F7F7', borderWidth: 1, borderColor: 'lightgray', marginStart: 10, alignItems: "center", justifyContent: "center" }}>
                                  <Text style={{ fontSize: 12 }}>Decline</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                              <Text style={{ marginBottom: 5 }}>{item.lastTime}</Text>
                              <Text style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#FA986D', color: 'white', textAlign: "center" }}>{item.unReadMessage}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      }
                      keyExtractor={item => item.name}
                    />
                  </View>
                </View>
            }
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: '12%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingStart: 10,
    paddingEnd: 10,
    position: 'absolute',
    top: 0
  },
  container: {
    width: '100%',
    height: '88%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    flexDirection: "column"
  },
  TouchableOpacity_Type_One: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  TouchableOpacity_Vertical: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    flexDirection: 'row'
  },
  scrollView: {
    flexDirection: "row"
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 5
  },
  screen: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    flex: 1,
    flexDirection: 'column'
  }
});