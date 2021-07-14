import React, { PureComponent } from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

class OfflineNotice extends PureComponent {
    
    state = {
        isConnected: true
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 10
    },
    offlineText: { color: '#000' }
});

export default OfflineNotice;