import React from 'react'
import * as UserFunctions from './UserFunctions'
import * as AuthFunctions from "../auth/AuthFunctions";
import {api, empty} from "../../helpers/functions";
import moment from 'moment'
import {AsyncStorage} from "react-native";
import ar from '../../helpers/lang/ar'
import en from '../../helpers/lang/en'

export const UserContext = React.createContext()

export default class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            gender: [
                {label: 'Male', value: "male", color: '#F86F7A', size: 20, id: 1, selected: true},
                {label: 'Female', value: 'female', color: '#F86F7A', size: 20, id: 2},
            ],
            name: '',
            password: '',
            confirmPassword: '',
            date: new Date(),
            avatarSource: undefined,
            photoPickerSource: undefined,
            lang: en,
            defaultLang: 'en',
            currentLang: 'en',
            currentLangLabel: 'English',
            availableLanguages: [
                {label: 'English', value: 'en'},
                {label: 'العربية', value: 'ar'},
            ],
            settingsVisiblePhotos: false,
            settingsNotification: false,
            settingsDiscoverability: false,
            educations: [],
            fetchingEducations: false,
            religions: [],
            fetchingReligions: false,
            works: [],
            fetchingWorks: false,
            fetchingProfile: false,
            profile: {
                bio: '',
                work: '',
                education: '',
                gender: 1,
                birthday: '',
                origin: '',
                exercise: '',
                height: '',
                religion: '',
                smoking: '',
                drinking: '',
                star: '',
            },
            photos: [
                {
                    id:1,
                    url: require("../../assets/home/profile.png")
                },
                {
                    id:2,
                    url: require("../../assets/home/profile.png")
                },
                {
                    id:3,
                    url: require("../../assets/home/profile.png")
                },
            ],
        }
    }

    render() {
        return (
            <UserContext.Provider value={{
                state: this.state,
                onPressGender: this.onPressGender,
                onPasswordChange: this.onPasswordChange,
                onPasswordConfirmChange: this.onPasswordConfirmChange,
                onNameChange: this.onNameChange,
                onDateChange: this.onDateChange,
                onImagePicker: this.onImagePicker,
                updateProfile: this.updateProfile,
                updateLocation: this.updateLocation,
                setCurrentLang: this.setCurrentLang,
                toggleVisiblePhotosAPI: this.toggleVisiblePhotosAPI,
                toggleNotificationAPI: this.toggleNotificationAPI,
                toggleDiscoverabilityAPI: this.toggleDiscoverabilityAPI,
                deactivateAccount: this.deactivateAccount,
                toggleVisiblePhotos: this.toggleVisiblePhotos,
                toggleNotification: this.toggleNotification,
                toggleDiscoverability: this.toggleDiscoverability,
                getEducations: this.getEducations,
                getReligions: this.getReligions,
                getWorks: this.getWorks,
                setUserSettings: this.setUserSettings,
                getProfile: this.getProfile,
                addPhoto: this.addPhoto,
                deletePhoto: this.deletePhoto,
                onPhotoPicker: this.onPhotoPicker,
                sendVerificationRequest: this.sendVerificationRequest,
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

    onPressGender = gender => this.setState({gender});

    onImagePicker = avatarSource => this.setState({avatarSource});


    onPasswordChange = (password) => {
        this.setState({password: password.replace(/^\s+|\s+$/g, "")})
    }

    onPasswordConfirmChange = (confirmPassword) => {
        this.setState({confirmPassword: confirmPassword.replace(/^\s+|\s+$/g, "")})
    }

    onNameChange = (name) => {
        this.setState({name: name.replace(/^\s+|\s+$/g, "")})
    }

    onDateChange = (date) => {
        this.setState({date: date})
    }

    updateProfile = (code) => {
        let selectedGender = this.state.gender.find(e => e.selected === true);
        selectedGender = selectedGender.id
        const date = moment(this.state.date).format('DD/MM/YYYY')
        const formData = new FormData();
        //Add your input data
        formData.append('session_id', code);
        formData.append('code', code);
        formData.append('gender', selectedGender);
        formData.append('name', this.state.name);
        formData.append('birthday', date);
        formData.append('pwd', this.state.password);
        if (!!this.state.avatarSource) {
            const imgURI = this.state.avatarSource.uri
            const image = {
                uri: imgURI,
                name: `avatar_${this.state.name}_${date}.png`,
                type: `image/png`

            }
            formData.append('file', image);
        }
        return api('update_profile', formData, true).then((response) => {
            return response
        })
    }

    updateLocation = async (longitude, latitude) => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {
            session_id: sessionId,
            longitude,
            latitude,
            code: 'US'
        }
        return api('update_geolocation', params).then((response) => {
            return response
        })
    }

    setCurrentLang = (currentLang) => {
        const isExist = this.state.availableLanguages.find((item) => item.value === currentLang)
        if (isExist) {
            let currentLangLabel = isExist.label
            let lang = en
            switch (currentLang) {
                case 'en': {
                    lang = en
                    break
                }
                case 'ar': {
                    lang = ar
                    break
                }
            }
            this.setState({currentLang, lang, currentLangLabel})
            AsyncStorage.setItem('lang', currentLang)
        }
    }

    toggleVisiblePhotosAPI = async () => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {
            session_id: sessionId,
            discoverability: null,
            photos_visibility: !this.state.settingsVisiblePhotos ? 1 : 0,
            notification: null
        }
        return api('settings', params).then((response) => {
            return response
        })
    }

    toggleNotificationAPI = async () => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {
            session_id: sessionId,
            discoverability: null,
            photos_visibility: null,
            notification: !this.state.settingsNotification ? 1 : 0
        }
        return api('settings', params).then((response) => {
            return response
        })
    }

    toggleDiscoverabilityAPI = async () => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {
            session_id: sessionId,
            discoverability: !this.state.settingsDiscoverability ? 1 : 0,
            photos_visibility: null,
            notification: null
        }
        return api('settings', params).then((response) => {
            return response
        })
    }

    deactivateAccount = async (pwd) => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {
            session_id: sessionId,
            pwd
        }
        return api('deactivate_account', params).then((response) => {
            return response
        })
    }

    toggleVisiblePhotos = (visiblePhotos = undefined) => {
        this.setState({settingsVisiblePhotos: typeof visiblePhotos === 'boolean' ? visiblePhotos : !this.state.settingsVisiblePhotos})
    }

    toggleNotification = (notification = undefined) => {
        this.setState({settingsNotification: typeof notification === 'boolean' ? notification : !this.state.settingsNotification})
    }

    toggleDiscoverability = (discoverability = undefined) => {
        this.setState({settingsDiscoverability: typeof discoverability === 'boolean' ? discoverability : !this.state.settingsDiscoverability})
    }

    setUserSettings = (user) => {
        const newState = {}
        newState.settingsVisiblePhotos = !!user.visible_photos
        newState.settingsNotification = !!user.notification
        newState.settingsDiscoverability = !!user.discoverability
        this.setState(newState)
    }

    getEducations = async () => {
        if (this.state.educations.length > 0) return
        this.setState({fetchingEducations: true})
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {session_id: sessionId,}
        api('get_educations', params).then((response) => {
            this.setState({fetchingEducations: false})
            if (response.code === 1) {
                const {data} = response
                this.setState({educations: data})
            }
        }).catch(error => {
            this.setState({fetchingEducations: false})
            console.log(error)
        })
    }

    getReligions = async () => {
        if (this.state.religions.length > 0) return
        this.setState({fetchingReligions: true})
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {session_id: sessionId,}
        api('get_religions', params).then((response) => {
            this.setState({fetchingReligions: false})
            if (response.code === 1) {
                const {data} = response
                this.setState({religions: data})
            }
        }).catch(error => {
            this.setState({fetchingReligions: false})
            console.log(error)
        })
    }

    getWorks = async () => {
        if (this.state.works.length > 0) return
        this.setState({fetchingWorks: true})
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {session_id: sessionId,}
        api('get_works', params).then((response) => {
            this.setState({fetchingWorks: false})
            if (response.code === 1) {
                const {data} = response
                this.setState({works: data})
            }
        }).catch(error => {
            this.setState({fetchingWorks: false})
            console.log(error)
        })
    }

    getProfile = async () => {
        if (this.state.works.length > 0) return
        this.setState({fetchingProfile: true})
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {session_id: sessionId,}
        api('get_profile', params).then((response) => {
            this.setState({fetchingProfile: false})
            if (response.code === 1) {
                const {data} = response
                console.log(data)
                // this.setState({works: data})
            }
        }).catch(error => {
            this.setState({fetchingProfile: false})
            console.log(error)
        })
    }

    addPhoto = async (photoPickerSource) => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const formData = new FormData();
        //Add your input data
        formData.append('session_id', sessionId);
        formData.append('type', 2); // 1 => profile , 2=> gallery (default)
        if (!!photoPickerSource) {
            const imgURI = photoPickerSource.uri
            const image = {
                uri: imgURI,
                name: `photo_${this.state.name}_${date}.png`,
                type: `image/png`
            }
            formData.append('file', image);
        }
        return api('add_photo', formData, true).then((response) => {
            return response
        })

    }

    deletePhoto = async (photoId) => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const params = {session_id: sessionId, photo_id:photoId}
        api('delete_photo', params).then((response) => {
            if (response.code === 1) {
                const {data} = response
                // this.setState({works: data})
            }
        }).catch(error => {
            console.log(error)
        })

    }

    sendVerificationRequest = async (photoPickerSource) => {
        let sessionId = await AsyncStorage.getItem('sessionId');
        const formData = new FormData();
        //Add your input data
        formData.append('session_id', sessionId);
        formData.append('method_id', 1); // 1 => profile , 2=> gallery (default)
        if (!!photoPickerSource) {
            const imgURI = photoPickerSource.uri
            const image = {
                uri: imgURI,
                name: `photo_${this.state.name}_${date}.png`,
                type: `image/png`
            }
            formData.append('file', image);
        }
        return api('submit_verification', formData, true).then((response) => {
            return response
        })

    }


}