import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Back_button_pink extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <Icon name="long-arrow-left" size={30} color="#F97679" />
            </TouchableOpacity>
        )
    }
}
export default Back_button_pink

const styles = StyleSheet.create({
    back: {
        position: "absolute",
        left: '5%',
        top: '3%',
        zIndex: 1
    }
});