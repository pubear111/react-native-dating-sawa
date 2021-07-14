import React  from 'react';
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import DrinkingScreen from '../../pages/editProfile/Drinking';
import EducationScreen from '../../pages/editProfile/Education';
import ExerciseScreen from '../../pages/editProfile/Exercise';
import HeightScreen from '../../pages/editProfile/Height';
import JobScreen from '../../pages/editProfile/Job';
import ReligionScreen from '../../pages/editProfile/Religion';
import SmokingScreen from '../../pages/editProfile/Smoking';
import StarSignScreen from '../../pages/editProfile/StarSign';
import OriginScreen from '../../pages/editProfile/Origin';
import ChatScreen from '../../pages/home/Chat';
import ContactUsScreen from '../../pages/home/ContactUs';
import EditProfileScreen from '../../pages/home/EditProfile';
import FilterScreen from '../../pages/home/Filter';
import HomeScreen from '../../pages/home/Home';
import SettingsScreen from '../../pages/home/Settings';
import BuildYourProfileScreen from '../../pages/start/BuildYourProfile';
import EnterEmailScreen from '../../pages/start/EnterEmail';
import IntroduceYourselfScreen from '../../pages/start/IntroduceYourself';
import PasswordScreen from '../../pages/start/Password';
import ForgetPasswordScreen from '../../pages/start/ForgetPassword';
import DeactivateScreen from '../../pages/home/Deactivate';
import SignUpScreen from '../../pages/start/SignUp';
import VerificationCodeScreen from '../../pages/start/VerificationCode';
import AuthLoading from '../../pages/auth/AuthLoading';
import NotActiveScreen from "./NotActive";

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Settings: SettingsScreen,
        ContactUs: ContactUsScreen,
        Filter: FilterScreen,
        EditProfile: EditProfileScreen,
        Chat: ChatScreen,
        Job: JobScreen,
        Education: EducationScreen,
        Exercise: ExerciseScreen,
        Height: HeightScreen,
        Religion: ReligionScreen,
        Smoking: SmokingScreen,
        Drinking: DrinkingScreen,
        StarSign: StarSignScreen,
        Origin: OriginScreen,
        Deactivate: DeactivateScreen,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

const AuthStack = createStackNavigator(
    {
        SignUp: SignUpScreen,
        EnterEmail: EnterEmailScreen,
        IntroduceYourself: IntroduceYourselfScreen,
        BuildYourProfile: BuildYourProfileScreen,
        VerificationCode: VerificationCodeScreen,
        Password: PasswordScreen,
        ForgetPassword: ForgetPasswordScreen,
        NotActive: NotActiveScreen,
    },
    {
        initialRouteName: 'SignUp',
        headerMode: 'none'
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
