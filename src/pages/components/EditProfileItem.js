import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

class EditProfileItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.listItem} onPress={this.props.onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={this.props.icon}
            style={{ width: 20, height: 15, resizeMode: "contain" }}
          />
          <Text style={{ color: "black", marginStart: 15 }}>
            {this.props.text}
          </Text>
        </View>
        {this.props.selected !== "" ? (
          <Text>{this.props.selected}</Text>
        ) : (
          <Image
            source={require("../../assets/home/black_plus.png")}
            style={styles.plus}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 45,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  plus: {
    width: 12,
    height: 12,
    resizeMode: "contain"
  }
});

export default EditProfileItem;
