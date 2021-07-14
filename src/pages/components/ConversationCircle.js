import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Thumbnail } from "native-base";
import ProgressCircle from "react-native-progress-circle";

class ConversationCircle extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={{
          height: "100%",
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ProgressCircle
          percent={30}
          radius={25}
          borderWidth={5}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Thumbnail source={item.url} style={{ width: 40, height: 40 }} />
        </ProgressCircle>
        <Text style={{ fontWeight: "bold", marginTop: 5 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export default ConversationCircle;
