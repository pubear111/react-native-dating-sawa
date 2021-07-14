import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text, FlatList } from "react-native";
import LikesHeader from "../components/LikesHeader";
import LikeItem from "../components/LikeItem";

const { width } = Dimensions.get("window");

const likes = {
    liked: [
        {
            id: "1",
            url: require("../../assets/home/profile.png"),
            name: "Ali",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            accepted: Math.random() >= 0.8,
            hours: Math.floor(Math.random() * 24) + 1,
            unReadMessage: "3"
        },
        {
            id: "2",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            unReadMessage: "3"
        },
        {
            id: "3",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            unReadMessage: "3"
        },
        {
            id: "4",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            unReadMessage: "3"
        },
        {
            id: "5",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            unReadMessage: "3"
        },
        {
            id: "6",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "7",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "8",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            accepted: Math.random() >= 0.8,
            unReadMessage: "3"
        }
    ],
    likedYou: [
        {
            id: "1",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            unReadMessage: "3"
        },
        {
            id: "2",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            unReadMessage: "3"
        },
        {
            id: "3",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "4",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "5",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            lastTime: "1h",
            hours: Math.floor(Math.random() * 24) + 1,
            unReadMessage: "3"
        },
        {
            id: "6",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "7",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            lastTime: "1h",
            unReadMessage: "3"
        },
        {
            id: "8",
            url: require("../../assets/home/profile.png"),
            name: "Mohammed",
            lastMessage: "Hey, how it's going?",
            hours: Math.floor(Math.random() * 24) + 1,
            lastTime: "1h",
            unReadMessage: "3"
        }
    ]
};

class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(liked) {
        this.setState({ liked });
        this._list.scrollToOffset({ x: 0, y: 0 });
    }

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
                <LikesHeader liked={this.state.liked} changeTab={this.changeTab} />
                <FlatList
                    ref={r => (this._list = r)}
                    data={this.state.liked ? likes.liked : likes.likedYou}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <LikeItem item={item} liked={this.state.liked} />
                    )}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                width: "90%",
                                height: 1,
                                backgroundColor: "#EBEBEB",
                                alignSelf: "center"
                            }}
                        />
                    )}
                    ListFooterComponent={() => (
                        <View style={{ height: 10, width: "100%" }} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default Likes;
