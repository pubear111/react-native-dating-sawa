import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ConversationItem from "../components/ConversationItem";
import ConversationCircle from "../components/ConversationCircle";

const conversations = {
    horizontal: [
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed"
        }
    ],
    vertical: [
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        }
    ]
};

class Conversations extends Component {
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
                <View
                    style={{
                        flex: 1,
                        borderTopWidth: 1,
                        borderTopColor: "#EBEBEB",
                        borderBottomWidth: 1,
                        borderBottomColor: "#EBEBEB",
                        flexDirection: "column",
                        paddingStart: 10,
                        paddingTop: 5
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
                        INVITATIONS
                    </Text>
                    <FlatList
                        data={conversations.horizontal}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => <ConversationCircle item={item} />}
                        keyExtractor={item => item.name}
                    />
                </View>
                <View
                    style={{ flex: 3, paddingStart: 10, paddingTop: 5, paddingEnd: 10 }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
                        RECEIVED
                    </Text>
                    <FlatList
                        data={conversations.vertical}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <ConversationItem item={item} />}
                        keyExtractor={item => item.name}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default Conversations;
