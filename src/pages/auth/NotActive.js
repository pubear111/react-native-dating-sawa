import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Wave_background from "../components/Wave_background";

export default class NotActiveScreen extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Wave_background />
                <Image source={require("../../assets/others/loader_1.png")} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text>Your account is disabled...</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container:{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 156,
        height: 250,
        resizeMode: "contain",
        marginTop: '5%'
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 30
    }
}