import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {Component} from 'react';
import {AsyncStorage, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SwitchToggle from 'react-native-switch-toggle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Back_button_white from '../components/Back_button_white';
import consume from "../../contexts/GlobalConsumer";
import {empty} from "../../helpers/functions";

class FilterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: [3, 7],
        };
    }

    async componentDidMount(){
        let filter = await AsyncStorage.getItem('filter');
        filter = JSON.parse(filter)
        if(!empty(filter)) this.props.filter.setFilters(filter)

    }

    render() {
        const {lang} = this.props.user.state
        const {filter} = this.props

        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA976D', '#F9737A', '#F75485']} style={{flex: 1}}>
                <View style={styles.topBar}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Back_button_white navigation={this.props.navigation}/>
                        <Text style={{fontSize: 18, fontWeight: "bold", color: 'white', marginStart: 10}}>{lang.filters.filter}</Text>
                    </View>
                    <TouchableOpacity onPress={this.resetFilters}>
                        <Image source={require("../../assets/home/white_filter_clear.png")} style={{width: 20, resizeMode: "contain"}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={{margin: 20}}>
                            <Text style={{fontFamily: "monospace",}}>{lang.filters.only_show}</Text>
                            <View>
                                <Text style={{color: 'black', fontFamily: "monospace", fontWeight: 'bold', marginTop: '2%'}}>{lang.filters.location}</Text>
                                <View style={{flexDirection: "row", paddingStart: '2%', paddingEnd: '2%', marginTop: '3%', justifyContent: "space-between"}}>
                                    <Text style={{color: 'darkgray', fontFamily: "monospace", fontSize: 14}}>{lang.filters.limit_by_distance}</Text>
                                    <SwitchToggle
                                        containerStyle={{width: 38, height: 20, borderRadius: 10, padding: 2}}
                                        circleStyle={{width: 18, height: 18, borderRadius: 9}}
                                        switchOn={filter.state.limitDistance}
                                        onPress={this.onPressLimitDistance}
                                        backgroundColorOff='#E3E3E3'
                                        backgroundColorOn='#4BD863'
                                        circleColorOff='white'
                                        circleColorOn='white'/>
                                </View>
                                <View style={{display: filter.state.limitDistance ? 'flex' : 'none'}}>
                                    <Text style={{
                                        color: 'black',
                                        fontFamily: "monospace",
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginTop: '3%',
                                        textAlign: "center"
                                    }}>{lang.filters.up_to(filter.state.distance)}</Text>
                                    <MultiSlider
                                        containerStyle={{alignItems: 'center'}}
                                        markerStyle={{width: 20, height: 20, backgroundColor: '#F86B7C'}}
                                        selectedStyle={{backgroundColor: '#F86B7C',}}
                                        trackStyle={{height: 5}}
                                        touchDimensions={{
                                            height: 60,
                                            width: 60,
                                            borderRadius: 30,
                                            slipDisplacement: 80,
                                        }}
                                        min={0}
                                        max={150}
                                        onValuesChangeFinish={value => this.distanceChange(value)}
                                        values={[Number.parseInt(filter.state.distance)]}/>
                                </View>
                                <View style={{width: '80%', marginTop: '3%', flexDirection: 'row', alignSelf: "center"}}>
                                    <View style={{backgroundColor: 'lightgray', height: 1, flex: 1, alignSelf: 'center'}}/>
                                    <Text style={{alignSelf: 'center', paddingHorizontal: 5, fontSize: 12, marginStart: 5, marginEnd: 5}}>{lang.filters.or}</Text>
                                    <View style={{backgroundColor: 'lightgray', height: 1, flex: 1, alignSelf: 'center'}}/>
                                </View>
                                <View style={{flexDirection: "row", paddingStart: '2%', paddingEnd: '2%', marginTop: '3%', justifyContent: "space-between"}}>
                                    <Text style={{color: 'darkgray', fontFamily: "monospace", fontSize: 14}}>{lang.filters.limit_by_country}</Text>
                                    <SwitchToggle
                                        containerStyle={{width: 38, height: 20, borderRadius: 10, padding: 2}}
                                        circleStyle={{width: 18, height: 18, borderRadius: 9}}
                                        switchOn={filter.state.limitCountry}
                                        onPress={this.onPressLimitCountry}
                                        backgroundColorOff='#E3E3E3'
                                        backgroundColorOn='#4BD863'
                                        circleColorOff='white'
                                        circleColorOn='white'/>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        display: filter.state.limitCountry ? 'flex' : 'none',
                                        height: 50,
                                        backgroundColor: '#EEEEEE',
                                        marginTop: 10,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                    onPress={() => this.props.navigation.navigate('Origin', {from: 'filter_countries'})}
                                >
                                    <View style={{flexDirection: "row", alignItems: "center", marginStart: 10}}>
                                        <Icon name="globe" size={30} color="#5B5B5B"/>
                                        <Text style={{fontSize: 14, color: 'black', marginStart: 10}}>{filter.state.country.name}</Text>
                                    </View>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 20, height: 20, resizeMode: "contain", marginEnd: 5}}/>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{color: 'black', fontFamily: "monospace", fontWeight: 'bold', marginTop: '3%'}}>{lang.filters.age}</Text>
                                    <View>
                                        <Text style={{
                                            color: 'black',
                                            fontFamily: "monospace",
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            marginTop: '2%',
                                            textAlign: "center"
                                        }}>{lang.filters.and_over(filter.state.ageRange[0], filter.state.ageRange[1])}</Text>
                                        <MultiSlider
                                            containerStyle={{alignItems: 'center'}}
                                            markerStyle={{width: 20, height: 20, backgroundColor: '#F86B7C'}}
                                            selectedStyle={{backgroundColor: '#F86B7C'}}
                                            trackStyle={{height: 5}}
                                            touchDimensions={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 30,
                                                slipDisplacement: 80,
                                            }}
                                            min={18}
                                            max={70}
                                            onValuesChangeFinish={value => this.ageChange(value)}
                                            values={[
                                                filter.state.ageRange[0],
                                                filter.state.ageRange[1],
                                            ]}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Origin', {from: 'filter_origin'})}
                                                  style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        {/*<Image source={require("../../assets/home/black_height.png")} style={{width: 20, height: 20, resizeMode: "contain"}}/>*/}
                                        <Icon name="globe" size={20} color="#000"/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.origin}</Text>
                                    </View>
                                    <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 20}}>{filter.state.origin.name}</Text>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 15, height: 15, resizeMode: "contain"}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Height', {from: 'filter_height'})}
                                                  style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image source={require("../../assets/home/black_height.png")} style={{width: 20, height: 20, resizeMode: "contain"}}/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.height}</Text>
                                    </View>
                                    <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 20}}>{filter.state.height.data}</Text>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 15, height: 15, resizeMode: "contain"}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Education', {from: 'filter_education'})}
                                                  style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image source={require("../../assets/home/black_education.png")} style={{width: 20, height: 20, resizeMode: "contain"}}/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.education}</Text>
                                    </View>
                                    <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 20}}>{filter.state.education.name}</Text>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 15, height: 15, resizeMode: "contain"}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Job', {from: 'filter_job'})}
                                                  style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image source={require("../../assets/home/black_profession.png")} style={{width: 20, height: 15, resizeMode: "contain"}}/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.profession}</Text>
                                    </View>
                                    <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 20}}>{filter.state.work.name}</Text>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 15, height: 15, resizeMode: "contain"}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Religion', {from: 'filter_religion'})}
                                                  style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image source={require("../../assets/home/black_religion.png")} style={{width: 20, height: 20, resizeMode: "contain"}}/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.religion}</Text>
                                    </View>
                                    <Text style={{fontSize: 14, color: 'darkgray', position: "absolute", right: 20}}>{filter.state.religion.name}</Text>
                                    <Image source={require("../../assets/home/side_arrow.png")} style={{width: 15, height: 15, resizeMode: "contain"}}/>
                                </TouchableOpacity>
                                <View style={{width: '100%', height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Image source={require("../../assets/home/black_visible_photos.png")} style={{width: 20, height: 20, resizeMode: "contain"}}/>
                                        <Text style={{color: 'black', marginStart: 15}}>{lang.filters.visible_photos}</Text>
                                    </View>
                                    <SwitchToggle
                                        containerStyle={{width: 38, height: 20, borderRadius: 10, padding: 2}}
                                        circleStyle={{width: 18, height: 18, borderRadius: 9}}
                                        switchOn={filter.state.visiblePhotos}
                                        onPress={this.onPressVisiblePhotos}
                                        backgroundColorOff='#E3E3E3'
                                        backgroundColorOn='#4BD863'
                                        circleColorOff='white'
                                        circleColorOn='white'/>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'space-around', padding: 5}}>
                                <TouchableOpacity style={{alignItems: 'center'}} onPress={this.onSave}>
                                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FA986C', '#F97579', '#F75385']} style={styles.button}>
                                        <Text style={styles.button_text}>SAVE</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        );
    }

    onSave = () => {
        const {limitDistance, limitCountry, visiblePhotos, distance, ageRange, height, education, work, religion, country, origin} = this.props.filter.state
        const filter = {limitDistance, limitCountry, visiblePhotos, distance, ageRange, height, education, work, religion, country, origin,}
        AsyncStorage.setItem('filter', JSON.stringify(filter))
            .then(result=>console.log(result))
            .catch(error=>console.log(error))
        this.props.navigation.goBack()
    }

    onPressLimitDistance = () => {
        const {filter} = this.props
        filter.toggleLimitDistance()
    }

    onPressLimitCountry = () => {
        const {filter} = this.props
        filter.toggleLimitCountry()
    }

    onPressVisiblePhotos = () => {
        const {filter} = this.props
        filter.toggleVisiblePhotos()
    }
    distanceChange = (distance) => {
        const {filter} = this.props
        filter.setDistance(distance)
    }

    ageChange = (age) => {
        const {filter} = this.props
        filter.setAgeRange(age)
    }

    resetFilters = () => {
        const {filter} = this.props
        filter.resetFilters()
    }

}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: '12%',
        paddingStart: 10,
        paddingEnd: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
    pickerItem: {
        width: '100%',
        height: 35,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEBEC',
    },
    button: {
        marginTop: 20,
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
    },

});

export default consume(FilterScreen)