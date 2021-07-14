import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class InfoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current
    };
  }

  render() {
    const { selected, item, onPress } = this.props;
    if (selected) {
      return (
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => onPress(item)}
        >
          <Text style={{ color: "white", zIndex: 100 }}>{item.name}</Text>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#FA986C", "#F97579", "#F75385"]}
            style={styles.linearGradient}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.buttonItem} onPress={() => onPress(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonItem: {
    width: "90%",
    height: 45,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 10
  }
});

export default InfoButton;
