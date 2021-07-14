import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Thumbnail } from "native-base";
import LinearGradient from "react-native-linear-gradient";

class RoundedButton extends Component {
  render() {
    const { gradient, onPress, text, disabled } = this.props;
    if (gradient) {
      return (
        <TouchableOpacity
          style={{
            height: 25,
            paddingHorizontal: 20,
            marginStart: 12.5,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={{ fontSize: 12, color: "white", zIndex: 100 }}>
            {text}
          </Text>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#FA986C", "#F97579", "#F75385"]}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              borderRadius: 12.5
            }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 25,
          paddingHorizontal: 20,
          borderRadius: 12.5,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgray",
          marginStart: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
        disabled={disabled}
      >
        <Text style={{ fontSize: 12 }}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

export default RoundedButton;
