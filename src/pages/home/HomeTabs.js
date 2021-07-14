import React, { Component } from "react";
import { Thumbnail } from "native-base";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

class HomeTabs extends Component {
    render() {
        return (
            <View
                style={{
                    height: "10%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        flexDirection: "row"
                    }}
                >
                    <TouchableOpacity
                        style={styles.topBar_button}
                        onPress={() => this.props.navigation.navigate("EditProfile")}
                    >
                        <Thumbnail
                            source={require("../../assets/home/profile.png")}
                            style={{ height: 20, resizeMode: "contain" }}
                        />
                        <Text style={{ fontSize: 10, marginTop: 5 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.topBar_button}
                        onPress={() => this.props.goTo("Discover")}
                    >
                        <Image
                            source={
                                this.props.location === "Discover"
                                    ? require("../../assets/home/pink_discover.png")
                                    : require("../../assets/home/gray_discover.png")
                            }
                            style={{ height: 18, resizeMode: "contain" }}
                        />
                        <Text style={{ fontSize: 10, marginTop: 5 }}>Discover</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.topBar_button}
                        onPress={() => this.props.goTo("Likes")}
                    >
                        <Image
                            source={
                                this.props.location === "Likes"
                                    ? require("../../assets/home/pink_likes.png")
                                    : require("../../assets/home/gray_likes.png")
                            }
                            style={{ height: 18, resizeMode: "contain" }}
                        />
                        <Text style={{ fontSize: 10, marginTop: 5 }}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.topBar_button}
                        onPress={() => this.props.goTo("Conversations")}
                    >
                        <Image
                            source={
                                this.props.location === "Conversations"
                                    ? require("../../assets/home/pink_conversation.png")
                                    : require("../../assets/home/gray_conversation.png")
                            }
                            style={{ height: 20, resizeMode: "contain" }}
                        />
                        <Text style={{ fontSize: 10, marginTop: 5 }}>Conversations</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topBar_button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default HomeTabs;
