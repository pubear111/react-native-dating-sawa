import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CrossedPathScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        markers: [
          { latlng: { latitude: null, longitude: null } }
        ]
      },
    };
  }

  onRegionChange = (region) => {
    this.setState({ region: region });
  }

  // const markers = responseJson2.results.map((result) => ({
  //   latlng: {
  //     latitude: result.geometry.location.lat,
  //     longitude: result.geometry.location.lng,
  //   }
  // });

  // this.setState({ markers });

  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FA976D', '#F9737A', '#F75485']} style={{ flex: 1 }}>
        <View style={{ width: '100%', height: '12%', flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginStart: 10 }} onPress={() => this.props.navigation.goBack()}>
            <Icon name="long-arrow-left" size={25} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white', marginStart: 10 }}>Jenny</Text>
        </View>
        <View style={{ width: '100%', height: '88%', backgroundColor: 'white', borderTopStartRadius: 20, borderTopEndRadius: 20, flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ fontFamily: "monospace", color: 'gray' }}>Active Today</Text>
            <Text style={{ fontFamily: "monospace", color: 'gray' }}>More than 30km away</Text>
            <Text style={{ fontFamily: "monospace", color: 'gray', marginTop: 15 }}>About Jenny</Text>
            <Text style={{ fontFamily: "monospace", color: 'black', marginTop: 10 }}>Melbourne girl living and working in lebanon. Lover of coffee, books, plants, podcasts, festivals, gigs, dancing, jikes, kayaking. Active, kind, spontaneous human. Looking to connect with someone fun, genuine and advantuous.</Text>
            <Text style={{ fontFamily: "monospace", color: 'black', marginTop: 15 }}>You've crossed paths 3 times.</Text>
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <MapView style={{ position: "absolute", left: 5, top: 5, right: 5, bottom: 5 }}
              region={this.state.region}
              onRegionChange={this.onRegionChange}>
              {this.state.markers && this.state.markers.map(marker => (
                <MapView.Marker
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description} />
              ))}
            </MapView>
            <View style={{ width: '70%', height: 50, backgroundColor: 'white', borderRadius: 10, alignSelf: "center", position: "absolute", top: '10%', justifyContent: "center", paddingStart: 10 }}>
              <Text style={{ color: 'black' }}>The list time near Beirut</Text>
              <Text>October 31, 2018</Text>
            </View>
            <View style={{ width: '70%', alignSelf: "center", flexDirection: "row", justifyContent: "space-between", position: "absolute", top: '70%' }}>
              <TouchableOpacity style={{ width: '40%', aspectRatio: 2, backgroundColor: 'white', borderRadius: 30, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Image source={require("../assets/pink_pass.png")} style={{ width: '15%', height: '25%', resizeMode: "contain" }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: '#F81616', marginStart: 5 }}>Pass</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '40%', aspectRatio: 2, backgroundColor: 'white', borderRadius: 30, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Image source={require("../assets/other_hello.png")} style={{ width: '20%', height: '30%', resizeMode: "contain" }} />
                <Text style={{ fontSize: 18, fontWeight: "bold", color: '#EFD050', marginStart: 5 }}>Hello</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}
