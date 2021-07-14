import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

class TopBar extends Component {
    render() {
        return (
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Settings")}
                >
                    <Image
                        source={require("../../assets/home/white_settings.png")}
                        style={{ width: 20, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
                <Image
                    source={require("../../assets/home/white_logo.png")}
                    style={{ height: 40, resizeMode: "contain" }}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Filter")}
                >
                    <Image
                        source={require("../../assets/home/white_filter.png")}
                        style={{ width: 20, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        width: "100%",
        height: "12%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingStart: 10,
        paddingEnd: 10,
        position: "absolute",
        top: 0
    }
});

export default TopBar;
