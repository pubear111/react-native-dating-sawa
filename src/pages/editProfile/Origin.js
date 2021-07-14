import {Container} from "native-base";
import React, {Component} from "react";
import InfoModal from "../components/InfoModal";
import Selector from "./Selector";
import ProgressHeader from "./ProgressHeader";
import consume from "../../contexts/GlobalConsumer";


class OriginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: this.props.navigation.getParam("selected", ""),
            from: this.props.navigation.getParam("from", "origin"),
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        const from = this.props.navigation.getParam("from", 0);
        if (from === 'filter_origin' || from === 'filter_country') {
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
        return (
            <Container>
                <ProgressHeader
                    toggleModal={this.toggleModal}
                    progress={this.getProgress()}
                />
                <Selector
                    navigation={this.props.navigation}
                    screen="Origin"
                    from={this.state.from}
                    icon={require("../../assets/profile/pink_workout.png")}
                    text="Where are you from?"
                    options={this.props.user.state.lang.countries}
                />
                <InfoModal
                    visible={this.state.visible}
                    navigation={this.props.navigation}
                    toggleModal={this.toggleModal}
                />
            </Container>
        );
    }
}

export default consume(OriginScreen)