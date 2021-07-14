import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Thumbnail } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import ProgressCircle from "react-native-progress-circle";

const colors = ["#df0b2c", "#e29a2c", "#fd7050", "#fd7050"];

class LikeItem extends Component {
  render() {
    const { item } = this.props;
    const circleColor = item.accepted
      ? "#43f246"
      : colors[Math.floor(((item.hours / 24) * 100) / 33.3333)];

    return (
      <View
        style={{
          height: 80,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ProgressCircle
          percent={item.accepted ? 100 : (item.hours / 24) * 100}
          radius={35}
          borderWidth={5}
          color={circleColor}
          shadowColor="#DADADA"
          bgColor="#fff"
        >
          <Thumbnail source={item.url} style={{ width: 80, height: 80 }} />
        </ProgressCircle>
        {!item.accepted && (
          <View style={[styles.countCircle, { backgroundColor: circleColor }]}>
            <Text style={{ color: "white" }}>{item.hours}</Text>
          </View>
        )}
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
    zIndex: 100
  }
});

export default LikeItem;
