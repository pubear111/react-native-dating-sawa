import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class NoConnection extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/others/loader_1.png")} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text>No Connection</Text>
                    <Text>Please make sure you are connected to internet ...</Text>
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