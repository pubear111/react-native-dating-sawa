import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Indecators extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        };
        this.rows = [0, 1, 2];
    }

    render() {
        return (
            <View style={styles.indicators}>
                {this.rows.map(i => {
                    return (
                        <View style={styles.circleContainer} key={i}>
                            <View
                                style={[
                                    styles.indicatorCircle,
                                    i === this.props.current && styles.currentIndicator
                                ]}
                            />
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    indicators: {
        position: "absolute",
        top: 25,
        right: 10,
        zIndex: 100
    },
    circleContainer: {
        width: 12,
        height: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    indicatorCircle: {
        width: 4,
        height: 4,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)"
    },
    currentIndicator: {
        width: 8,
        height: 8,
        borderRadius: 5
    }
});

export default Indecators;
