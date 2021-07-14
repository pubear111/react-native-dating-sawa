import { Container } from "native-base";
import React, { Component } from "react";
import {View, Image} from 'react-native'
import InfoModal from "../components/InfoModal";
import Selector from "./Selector";
import ProgressHeader from "./ProgressHeader";
import consume from "../../contexts/GlobalConsumer";

class ReligionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: this.props.navigation.getParam("selected", "")
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        const {user} = this.props
        user.getReligions()
    }

    toggleModal() {
        const from = this.props.navigation.getParam("from", 0);
        if (from === 'filter_religion') {
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

    render() {
        const {user} = this.props
        return (
            <Container>
                <ProgressHeader
                    toggleModal={this.toggleModal}
                    progress={this.getProgress()}
                />
                {user.state.fetchingReligions ? (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                    </View>
                ) : (
                    <Selector
                        navigation={this.props.navigation}
                        screen="Religion"
                        icon={require("../../assets/profile/pink_religion.png")}
                        text="Do you identify with a religion?"
                        options={user.state.religions}
                    />
                )}

                <InfoModal
                    visible={this.state.visible}
                    navigation={this.props.navigation}
                    toggleModal={this.toggleModal}
                />
            </Container>
        );
    }
}

export default consume(ReligionScreen)