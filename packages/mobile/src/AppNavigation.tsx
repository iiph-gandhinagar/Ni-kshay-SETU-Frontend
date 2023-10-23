import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions } from 'react-native';
import { ChatBotLogo } from './components/core/ChatBotLogo';
import AboutCGCProject from './screens/Account/AboutCGCProject';
import AboutIIPHG from './screens/Account/AboutIIPHG';
import Account from './screens/Account/Account';
import ChangePassword from './screens/Account/ChangePassword';
import ContactUs from './screens/Account/ContactUs';
import EditProfile from './screens/Account/EditProfile';
import EditProfilePicture from './screens/Account/EditProfilePicture';
import Algorithms from './screens/Algorithms';
import AlgorithmDetails from './screens/Algorithms/AlgorithmDetails';
import AlgorithmList from './screens/Algorithms/AlgorithmList';
import AlgorithmScreen from './screens/Algorithms/AlgorithmScreen';
import CmsScreen from './screens/Algorithms/CmsScreen';
import AllModules from './screens/AllModules';
import Assessment from './screens/Assessment/Assessment';
import AssessmentQuestions from './screens/Assessment/AssessmentQuestions';
import PastAssessmentView from './screens/Assessment/PastAssessmentView';
import Certificates from './screens/Certificates';
import CertificateView from './screens/Certificates/CertificateView';
import ChatTool from './screens/Chat';
import FeedBackScreen from './screens/FeedBackScreen';
import AllHealthFaci from './screens/HealthFacility/AllHealthFaci';
import FilterScreen from './screens/HealthFacility/FilterScreen';
import HealthFaci from './screens/HealthFacility/HealthFaciScreen';
import SearchFilter from './screens/HealthFacility/SearchFilter';
import HomeScreen from './screens/HomeScreen';
import LabInvestigation from './screens/LabInvestigation';
import ScoreResult from './screens/LabInvestigation/ScoreResult';
import { LangSelecter } from './screens/LangSelecter';
import Leaderboard from './screens/Leaderboard/Leaderboard';
import MasterSearch from './screens/MasterSearch';
import Materials from './screens/Materials/Material';
import PDFView from './screens/Materials/PDFView';
import ResourceMaterial from './screens/Materials/ResourceMaterial';
import VideoView from './screens/Materials/VideoView';
import OnboardingScreen from './screens/OnboardingScreen';
import Screening from './screens/Screening';
import NutritionOutcome from './screens/Screening/NutritionOutcome';
import NutritionOutcomeDetails from './screens/Screening/NutritionOutcomeDetails';
import Result from './screens/Screening/Result';
import ScreeningStepper from './screens/Screening/ScreeningStepper';
import Survey from './screens/SuvryForm';
import SurveyFormList from './screens/SuvryForm/SurveyFormList';
import SurveyQuestions from './screens/SuvryForm/SurveyQuestions';
import WebViewScreen from './screens/WebView';
import Notifications from './screens/Notifications';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const Stack = createNativeStackNavigator();
const hideScreens = ['AlgorithmDetails', 'AlgorithmScreen', 'MasterSearch', 'ScreeningStepper',
    'Assessment', 'Chat', 'EditProfile', 'CmsScreen', 'WebView', 'PDFView', 'VideoView', 'AssessmentQuestions'];
export const ScreenStacks = (props) => {
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    const TabName = getFocusedRouteNameFromRoute(props?.route);
    const ScreenName = props?.route?.state?.routes?.[props?.route?.state?.index]
        ? getFocusedRouteNameFromRoute(
            props?.route?.state?.routes?.[props?.route?.state?.index],
        )
        : '';
    const hide = hideScreens.includes(TabName);
    const hide2 = hideScreens.includes(ScreenName);
    return (
        <React.Fragment>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="HomeScreen" >
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    initialParams={{ name: 'Home' }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Leaderboards"
                    component={Leaderboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Assessment"
                    component={Assessment}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllModules"
                    component={AllModules}
                    initialParams={{ name: 'All Modules' }}
                    options={{ headerShown: false, title: 'All Modules' }}
                />
                <Stack.Screen
                    name="AlgorithmList"
                    component={AlgorithmList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    initialParams={{ name: 'Edit Profile' }}
                    component={EditProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    initialParams={{ name: 'Change Password' }}
                    component={ChangePassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfilePicture"
                    initialParams={{ name: 'Edit Profile' }}
                    component={EditProfilePicture}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Algorithms"
                    component={Algorithms}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AlgorithmDetails"
                    component={AlgorithmDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AlgorithmScreen"
                    component={AlgorithmScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AboutCGCProject"
                    initialParams={{ name: 'About US' }}
                    component={AboutCGCProject}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AboutIIPHG"
                    initialParams={{ name: 'Partners' }}
                    component={AboutIIPHG}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ContactUs"
                    initialParams={{ name: 'Contact Us' }}
                    component={ContactUs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    initialParams={{ name: 'Master Search' }}
                    name="MasterSearch"
                    component={MasterSearch}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CmsScreen"
                    component={CmsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WebView"
                    component={WebViewScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Certificates"
                    component={Certificates}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PastAssessmentView"
                    component={PastAssessmentView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CertificateView"
                    component={CertificateView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AssessmentQuestions"
                    component={AssessmentQuestions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectLang"
                    initialParams={{ name: 'Select Language' }}
                    component={LangSelecter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FeedBackScreen"
                    initialParams={{ name: 'Feed Back' }}
                    component={FeedBackScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResourceMaterial"
                    component={ResourceMaterial}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Materials"
                    component={Materials}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PDFView"
                    component={PDFView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VideoView"
                    component={VideoView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HealthFaci"
                    component={HealthFaci}
                    initialParams={{ name: 'Health Facility' }}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllHealthFaci"
                    component={AllHealthFaci}
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="Screening"
                    component={Screening}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ScreeningStepper"
                    component={ScreeningStepper}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FilterScreen"
                    component={FilterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchFilter"
                    component={SearchFilter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LabInvestigation"
                    component={LabInvestigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Result"
                    component={Result}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NutritionOutcome"
                    component={NutritionOutcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NutritionOutcomeDetails"
                    component={NutritionOutcomeDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ScoreResult"
                    component={ScoreResult}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatTool}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Survey"
                    component={Survey}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SurveyFormList"
                    initialParams={{ name: 'Survey List' }}
                    component={SurveyFormList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SurveyQuestions"
                    initialParams={{ name: 'Survey Questions' }}
                    component={SurveyQuestions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
            {hide || hide2 ? null :
                // <Draggable
                //     onDrag={() => {
                //         dispatch(setAppScrolling(false));
                //         setTimeout(() => {
                //             dispatch(setAppScrolling(true));
                //         }, 10000);

                //     }}
                //     onDragRelease={() => dispatch(setAppScrolling(true))}
                //     onShortPressRelease={() => {
                //     }}
                //     z={1000}
                //     imageSource={require('./assets/ChatbotW.png')}
                //     renderSize={RFValue(60)}
                //     maxX={ScreenWidth}
                //     maxY={ScreenHeight}
                //     minY={RFValue(20)}
                //     minX={RFValue(0)}
                //     children={
                <ChatBotLogo onPress={() => {
                    navigation.navigate('Chat');
                }} />
                // }
                // x={ScreenWidth - RFValue(80)}
                // y={ScreenHeight - RFValue(330)} />
            }
        </React.Fragment>

    );
};
