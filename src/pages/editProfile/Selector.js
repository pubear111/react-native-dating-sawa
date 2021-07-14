import {Body, Content, Text, Thumbnail} from "native-base";
import React, {Component} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {StackActions} from "react-navigation";
import InfoButton from "../components/InfoButton";
import consume from "../../contexts/GlobalConsumer";

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            displaySkip: true,
            text: '',
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelected() {
        const {filter} = this.props
        const from = this.props.navigation.getParam("from", 0);
        let text = ''
        let displaySkip = true
        if (this.props.screen === 'Education' && from === 'filter_education') {
            this.selectedFilter = filter.state.education;
            text = 'Select education filter'
            displaySkip = false
        } else if (this.props.screen === 'Job' && from === 'filter_job') {
            this.selectedFilter = filter.state.work;
            text = 'Select job filter'
            displaySkip = false
        } else if (this.props.screen === 'Religion' && from === 'filter_religion') {
            this.selectedFilter = filter.state.religion;
            text = 'Select religion filter'
            displaySkip = false
        } else if (this.props.screen === 'Origin' && from === 'filter_countries') {
            this.selectedFilter = filter.state.country;
            text = 'Select country filter'
            displaySkip = false
        } else if (this.props.screen === 'Origin' && from === 'filter_origin') {
            this.selectedFilter = filter.state.origin;
            text = 'Select origin filter'
            displaySkip = false
        } else if (this.props.screen === "Drinking") {
            text = 'Do you drink?'
        } else if (this.props.screen === "Education") {
            text = 'What is your education?'
        } else if (this.props.screen === "Exercise") {
            text = 'Do you workout?"'
        } else if (this.props.screen === "Job") {
            text = 'What is your job?'
        } else if (this.props.screen === "Origin") {
            text = 'Where are you from?'
        } else if (this.props.screen === "Religion") {
            text = 'Do you identify with a religion?'
        } else if (this.props.screen === "Smoking") {
            text = 'Do you smoke?'
        } else if (this.props.screen === "StarSign") {
            text = 'What\'s your star sign?'
        }
        this.setState({text, displaySkip})
    }

    componentDidMount() {
        this.handleSelected()
    }

    handleSelect(selected) {
        // console.log(selected)
        const {filter} = this.props
        const from = this.props.navigation.getParam("from", 0);
        if (this.props.screen === 'Education' && from === 'filter_education') {
            filter.setEducation(selected)
            this.props.navigation.goBack()
        } else if (this.props.screen === 'Job' && from === 'filter_job') {
            filter.setWork(selected)
            this.props.navigation.goBack()
        } else if (this.props.screen === 'Religion' && from === 'filter_religion') {
            filter.setReligion(selected)
            this.props.navigation.goBack()
        } else if (this.props.screen === 'Origin' && from === 'filter_countries') {
            filter.setCountry(selected)
            this.props.navigation.goBack()
        } else if (this.props.screen === 'Origin' && this.props.from === 'filter_origin') {
            filter.setOrigin(selected)
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <Content>
                <Body style={{width: "100%"}}>
                <Thumbnail
                    source={this.props.icon}
                    style={{
                        width: 70,
                        height: 70,
                        resizeMode: "contain",
                        marginTop: 20
                    }}
                />
                <Text style={{fontSize: 20, fontWeight: "bold", margin: 20}}>
                    {this.state.text}
                </Text>
                {this.props.options.map((item, index) => (
                    <InfoButton
                        selected={!!this.selectedFilter ? item.id === this.selectedFilter.id : false}
                        item={item}
                        key={index}
                        onPress={this.handleSelect}
                    />
                ))}
                {this.state.displaySkip ? (
                    <TouchableOpacity
                        style={styles.buttonSkip}
                    >
                        <Text style={{color: "#F9707B"}}>skip</Text>
                    </TouchableOpacity>

                ) : null}
                </Body>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
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

export default consume(Selector)