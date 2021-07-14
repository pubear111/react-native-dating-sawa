import React, {Component} from "react";
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import Back_button_white from "../components/Back_button_white";
import {MaterialDialog} from "react-native-material-dialog";
import Icon from "react-native-vector-icons/AntDesign";
import EditProfileItem from "../components/EditProfileItem";
import consume from "../../contexts/GlobalConsumer";

const options = {
    title: "Select Media",
    customButtons: [{name: "fb", title: "Choose Photo from Facebook"}],
    storageOptions: {
        skipBackup: true,
        path: "images"
    },
    cameraType: "front"
};

const Icons = {
    Job: require("../../assets/home/gray_looking.png"),
    Education: require("../../assets/home/gray_looking.png"),
    // LookingFor: require("../../assets/home/gray_looking.png"),
    Origin: require("../../assets/home/gray_looking.png"),
    Exercise: require("../../assets/home/gray_excercise.png"),
    Height: require("../../assets/home/gray_height.png"),
    Religion: require("../../assets/home/gray_religion.png"),
    Smoking: require("../../assets/home/gray_smoking.png"),
    Drinking: require("../../assets/home/gray_drinking.png"),
    StarSign: require("../../assets/home/gray_star_sign.png")
};

class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible1: false,
            modalVisible2: false,
            modalVisible3: false,
            deleteModalVisible: false,
            deletePhotoIndex: 0,
            verify: false,
            avatarSource: require("../../assets/home/profile.png"),
            profileText: "",
            selected: {
                Job: "",
                Education: "",
                // LookingFor: "",
                Origin: "",
                Exercise: "",
                Height: "",
                Religion: "",
                Smoking: "",
                Drinking: "",
                StarSign: ""
            },
            aboutFocus: false,
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount() {
        this.props.user.getProfile()

    }

    handleSelect = (selector, option) => {
        let temp = this.state.selected;
        temp[selector] = option;
        this.setState({selected: temp});
    };

    handlePress = key => {
        let arr = [];
        for (let objKey in this.state.selected) {
            if (this.state.selected[objKey] === "") arr.push(objKey);
        }
        this.props.navigation.navigate(key, {
            selected: this.state.selected[key],
            handleSelect: this.handleSelect,
            total: arr.length,
            missing: arr
        });
    };

    showImage1 = () => {
        const {user} = this.props
        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                // const source = { uri: response.uri };
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = {uri: response.uri.replace("file://", ""), isStatic: true};
                user.addPhoto(source).then(response => {
                    console.log(response)
                }).catch(error => console.log(error))
            }
        });
    };

    showImage2 = () => {
        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                // const source = { uri: response.uri };
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = {
                    uri: response.uri.replace("file://", ""),
                    isStatic: true
                };
                this.setState({
                    avatarSource: source,
                    modalVisible3: true
                });
            }
        });
    };

    cancelEditAbout = () => {
        this._about.blur();
    };

    saveEditAbout = () => {
        // do something here
    };

    render() {
        const {user} = this.props

        return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={["#FA976D", "#F9737A", "#F75485"]}
            >
                {this.state.aboutFocus ? (
                    <View style={styles.editAboutBar}>
                        <TouchableOpacity onPress={this.cancelEditAbout}>
                            <Icon name="closecircleo" color="white" size={30}/>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "white",
                                marginStart: 10
                            }}
                        >
                            Edit about
                        </Text>
                        <TouchableOpacity onPress={this.saveEditAbout}>
                            <Icon name="checkcircleo" color="white" size={30}/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.topBar}>
                        <Back_button_white navigation={this.props.navigation}/>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "white",
                                marginStart: 10
                            }}
                        >
                            Edit profile
                        </Text>
                    </View>
                )}
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{paddingBottom: 15}}
                >
                    <View>
                        <View style={{height: 110, flex: 1}}>
                            <FlatList
                                data={user.state.photos}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListHeaderComponent={() => (
                                    <View style={styles.image_list_container}>
                                        <TouchableOpacity onPress={this.showImage1}>
                                            <View style={[styles.image_list, {marginStart: 10}]}>
                                                <Text
                                                    style={{fontSize: 14, color: "black", padding: 5}}
                                                >
                                                    Add
                                                </Text>
                                                <Image
                                                    source={require("../../assets/home/black_plus.png")}
                                                    style={{
                                                        width: 14,
                                                        height: 14,
                                                        resizeMode: "contain"
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                renderItem={({item, index}) => (
                                    <View style={styles.image_list_container}>
                                        <TouchableOpacity onPress={() => {
                                        }}>
                                            <View style={styles.image_list}>
                                                <Image
                                                    source={item.url}
                                                    style={styles.image_list_image}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                style={{
                                                    position: "absolute",
                                                    top: -10,
                                                    left: -10,
                                                    zIndex: 100
                                                }}
                                                onPress={() =>
                                                    this.setState({
                                                        deleteModalVisible: true,
                                                        deletePhotoIndex: index
                                                    })
                                                }
                                            >
                                                <Image
                                                    source={require("../../assets/home/close.png")}
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                        resizeMode: "contain"
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={styles.sub_container}>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: "black"}}
                            >
                                Verification
                            </Text>
                            <TouchableOpacity
                                style={{width: "100%", alignItems: "center", marginTop: 10}}
                                onPress={() => this.setState({modalVisible1: true})}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={["#FA986C", "#F97579", "#F75385"]}
                                    style={styles.verify_button}
                                >
                                    <Text
                                        style={{fontSize: 16, fontWeight: "bold", color: "white"}}
                                    >
                                        Verify Your Account
                                    </Text>
                                    <Image
                                        source={require("../../assets/white_plus.png")}
                                        style={styles.plus}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sub_container}>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: "black"}}
                            >
                                About Me
                            </Text>
                            <TextInput
                                ref={r => (this._about = r)}
                                style={{
                                    width: "100%",
                                    height: 120,
                                    backgroundColor: "#F7F7F7",
                                    marginTop: 10,
                                    textAlignVertical: "top"
                                }}
                                multiline={true}
                                numberOfLines={10}
                                placeholder="A little bit about you..."
                                onChangeText={text => this.setState({profileText: text})}
                                value={this.state.profileText}
                                onFocus={() => this.setState({aboutFocus: true})}
                                onBlur={() => this.setState({aboutFocus: false})}
                            />
                        </View>
                        <View style={styles.sub_container}>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: "black"}}
                            >
                                My Work {"&"} Education
                            </Text>
                            {Object.keys(Icons).map(key => {
                                if (key === "Job" || key === "Education") {
                                    return (
                                        <EditProfileItem
                                            key={key}
                                            selected={this.state.selected[key]}
                                            onPress={() => this.handlePress(key)}
                                            icon={Icons[key]}
                                            text={key}
                                        />
                                    );
                                }
                            })}
                        </View>
                        <View style={[styles.sub_container, {marginBottom: 10}]}>
                            <Text
                                style={{fontSize: 16, fontWeight: "bold", color: "black"}}
                            >
                                My Basic Info
                            </Text>
                            <View style={styles.listItem}>
                                <Text>Male</Text>
                            </View>
                            {Object.keys(Icons).map(key => {
                                if (key !== "Job" && key !== "Education") {
                                    return (
                                        <EditProfileItem
                                            key={key}
                                            selected={this.state.selected[key]}
                                            onPress={() => this.handlePress(key)}
                                            icon={Icons[key]}
                                            text={key}
                                        />
                                    );
                                }
                            })}
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
                <Modal
                    animationType={"fade"}
                    isVisible={this.state.modalVisible1 || this.state.modalVisible2}
                >
                    {this.state.modalVisible1 && (
                        <View style={styles.modal1}>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "black",
                                    textAlign: "center",
                                    marginTop: 20
                                }}
                            >
                                Show us yourself(IE)
                            </Text>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    textAlign: "center",
                                    lineHeight: 20,
                                    marginTop: 10
                                }}
                            >
                                We take our user's security very {"\n"} seriously. Please take a
                                second {"\n"} to verify your identity by sending {"\n"} us a
                                selfie
                            </Text>
                            <TouchableOpacity
                                style={{width: "100%", alignItems: "center", marginTop: 30}}
                                onPress={() =>
                                    this.setState({modalVisible1: false, modalVisible2: true})
                                }
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={["#FA986C", "#F97579", "#F75385"]}
                                    style={styles.modal_button}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                Platform.OS === "ios" ? "Courier New" : "monospace",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white"
                                        }}
                                    >
                                        Verify Now
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: "90%",
                                        height: 50,
                                        justifyContent: "center",
                                        marginTop: 5
                                    }}
                                    onPress={() =>
                                        this.setState({modalVisible1: !this.state.modalVisible1})
                                    }
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "black",
                                            textAlign: "center"
                                        }}
                                    >
                                        Remind me later
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {this.state.modalVisible2 && (
                        <View style={styles.modal2}>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "black",
                                    textAlign: "center",
                                    marginTop: 20
                                }}
                            >
                                Copy This Gesture
                            </Text>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    textAlign: "center",
                                    lineHeight: 20,
                                    marginTop: 10
                                }}
                            >
                                Copy the gesture in photo below. {"\n"} We'll compare them and
                                if they {"\n"} match your profile will be verified {"\n"} and
                                you can continue using Sawa {"\n"} as normal.
                            </Text>
                            <Image
                                source={require("../../assets/home/profile.png")}
                                style={styles.gesture}
                            />
                            <TouchableOpacity
                                style={{width: "100%", alignItems: "center"}}
                                onPress={() =>
                                    this.setState({modalVisible2: false}, () => {
                                        this.showImage2();
                                    })
                                }
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={["#FA986C", "#F97579", "#F75385"]}
                                    style={styles.modal_button}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                Platform.OS === "ios" ? "Courier New" : "monospace",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white"
                                        }}
                                    >
                                        I'M READY
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <TouchableOpacity
                                    style={{width: "90%", height: 50, justifyContent: "center"}}
                                    onPress={() =>
                                        this.setState({modalVisible2: !this.state.modalVisible2})
                                    }
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#AFAFAF",
                                            textAlign: "center"
                                        }}
                                    >
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Modal>
                <Modal animationType={"fade"} isVisible={this.state.modalVisible3}>
                    <View>
                        <View style={styles.modal3}>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "black",
                                    textAlign: "center",
                                    marginTop: 20
                                }}
                            >
                                Do they match?
                            </Text>
                            <Text
                                style={{
                                    fontFamily:
                                        Platform.OS === "ios" ? "Courier New" : "monospace",
                                    textAlign: "center",
                                    lineHeight: 20,
                                    marginTop: 10
                                }}
                            >
                                If your photo looks like the sample {"\n"} then submit it for
                                verification. {"\n"} It should only take a minute or two {"\n"}{" "}
                                for the results.
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 20,
                                    marginBottom: 20,
                                    justifyContent: "center"
                                }}
                            >
                                <Image
                                    source={require("../../assets/home/profile.png")}
                                    style={styles.match}
                                />
                                <Image source={this.state.avatarSource} style={styles.match}/>
                            </View>
                            <TouchableOpacity
                                style={{width: "100%", alignItems: "center"}}
                                onPress={() =>
                                    this.setState({modalVisible3: !this.state.modalVisible3})
                                }
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    colors={["#FA986C", "#F97579", "#F75385"]}
                                    style={styles.modal_button}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                Platform.OS === "ios" ? "Courier New" : "monospace",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: "white"
                                        }}
                                    >
                                        SUBMIT
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <TouchableOpacity
                                    style={{width: "90%", height: 50, justifyContent: "center"}}
                                    onPress={() => {
                                        this.setState({modalVisible3: !this.state.modalVisible3});
                                        this.showImage2();
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#AFAFAF",
                                            textAlign: "center"
                                        }}
                                    >
                                        Retake
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#7C7C7C",
                                borderRadius: 10,
                                alignItems: "center"
                            }}
                        >
                            <Text style={{textAlign: "center"}}>
                                *This photo will only be used for identification {"\n"} purposes
                                the never posted to your profile
                            </Text>
                        </View>
                    </View>
                </Modal>
                <MaterialDialog
                    title="Delete this photo?"
                    visible={this.state.deleteModalVisible}
                    onOk={this.onDeletePhoto}
                    okLabel="DELETE"
                    onCancel={() => {
                        this.setState({deleteModalVisible: false, deletePhotoIndex: 0});
                    }}
                    cancelLabel="CANCEL"
                    colorAccent="#F9707B"
                >
                    <Text>📷 Are you sure you want to delete this photo?</Text>
                </MaterialDialog>
            </LinearGradient>
        );
    }

    onSave = () => {

    }

    onDeletePhoto = () => {
        const arr = this.state.items;
        arr.splice(this.state.deletePhotoIndex, 1);
        this.setState({
            deleteModalVisible: false,
            items: arr,
            deletePhotoIndex: 0
        });

    }
}

const styles = StyleSheet.create({
    topBar: {
        width: "100%",
        height: "12%",
        paddingStart: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    editAboutBar: {
        width: "100%",
        height: "12%",
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
        width: "100%",
        height: "88%",
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 15
    },
    image_list_container: {
        width: 110,
        height: 110,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    image_list: {
        width: 100,
        height: 100,
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    image_list_image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    sub_container: {
        width: "100%",
        paddingStart: "3%",
        paddingEnd: "3%",
        marginTop: 15
    },
    verify_button: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 10
    },
    listItem: {
        width: "100%",
        height: 45,
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    plus: {
        width: 12,
        height: 12,
        resizeMode: "contain"
    },
    modal1: {
        width: 320,
        height: 280,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center"
    },
    modal2: {
        width: 320,
        height: 480,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center"
    },
    modal3: {
        width: 320,
        height: 420,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "center"
    },
    modal_button: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    gesture: {
        width: 180,
        height: 180,
        resizeMode: "contain",
        borderRadius: 10,
        alignSelf: "center",
        margin: 20
    },
    match: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        borderRadius: 10,
        alignSelf: "center",
        margin: 10
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

export default consume(EditProfileScreen)