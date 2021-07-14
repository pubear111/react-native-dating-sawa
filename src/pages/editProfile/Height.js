import {
    Body,
    Container,
    Content,
    Text,
    Thumbnail
} from "native-base";
import React, {Component} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {WheelPicker} from "react-native-wheel-picker-android";
import InfoModal from "../components/InfoModal";
import ProgressHeader from "./ProgressHeader";
import consume from "../../contexts/GlobalConsumer";

const wheelPickerData = [];
for (let i = 160; i < 215; i++) wheelPickerData.push(i)

class HeightScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            selectedItem: 0,

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    toggleModal() {
        const from = this.props.navigation.getParam("from", 0);
        if (from === 'filter_height') {
            this.props.navigation.goBack()
        } else {
            this.setState({visible: !this.state.visible});
        }
    }

    getProgress() {
        const arr = this.props.navigation.getParam("missing", []);
        const total = this.props.navigation.getParam("total", 0);
        if (total === 0) return 0;
        return 100 - (arr.length / total) * 100;
    }

    handleSelect(selected) {
        const {filter} = this.props
        const from = this.props.navigation.getParam("from", 0);
        if (from === 'filter_height') {
            filter.setHeight(selected)
            this.props.navigation.goBack()
        }
    }

    onItemSelected = selectedItem => {
        this.setState({selectedItem})
    }


    render() {
        const from = this.props.navigation.getParam("from", 0);

        return (
            <Container>
                <ProgressHeader
                    toggleModal={this.toggleModal}
                    progress={this.getProgress()}
                />
                <Content>
                    <Body style={{width: "100%"}}>
                    <Thumbnail
                        source={require("../../assets/profile/pink_height.png")}
                        style={{
                            width: 70,
                            height: 70,
                            resizeMode: "contain",
                            marginTop: 20
                        }}
                    />
                    <Text style={{fontSize: 20, fontWeight: "bold", margin: 20}}>
                        {from === 'filter_height' ? 'Select Height Filter?' : 'What is your height?'}
                    </Text>
                    <WheelPicker
                        onItemSelected={this.onItemSelected}
                        selectedItem={this.state.selectedItem}
                        isCurved
                        data={wheelPickerData}
                        style={{width: 200, height: 150, alignSelf: "center"}}
                        selectedItemTextColor='black'
                    />


                    <TouchableOpacity
                        style={styles.buttonItem}
                        onPress={() => this.handleSelect(this.state.selectedItem)}
                    >
                        <Text>
                            Select
                        </Text>
                    </TouchableOpacity>
                    {from === 'filter_height' ? null :(
                        <TouchableOpacity
                            style={styles.buttonSkip}

                        >
                            <Text style={{color: "#F9707B"}}>skip</Text>
                        </TouchableOpacity>
                    )}
                    </Body>
                </Content>
                <InfoModal
                    visible={this.state.visible}
                    navigation={this.props.navigation}
                    toggleModal={this.toggleModal}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonItem: {
        width: "90%",
        height: 45,
        backgroundColor: "#F7F7F7",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10
    },
    buttonSkip: {
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    }
});

export default consume(HeightScreen)
