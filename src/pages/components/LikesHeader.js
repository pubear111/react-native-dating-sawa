import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { LinearTextGradient } from "react-native-text-gradient";

const { width } = Dimensions.get("window");

class TimerThumbnail extends Component {
  render() {
    const { liked } = this.props;
    return (
      <View style={styles.likesHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this.props.changeTab(false)}
        >
          {liked ? (
            <Text style={styles.text}>Liked You</Text>
          ) : (
            <LinearTextGradient
              style={{ fontSize: 16 }}
              locations={[0, 1]}
              colors={["#FA986C", "#F75385"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
                Liked You
            </LinearTextGradient>
          )}
        </TouchableOpacity>
        <View style={styles.saparator} />
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this.props.changeTab(true)}
        >
          {!liked ? (
            <Text style={styles.text}>Liked</Text>
          ) : (
            <LinearTextGradient
              style={{ fontSize: 16 }}
              locations={[0, 1]}
              colors={["#FA986C", "#F75385"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
                Liked
            </LinearTextGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  likesHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EBEBEB"
  },
  saparator: {
    width: 1,
    height: 40,
    backgroundColor: "#EBEBEB"
  },
  headerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    color: "#DCDCDC"
  }
});

export default TimerThumbnail;
