import React, { Component } from "react";
import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import Card from "../components/Card";

const { width } = Dimensions.get("window");

const users = [
    {
        text: "Screen 1",
        image: require("../../assets/home/other_profile1.jpg"),
        verified: false
    },
    {
        text: "Screen 2",
        image: require("../../assets/home/other_profile2.jpg"),
        verified: true
    },
    {
        text: "Screen 3",
        image: require("../../assets/home/other_profile3.jpg"),
        verified: false
    }
];

class Discover extends Component {
    render() {
        return (
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    flexDirection: "column"
                }}
            >
                <ScrollView
                    scrollEventThrottle={16}
                    horizontal
                    pagingEnabled
                    style={styles.scrollView}
                >
                    {users.map((user, index) => {
                        return (
                            <Card
                                text={user.text}
                                image={user.image}
                                index={index}
                                key={index}
                                photoVerify={user.verified}
                                first={index === 0}
                                last={index === users.length - 1}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flexDirection: "row"
    }
});

export default Discover;
