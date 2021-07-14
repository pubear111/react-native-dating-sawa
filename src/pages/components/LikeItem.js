import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Thumbnail } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import ProgressCircle from "react-native-progress-circle";
import { LinearTextGradient } from "react-native-text-gradient";
import TimerThumbnail from "./TimerThumbnail";
import RoundedButton from "./RoundedButton";

class LikedActions extends Component {
  render() {
    const { item } = this.props;
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={{ marginStart: 10, fontWeight: "bold" }}>
            {item.name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <LinearTextGradient
            style={{ marginStart: 10 }}
            locations={[0, 1]}
            colors={["#FA986C", "#F75385"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            Join Conversation
          </LinearTextGradient>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <RoundedButton text="Accept" gradient />
          <RoundedButton text="Decline" />
          <RoundedButton text="Block" />
        </View>
      </View>
    );
  }
}

class LikedYouStatus extends Component {
  render() {
    const { item } = this.props;
    return (
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text style={{ marginStart: 10, fontWeight: "bold", fontSize: 16 }}>
            {item.name}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <RoundedButton
            text={item.accepted ? "Accepted" : "Waiting for Response"}
            gradient={item.accepted}
            disabled
          />
        </View>
      </View>
    );
  }
}

class LikeItem extends Component {
  render() {
    const { item, liked } = this.props;
    return (
      <View style={styles.vertical_flatList_button}>
        <TimerThumbnail item={item} />
        {liked ? <LikedYouStatus item={item} /> : <LikedActions item={item} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vertical_flatList_button: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 10
  },
  countCircle: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12.5,
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "red",
    zIndex: 100
  }
});

export default LikeItem;
