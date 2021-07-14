import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { MaterialDialog } from "react-native-material-dialog";

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  render() {
    return (
      <MaterialDialog
        title="Exit before finishing?"
        visible={this.props.visible}
        onOk={() => {
          this.props.toggleModal();
        }}
        okLabel="OK, LET'S KEEP GOING"
        onCancel={() => {
          this.props.toggleModal();
          this.props.navigation.goBack();
        }}
        cancelLabel="MAYBE LATER"
        colorAccent="#F9707B"
      >
        <Text>
          You want to know these things about other peoples, and they want to
          know about you too! Filling out all of your basic info will help you
          get more matches and more replies.
        </Text>
      </MaterialDialog>
    );
  }
}

const styles = StyleSheet.create({
  indicators: {
    position: "absolute",
    top: 25,
    right: 10,
    zIndex: 100
  },
  circleContainer: {
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.8)"
  },
  currentIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5
  }
});

export default InfoModal;
