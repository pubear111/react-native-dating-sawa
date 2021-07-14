import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Text,
    View, Platform, Image
} from 'react-native';
import {Toast} from 'native-base';
import consume from "../../contexts/GlobalConsumer";
import DeviceInfo from "react-native-device-info";
import {empty} from "../../helpers/functions";

class AuthLoading extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshButton: false,
            loading: true,
            isFetching: false,
            refreshDataFinished: false,
            text: 'Loading...'
        }
    }

    componentDidMount() {
        this._bootstrapAsync();
    }


    _bootstrapAsync = async () => {
        // AsyncStorage.removeItem('sessionId');
        const sessionId = await AsyncStorage.getItem('sessionId');
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user)
        let filter = await AsyncStorage.getItem('filter');
        filter = JSON.parse(filter)
        const lang = await AsyncStorage.getItem('lang');
        const {defaultLang} = this.props.user.state
        const deviceLocale = DeviceInfo.getDeviceLocale();
        let deviceLang = !empty(deviceLocale) ?  deviceLocale.substring(0, 2).toLowerCase(): defaultLang
        if (!!lang){
            this.props.user.setCurrentLang(lang)
        }else{
            await AsyncStorage.setItem('lang', deviceLang)
            this.props.user.setCurrentLang(deviceLang)
        }
        if (!sessionId) {
            this.props.navigation.navigate('Auth');
        } else {
            if(!empty(user)) this.props.user.setUserSettings(user)
            if(!empty(filter)) this.props.filter.setFilters(filter)
            this.props.navigation.navigate('App');
            this.getLocation()
        }
    };


    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const longitude = position.coords.longitude
                const latitude = position.coords.latitude
                this.props.user.updateLocation(longitude, latitude).then(response=>{
                    if (response.code === 1){
                        Toast.show({
                            text: 'Location Updated',
                            duration: 3000
                        })
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },
            (error) => {
                Toast.show({
                    text: 'Please enable gps to update your location ...',
                    duration: 3000
                })
                console.log({error: error.message})
            }
        );
    }

    render() {
        const {loading, refreshButton, isFetching} = this.state
        const renderLoading = loading ? <ActivityIndicator size='large' style={styles.loader}/> : null
        // const renderRefreshButton = refreshButton ? <Button light disabled={isFetching} style={{alignSelf: 'center', padding: 10}}><Text>Refresh</Text></Button> : null
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/others/loader.gif")} style={styles.loaderImage}/>
                {/*{renderLoading}*/}
                {/*<Text style={styles.text}>{this.state.text}</Text>*/}
            </View>
        );
    }


}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 20,
    },
    loaderImage: {
        width: 175,
        height: 175,
    },
    loader: {
        marginTop: 15
    }
}


export default consume(AuthLoading)