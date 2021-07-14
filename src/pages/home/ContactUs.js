import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Back_button_white from '../components/Back_button_white';

export default class ContactUsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conment: ''
        };
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA976D', '#F9737A', '#F75485']} style={{ flex: 1 }}>
                <View style={styles.topBar}>
                    <View style={{ flexDirection: 'row' }}>
                        <Back_button_white navigation={this.props.navigation} />
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white', marginStart: 10 }}>Contact Us</Text>
                    </View>
                    <TouchableOpacity>
                        <Image source={require('../../assets/home/send.png')} style={{ width: 25, height: 25, resizeMode: 'contain', marginEnd: 10 }}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TextInput style={{ width: '95%', height: 150, backgroundColor: '#F7F7F7', borderRadius: 10, marginTop: 15, alignSelf: 'center', textAlignVertical: 'top' }}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Type your message..."
                        onChangeText={(text) => this.setState({ conment: text })}
                        value={this.state.conment} />
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA986C', '#F97579', '#F75385']} style={styles.button}>
                            <Text style={{ fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, fontWeight: 'bold', color: 'white' }}>Add a screenshot(Optional)</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: '12%',
        paddingStart: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        width: '100%',
        height: '88%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        bottom: 0
    },
    button: {
        width: '90%',
        height: 45,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
