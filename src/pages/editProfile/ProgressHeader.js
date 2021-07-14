import { Header, Icon, Thumbnail } from "native-base";
import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default class ProgressHeader extends Component {
  render() {
    return (
      <Header style={{ elevation: 0, backgroundColor: "white", height: 80 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity onPress={this.props.toggleModal}>
            <Icon name="close" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#E0E0E0",
              height: 1,
              width: "75%",
              margin: 10,
              alignSelf: "center"
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#FA986C", "#F97579", "#F75385"]}
              style={[
                styles.linearGradient,
                { width: `${this.props.progress || 0}%` }
              ]}
            />
          </View>
          <Thumbnail
            source={require("../../assets/home/profile.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 1
  }
});
