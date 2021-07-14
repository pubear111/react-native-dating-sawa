import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TopBar from "./TopBar";
import HomeTabs from "./HomeTabs";
import Discover from "./Discover";
import Likes from "./Likes";
import Conversations from "./Conversations";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Discover"
        };
        this.goTo = this.goTo.bind(this);
        this.selectView = this.selectView.bind(this);
    }

    goTo(location) {
        this.setState({ location });
    }

    selectView() {
        switch (this.state.location) {
            case "Discover":
                return <Discover />;
            case "Likes":
                return <Likes />;
            case "Conversations":
                return <Conversations />;
            default:
                return <Discover />;
        }
    }

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#FA976D", "#F9737A", "#F75485"]}
                style={{ flex: 1 }}
            >
                <TopBar {...this.props}/>
                <View style={styles.container}>
                    <HomeTabs
                        navigation={this.props.navigation}
                        location={this.state.location}
                        goTo={this.goTo}
                    />
                    <View style={{ flex: 9, alignItems: "center" }}>
                        {this.selectView()}
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "88%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        bottom: 0,
        flexDirection: "column"
    }
});

export default HomeScreen;
