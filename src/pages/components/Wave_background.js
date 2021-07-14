import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

class Wave_background extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Image source={require("../../assets/wave.png")} style={styles.wave} />
        )
    }
}
export default Wave_background

const styles = StyleSheet.create({
    wave: {
        width: '100%',
        height: '50%',
        resizeMode: "stretch",
        position: "absolute",
        top: 0,
        zIndex: -1
    }
});
