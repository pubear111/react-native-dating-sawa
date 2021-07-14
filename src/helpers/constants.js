import {AsyncStorage, Platform} from 'react-native';
import DeviceInfo from "react-native-device-info";


export const apiLink = 'http://sawa.world/api/user/'

export async function headers(formData = false) {
    let acceptLang = await AsyncStorage.getItem('lang');
    if (!acceptLang) acceptLang = 'en'
    return {
        'Accept': 'application/json',
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
        'Authorization' : 'Basic Y29uc3VtZXI6c2F3YS53b3JsZA==',
        'Accept-Language' : acceptLang,
        'platform' : Platform.OS === 'android' ? 1 : 2,
        'os-version' : Platform.Version,
        'mobile-brand' : DeviceInfo.getBrand(),
        'app-version' : '1.0',
    }
}