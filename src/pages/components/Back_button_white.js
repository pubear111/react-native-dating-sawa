import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class Back_button_white extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../../assets/white_back.png')} style={{ width: 25, height: 25, resizeMode: "contain" }} />
            </TouchableOpacity>
        )
    }
}
export default Back_button_white
