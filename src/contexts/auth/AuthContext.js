import React from 'react'
import {AsyncStorage} from "react-native";
import * as AuthFunctions from './AuthFunctions'
import {api, empty} from "../../helpers/functions";

export const AuthContext = React.createContext()

export default class Auth extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            code: '',
            shiftedCode: '',
            isActive: false,
            isExist: false,
            isProfileCompleted: false,
            isVerified: false,
            verificationCode: undefined,
            verificationSent: false,
        }

    }

    render() {
        return (
            <AuthContext.Provider value={{
                state: this.state,
                checkEmail: this.checkEmail,
                resendCode: this.resendCode,
                verifyAccount: this.verifyAccount,
                logout: this.logout,
                login: this.login,
                loginFacebook: this.loginFacebook,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

    checkEmail = (email) => {
        const code = AuthFunctions.generateCode()
        const shiftedCode = AuthFunctions.caesarCipher(code, 5)
        this.setState({code, shiftedCode, email})
        const params = {email, code: shiftedCode}
        return api('check_email', params).then((response) => {
            if (response.code === 1) {
                const isActive = !empty(response.data.is_active)
                const isExist = !empty(response.data.is_exist)
                const isProfileCompleted = !empty(response.data.is_profile_completed)
                const isVerified = !empty(response.data.is_verified)
                const verificationCode = response.data.verification_code
                const verificationSent = !empty(response.data.verification_sent)
                const userState = {isActive, isExist, isProfileCompleted, isVerified, verificationCode, verificationSent, email}
                this.setState(userState)
                return userState
            }
        })
    }

    resendCode = () => {
        const params = {email: this.state.email}
        return api('resend_verification_code', params).then((response) => {
            return response
        })
    }

    verifyAccount = async (code) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        const params = {
            email: this.state.email,
            code,
            notification_key: fcmToken
        }
        return api('verify_account', params).then((response) => {
            return response
        })
    }

    login = async (pwd) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        const params = {
            email: this.state.email,
            pwd,
            notification_key: fcmToken
        }
        return api('login', params).then((response) => {
            return response
        })
    }

    loginFacebook = async (user) => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        const params = {
            token: user.token,
            name: user.name,
            picture: user.picture.data.url,
            gender: 1,
            birthday: '1/1/1990',
            notification_key: fcmToken
        }
        return api('login_facebook', params).then((response) => {
            return response
        })
    }

    logout = (callback) => {
        AsyncStorage.removeItem('sessionId')
        callback()
    }

}
