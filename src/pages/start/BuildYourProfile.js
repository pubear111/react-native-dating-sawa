import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Back_button_pink from '../components/Back_button_pink';
import Wave_background from '../components/Wave_background';
import {Thumbnail} from 'native-base';
import consume from "../../contexts/GlobalConsumer";

const options = {
    title: 'Select Avatar',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class BuildYourProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    showImage = () => {
        const {user} = this.props
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                console.log(source)
                user.onImagePicker(source)
            }
        });
    }

    onNextPress = () =>{
        const {user} = this.props
        const {auth} = this.props
        this.setState({isFetching: true})
        user.updateProfile(auth.state.code).then((response)=>{
            this.setState({isFetching: false})
            if (response.code === 1) {
                this.props.navigation.navigate('VerificationCode')
            }
        }).catch(error=>{
            this.setState({isFetching: false})
            console.log(error)
        })
    }

    render() {
        const {user} = this.props
        return (
            <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'column'}}>
                <Back_button_pink navigation={this.props.navigation}/>
                <Wave_background/>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {this.state.isFetching ? (
                            <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        ) : (
                            <Image source={require("../../assets/start/logo_with_text.png")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                        )}
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 20, fontWeight: "bold", color: '#FBB06E'}}>Know me better</Text>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: "center", justifyContent: "center"}} onPress={this.showImage}>
                        <Thumbnail source={user.state.avatarSource === undefined ? require("../../assets/start/illustration0.png") : user.state.avatarSource}
                                   style={{width: 150, height: 150, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: "center", justifyContent: 'space-around', padding: 5}}>
                    <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontWeight: "bold", color: 'black'}}>Let's build your profile</Text>
                    <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 12, color: 'darkgray', textAlign: "center", marginTop: '5%'}}>Sawa is
                        about building real connection {'\n'} between real people. Please add at {'\n'} least one photo of yourself with {'\n'} nobody else in the picture.</Text>
                    <TouchableOpacity style={{width: '100%', alignItems: "center", marginTop: '5%'}} onPress={this.onNextPress} disabled={this.state.isFetching}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA986C', '#F97579', '#F75385']}
                                        style={styles.button}>
                            <Text style={styles.button_text}>ADD A PHOTO</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace",
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    }
})

export default consume(BuildYourProfileScreen)