import React, {Component} from 'react';
import {AsyncStorage, NetInfo} from 'react-native';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/pages/auth/MainNavigator'
import NoConnection from './src/pages/auth/NoConnection'
import GlobalProvider from './src/contexts/GlobalProvider'
import {Root} from 'native-base'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isConnected: true
        }
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidMount() {
        SplashScreen.hide();
        this.checkPermission();
        this.createNotificationListeners();
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            await this.getToken();
        } else {
            await this.requestPermission();
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            await this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const {title, body} = notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const {title, body} = notificationOpen.notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const {title, body} = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        alert(
            title, body,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    handleConnectivityChange = isConnected => {
        this.setState({isConnected});
    }

    render() {
        return (this.state.isConnected ? (
            <GlobalProvider>
                <Root>
                    <MainNavigator/>
                </Root>
            </GlobalProvider>
        ) : (
            <NoConnection/>
        ));
    }
}
