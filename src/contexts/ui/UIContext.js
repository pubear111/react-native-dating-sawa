import React from 'react'
import {View, Text, Image} from 'react-native'
import * as UIFunctions from './UIFunctions'

export const UIContext = React.createContext()

export default class UI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <UIContext.Provider value={{
                state: this.state,
                toggleLoading: this.toggleLoading,
            }}>
                {this.props.children}
                {this.renderLoading()}
            </UIContext.Provider>
        )
    }

    renderLoading() {
        if (this.state.loading === false) return null
        return (
            <View style={styles.loadingModal.overlay}>
                <View style={styles.loadingModal.inner}>
                    <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                </View>
            </View>
        )
    }

    toggleLoading = (loading = undefined) => {
        this.setState({loading: typeof loading === 'boolean' ? loading : !this.state.loading})
    }

}

const styles = {
    loadingModal: {
        overlay: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(30, 30, 30, 0.8)'
        },
        inner: {
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'white',

        }
    }
}