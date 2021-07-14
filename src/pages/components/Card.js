import React, { Component } from "react";
import {
    Dimensions,
    Animated,
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
import Indecators from "./Indicators";

const { width, height } = Dimensions.get("window");

const scrollAnimation = scrollY => {
    return {
        width: scrollY.interpolate({
            inputRange: [0, 20],
            outputRange: [width - 20, width],
            extrapolate: "clamp"
        }),
        height: scrollY.interpolate({
            inputRange: [0, 20],
            outputRange: [
                Platform.OS === "ios" ? height * 0.78 : height * 0.75,
                Platform.OS === "ios" ? height * 0.795 : height * 0.764
            ],
            extrapolate: "clamp"
        }),
        borderBottomLeftRadius: scrollY.interpolate({
            inputRange: [0, 20],
            outputRange: [25, 0],
            extrapolate: "clamp"
        }),
        borderBottomRightRadius: scrollY.interpolate({
            inputRange: [0, 20],
            outputRange: [25, 0],
            extrapolate: "clamp"
        })
    };
};

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible1: false,
            modalVisible2: false,
            verified: false,
            currentIndicator: 0,
            scrollY: new Animated.Value(0)
        };
    }

    render() {
        return (
            <View style={styles.scrollPage}>
                <Animated.View
                    style={[
                        styles.card,
                        // remove the scrollAnimation below to test without the expand animation
                        scrollAnimation(this.state.scrollY)
                    ]}
                >
                    <Indecators current={this.state.currentIndicator} />
                    <ScrollView
                        style={styles.screen}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                        overScrollMode="never"
                        onScroll={event => {
                            this.setState({
                                currentIndicator: Math.abs(
                                    Math.floor(event.nativeEvent.contentOffset.y / (height * 0.6))
                                )
                            });
                            Animated.event([
                                { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                            ])(event);
                        }}
                    >
                        <View style={styles.page_container}>
                            <Image
                                source={this.props.image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    position: "absolute"
                                }}
                            />
                            <LinearGradient
                                colors={["transparent", "#00000050"]}
                                locations={[0.4, 1.2]}
                                style={styles.linearGradient}
                            />
                            <View
                                style={{
                                    width: "95%",
                                    position: "absolute",
                                    bottom: 15,
                                    alignItems: "center"
                                }}
                            >
                                <View
                                    style={{
                                        width: "90%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <TouchableOpacity>
                                        <Image
                                            source={require("../../assets/home/white_pass.png")}
                                            style={{ height: 60, resizeMode: "contain" }}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >
                                            Bella, 24
                                        </Text>
                                        {this.props.photoVerify ? (
                                            <Image
                                                source={require("../../assets/home/tick.png")}
                                                style={{ width: 15, height: 15, marginStart: 10 }}
                                            />
                                        ) : (
                                            <Text />
                                        )}
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.setState({
                                                modalVisible1: !this.state.modalVisible1
                                            })
                                        }
                                    >
                                        <Image
                                            source={require("../../assets/home/white_heart.png")}
                                            style={{ height: 60, resizeMode: "contain" }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Modal
                                animationType={"fade"}
                                isVisible={this.state.modalVisible1}
                            >
                                <View
                                    style={{
                                        width: 300,
                                        height: 200,
                                        borderRadius: 20,
                                        backgroundColor: "white",
                                        padding: 20,
                                        alignSelf: "center"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            color: "black"
                                        }}
                                    >
                                        Interested in "Bella"
                                    </Text>
                                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                                        Text for message is going here so user know the message
                                    </Text>
                                    <View
                                        style={{
                                            width: "60%",
                                            alignSelf: "center",
                                            marginTop: 20,
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            alignItems: "center"
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                                backgroundColor: "#FB4B58",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible1: !this.state.modalVisible1
                                                })
                                            }
                                        >
                                            <Text style={{ color: "white" }}>SEND</Text>
                                        </TouchableOpacity>
                                        <Text>OR</Text>
                                        <TouchableOpacity
                                            style={{
                                                width: 50,
                                                height: 50,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible1: !this.state.modalVisible1
                                                })
                                            }
                                        >
                                            <Image
                                                source={require("../../assets/home/pink_like.png")}
                                                style={{ height: 50, resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={styles.page_container}>
                            <Image
                                source={require("../../assets/home/other_profile2.jpg")}
                                style={{ width: "100%", height: "100%", position: "absolute" }}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={["#FA976D", "#F9737A", "#F75485"]}
                                style={{ width: "100%", height: "60%", alignItems: "center" }}
                            >
                                <View
                                    style={{
                                        width: "90%",
                                        height: "100%",
                                        padding: 5,
                                        flexDirection: "column"
                                    }}
                                >
                                    <View style={{ flex: 1, justifyContent: "center" }}>
                                        <Text style={{ fontSize: 16, color: "white" }}>
                                            About Bella
                                        </Text>
                                        <Text style={{ color: "white" }}>
                                            Melcourne girl living and working in Labanon, Lover of
                                            coffee, books, plants, podcasts, festivals, gigs, dancing,
                                            active, kind, spontaneous human. Looking to connect with
                                            someone fun, genuine and advanturous.
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "space-around" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity
                                                style={{
                                                    height: 35,
                                                    aspectRatio: 2.5,
                                                    backgroundColor: "#FE9893",
                                                    borderRadius: 17.5,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/home/white_exercise.png")}
                                                    style={{ height: 20, resizeMode: "contain" }}
                                                />
                                                <Text style={{ color: "white" }}>Active</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    height: 35,
                                                    aspectRatio: 4,
                                                    backgroundColor: "#FE9893",
                                                    borderRadius: 17.5,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    marginStart: 15
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/home/white_height.png")}
                                                    style={{
                                                        height: 20,
                                                        resizeMode: "contain",
                                                        marginStart: 10
                                                    }}
                                                />
                                                <Text style={{ color: "white", marginStart: 10 }}>
                                                    165cm (5"5')
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity
                                                style={{
                                                    height: 35,
                                                    aspectRatio: 5,
                                                    backgroundColor: "#FE9893",
                                                    borderRadius: 17.5,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/home/white_graduate.png")}
                                                    style={{ height: 20, resizeMode: "contain" }}
                                                />
                                                <Text style={{ color: "white" }}>Graduate Degree</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    height: 35,
                                                    aspectRatio: 3,
                                                    backgroundColor: "#FE9893",
                                                    borderRadius: 17.5,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    marginStart: 15
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/home/white_librel.png")}
                                                    style={{
                                                        height: 20,
                                                        resizeMode: "contain",
                                                        marginStart: 10
                                                    }}
                                                />
                                                <Text style={{ color: "white" }}>Libral</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                style={{
                                                    height: 35,
                                                    aspectRatio: 3.5,
                                                    backgroundColor: "#FE9893",
                                                    borderRadius: 17.5,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Image
                                                    source={require("../../assets/home/white_religion.png")}
                                                    style={{ height: 25, resizeMode: "contain" }}
                                                />
                                                <Text style={{ color: "white" }}>Spiritual</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={styles.page_container}>
                            <Image
                                source={require("../../assets/home/profile.png")}
                                style={{ width: "100%", height: "100%", position: "absolute" }}
                            />
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={["#FA976D", "#F9737A", "#F75485"]}
                                style={{ width: "100%", height: "40%", alignItems: "center" }}
                            >
                                <View
                                    style={{
                                        width: "90%",
                                        height: "100%",
                                        justifyContent: "space-around",
                                        padding: 5
                                    }}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image
                                            source={require("../../assets/home/white_map-marker.png")}
                                            style={{ width: 20, height: 20, resizeMode: "contain" }}
                                        />
                                        <Text style={{ fontSize: 16, color: "white" }}>
                                            Bella's location
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18, color: "white" }}>
                                            Beirut, Beyrouth
                                        </Text>
                                        <Text
                                            style={{ fontSize: 18, color: "white", marginTop: 5 }}
                                        >
                                            97km away
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible2: !this.state.modalVisible2
                                                })
                                            }
                                        >
                                            <Image
                                                source={require("../../assets/home/white_pass.png")}
                                                style={{ height: 60, resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 16, color: "white" }}>
                                            Block {"&"} Report
                                        </Text>
                                        <TouchableOpacity>
                                            <Image
                                                source={require("../../assets/home/white_heart.png")}
                                                style={{ height: 60, resizeMode: "contain" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </LinearGradient>
                            <Modal
                                animationType={"fade"}
                                isVisible={this.state.modalVisible2}
                            >
                                <View
                                    style={{
                                        width: 320,
                                        height: 320,
                                        borderRadius: 20,
                                        backgroundColor: "white",
                                        alignSelf: "center"
                                    }}
                                >
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={["#FA976D", "#F9737A", "#F75485"]}
                                        style={{
                                            width: "100%",
                                            height: 120,
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20,
                                            padding: 10,
                                            alignItems: "center",
                                            justifyContent: "space-around"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >
                                            What's wrong with this profile?
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: "white",
                                                textAlign: "center"
                                            }}
                                        >
                                            Help us to keep the Sawa safe by telling us {"\n"} why
                                            you're reporting or blocking this user.
                                        </Text>
                                        <Text style={{ fontSize: 14, color: "white" }}>
                                            Don't worry. this is anonymous.
                                        </Text>
                                    </LinearGradient>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity
                                            style={{
                                                width: "85%",
                                                height: 50,
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#E0E0E0",
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible2: !this.state.modalVisible2
                                                })
                                            }
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                                    fontSize: 16,
                                                    color: "black"
                                                }}
                                            >
                                                I don't want them to see me
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: "85%",
                                                height: 50,
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#E0E0E0",
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible2: !this.state.modalVisible2
                                                })
                                            }
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                                    fontSize: 16,
                                                    color: "black"
                                                }}
                                            >
                                                Made me uncomfortable
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: "85%",
                                                height: 50,
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#E0E0E0",
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible2: !this.state.modalVisible2
                                                })
                                            }
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                                    fontSize: 16,
                                                    color: "black"
                                                }}
                                            >
                                                Inappropriate content
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: "85%",
                                                height: 50,
                                                justifyContent: "center"
                                            }}
                                            onPress={() =>
                                                this.setState({
                                                    modalVisible2: !this.state.modalVisible2
                                                })
                                            }
                                        >
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                                    fontSize: 16,
                                                    color: "black"
                                                }}
                                            >
                                                Stolen photo
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollPage: {
        width: width,
        alignItems: "center"
    },
    card: {
        width: width - 20,
        borderRadius: 25,
        overflow: "hidden",
        marginHorizontal: 10
    },
    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column"
    },
    page_container: {
        width: "100%",
        height: Platform.OS === "ios" ? height * 0.78 : height * 0.75,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    linearGradient: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default Card;
