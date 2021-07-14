import { Container } from "native-base";
import React, { Component } from "react";
import InfoModal from "../components/InfoModal";
import Selector from "./Selector";
import ProgressHeader from "./ProgressHeader";
import {Image, View} from "react-native";
import consume from "../../contexts/GlobalConsumer";

class JobScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        const {user} = this.props
        user.getWorks()
    }

    toggleModal() {
        const from = this.props.navigation.getParam("from", 0);
        if (from === 'filter_job') {
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
                {user.state.fetchingWorks ? (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("../../assets/others/loader.gif")} style={{width: 120, height: 120, resizeMode: "contain"}}/>
                    </View>
                ) : (
                    <Selector
                        navigation={this.props.navigation}
                        screen="Job"
                        icon={require("../../assets/profile/pink_workout.png")}
                        text="What is your job?"
                        options={user.state.works}
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

export default consume(JobScreen)