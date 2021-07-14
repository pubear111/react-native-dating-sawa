import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Thumbnail } from "native-base";
import LinearGradient from "react-native-linear-gradient";

class ConversationItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        style={styles.vertical_flatList_button}
        onPress={() => this.props.navigation.navigate("Chat")}
      >
        <View
          style={{
            height: "100%",
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Thumbnail source={item.url} style={{ width: 60, height: 60 }} />
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 4, flexDirection: "column" }}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={{ marginStart: 10, fontWeight: "bold" }}>
                {item.name}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#DCDCDC", marginStart: 10 }}>
                {item.lastMessage}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ height: 18, aspectRatio: 4, marginStart: 10 }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#FA986C", "#F97579", "#F75385"]}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ fontSize: 12, color: "white" }}>Accept</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 18,
                  aspectRatio: 4,
                  borderRadius: 10,
                  backgroundColor: "#F7F7F7",
                  borderWidth: 1,
                  borderColor: "lightgray",
                  marginStart: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 12 }}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ marginBottom: 5 }}>{item.lastTime}</Text>
            <Text
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#FA986D",
                color: "white",
                textAlign: "center"
              }}
            >
              {item.unReadMessage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  vertical_flatList_button: {
    width: "100%",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    flexDirection: "row"
  }
});

export default ConversationItem;
