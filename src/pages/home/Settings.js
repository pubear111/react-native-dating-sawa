import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import SwitchToggle from 'react-native-switch-toggle';
import Back_button_white from '../components/Back_button_white';
import consume from "../../contexts/GlobalConsumer";
import RNPickerSelect from 'react-native-picker-select';

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {user} = this.props
        const {lang} = this.props.user.state
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA976D', '#F9737A', '#F75485']} style={{flex: 1}}>
                <View style={styles.topBar}>
                    <Back_button_white navigation={this.props.navigation}/>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: 'white', marginStart: 10}}>{lang.settings.settings}</Text>
                </View>
                <View style={styles.container}>
                    <View style={[styles.listItem, {backgroundColor: '#F6F9FB', borderTopLeftRadius: 15, borderTopRightRadius: 15}]}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'darkgray'}}>{lang.settings.settings}</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.visible_photos}</Text>
                        <SwitchToggle
                            containerStyle={{width: 40, height: 20, borderRadius: 10, padding: 1}}
                            circleStyle={{width: 18, height: 18, borderRadius: 9}}
                            switchOn={user.state.settingsVisiblePhotos}
                            onPress={this.onPressVisiblePhotos}
                            backgroundColorOff='#E3E3E3'
                            backgroundColorOn='#4BD863'
                            circleColorOff='white'
                            circleColorOn='white'/>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.notification}</Text>
                        <SwitchToggle
                            containerStyle={{width: 40, height: 20, borderRadius: 10, padding: 1}}
                            circleStyle={{width: 18, height: 18, borderRadius: 9}}
                            switchOn={user.state.settingsNotification}
                            onPress={this.onPressNotification}
                            backgroundColorOff='#E3E3E3'
                            backgroundColorOn='#4BD863'
                            circleColorOff='white'
                            circleColorOn='white'/>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.discoverability}</Text>
                        <SwitchToggle
                            containerStyle={{width: 40, height: 20, borderRadius: 10, padding: 1}}
                            circleStyle={{width: 18, height: 18, borderRadius: 9}}
                            switchOn={user.state.settingsDiscoverability}
                            onPress={this.onPressDiscoverability}
                            backgroundColorOff='#E3E3E3'
                            backgroundColorOn='#4BD863'
                            circleColorOff='white'
                            circleColorOn='white'/>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={{fontSize: 12}}>{lang.settings.show_my_profile}</Text>
                    </View>
                    <View style={[styles.listItem, {backgroundColor: '#F6F9FB'}]}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'darkgray'}}>{lang.settings.general}</Text>
                    </View>
                    <View style={styles.pickerItem}>
                        <RNPickerSelect
                            value={user.state.currentLang}
                            items={user.state.availableLanguages}
                            placeholder={{}}
                            onValueChange={(value) => user.setCurrentLang(value)}
                        >
                            <TouchableOpacity style={styles.listItem}>
                                <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.language}</Text>
                                <Image source={require("../../assets/home/side_arrow.png")} style={{width: 20, aspectRatio: 1.5, resizeMode: "contain"}}/>
                                <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 40}}>{user.state.currentLangLabel}</Text>
                            </TouchableOpacity>
                        </RNPickerSelect>
                    </View>

                    <TouchableOpacity style={styles.listItem}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.rate}</Text>
                        <Image source={require("../../assets/home/side_arrow.png")} style={{width: 20, aspectRatio: 1.5, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('ContactUs')}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.contact_us}</Text>
                        <Image source={require("../../assets/home/side_arrow.png")} style={{width: 20, aspectRatio: 1.5, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                    <View style={[styles.listItem, {backgroundColor: '#F6F9FB'}]}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'darkgray'}}>{lang.settings.account}</Text>
                    </View>
                    <TouchableOpacity style={styles.listItem} onPress={this.onPressDeactivate}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: 'black'}}>{lang.settings.deactivate_account}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={this.onPressLogout}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? "Courier New" : "monospace", fontSize: 14, color: '#F7538F'}}>{lang.settings.logout}</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    onPressLogout = () => {
        this.props.auth.logout(() => {
            this.props.navigation.navigate('SignUp')
        })
    }

    onPressDeactivate = () => {
        this.props.navigation.navigate('Deactivate')
    }

    onPressVisiblePhotos = () => {
        const {user} = this.props
        const {ui} = this.props
        ui.toggleLoading(true)
        user.toggleVisiblePhotosAPI().then(response=>{
            ui.toggleLoading(false)
            if (response.code === 1){
                user.toggleVisiblePhotos()
            }
        }).catch(error=>{
            console.log(error)
            ui.toggleLoading(false)
        })
    }

    onPressNotification = () => {
        const {user} = this.props
        const {ui} = this.props
        ui.toggleLoading(true)
        user.toggleNotificationAPI().then(response=>{
            ui.toggleLoading(false)
            if (response.code === 1){
                user.toggleNotification()
            }
        }).catch(error=>{
            console.log(error)
            ui.toggleLoading(false)
        })
    }

    onPressDiscoverability = () => {
        const {user} = this.props
        const {ui} = this.props
        ui.toggleLoading(true)
        user.toggleDiscoverabilityAPI().then(response=>{
            ui.toggleLoading(false)
            if (response.code === 1){
                user.toggleDiscoverability()
            }
        }).catch(error=>{
            console.log(error)
            ui.toggleLoading(false)
        })
    }


}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: '12%',
        paddingStart: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        width: '100%',
        height: '88%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // position: "absolute",
        bottom: 0
    },
    listItem: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEBEC',
        paddingStart: 10,
        paddingEnd: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    pickerItem: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEBEC',
    }
});


export default consume(SettingsScreen)