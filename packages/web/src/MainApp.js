import { setAppPlatform, storeModuleUsage } from '@tb-frontend/shared/Store/action/appActions';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutCGCProject from './pages/AboutCGCProject';
import Account from './pages/Account/Account';
import ChangePassword from './pages/Account/ChangePassword';
import ContactUs from './pages/Account/ContactUs';
import EditProfileDetails from './pages/Account/EditProfileDetails';
import EditProfilePicture from './pages/Account/EditProfilePicture';
import Algorithms from './pages/Algorithms';
import AlgorithmDetails from './pages/Algorithms/AlgorithmDetails';
import AlgorithmList from './pages/Algorithms/AlgorithmList';
import AlgorithmScreen from './pages/Algorithms/AlgorithmScreen';
import AlgorithmWithOutOptins from './pages/Algorithms/AlgorithmWithOutOptins';
import ApplicationLanguage from './pages/ApplicationLanguage';
import Assessment from './pages/Assessment/Assessment';
import CurrentAssessmentsDetails from './pages/Assessment/AssessmentQuestions/[id]';
import Certificates from './pages/Certificates';
import FeedBack from './pages/FeedBack';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LaboratoryInvestigation from './pages/LaboratoryInvestigation/index';
import ScoreResult from './pages/LaboratoryInvestigation/ScoreResult';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Login from './pages/Login';
import MasterSearch from './pages/MasterSearch';
import MoreTools from './pages/MoreTools';
import PartnersAndDevelopers from './pages/PartnersAndDevelopers';
import ReferralHealthFacility from './pages/ReferralHealthFacility';
import SearchHealthFacility from './pages/ReferralHealthFacility/SearchHealthFacility';
import ResourceMaterials from './pages/ResourceMaterials';
import Material from './pages/ResourceMaterials/Material';
import Screening from './pages/Screening/';
import NutritionOutcome from './pages/Screening/NutritionOutcome';
import NutritionOutcomeDetails from './pages/Screening/NutritionOutcomeDetails';
import ScreeningDetails from './pages/Screening/ScreeningDetails';
import ScreeningDetailsResult from './pages/Screening/ScreeningDetailsResult';
import Signup from './pages/Signup';
import SurveyForm from './pages/SurveyForm';
import SurveyFormList from './pages/SurveyForm/SurveyFormList';
import SurveyQuestions from './pages/SurveyForm/SurveyQuestions';
import VerifyMobileNumber from './pages/VerifyMobileNumber';
import VerifyOtpPassword from './pages/VerifyOtpPassword';
import { PrivateRoute, PublicRoute } from './utils/route';

export const mixpanel = require('mixpanel-browser');
mixpanel.init("7bdcd02f9688698a1ab54c7cab908392");
const MainApp = () => {
    const dispatch = useDispatch();
    const { platform } = useSelector(state => state?.app);
    const uploadModuleUsage = () => {
        const usage = localStorage.getItem("usage")
        if (usage) {
            var total_data = Object.assign([], JSON.parse(usage))
            var moduleUsage = total_data.slice(0, 10);
            if (moduleUsage.length > 0) {
                dispatch(storeModuleUsage(moduleUsage, (ids) => {
                    const xyz = Object.assign([], JSON.parse(usage))
                    for (let index = 0; index < ids.length; index++) {
                        const findIndex = xyz.findIndex(e => e.id == ids[index])
                        xyz.splice(findIndex, 1)
                    }
                    localStorage.setItem('usage', JSON.stringify(xyz))
                    uploadModuleUsage()
                    return null;
                }));
            } else {
                return null
            }
        } else {
            return null
        }
    };
    useEffect(() => {
        dispatch(setAppPlatform('web'));
        uploadModuleUsage()
        localStorage.setItem("app_start_time", moment(new Date()))
        window.addEventListener("beforeunload", () => {
            const appTime = localStorage.getItem("app_start_time")
            const usage = localStorage.getItem("usage")
            if (usage) {
                const oldArry = Object.assign([], JSON.parse(usage))
                oldArry.push({ id: oldArry.length + 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                localStorage.setItem("usage", JSON.stringify(oldArry))
            } else {
                const newArry = Object.assign([], [])
                newArry.push({ id: 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                localStorage.setItem('usage', JSON.stringify(newArry))
            }
            localStorage.removeItem("app_start_time")
        })
        document.addEventListener("mouseenter", () => {
            localStorage.setItem("app_start_time", moment(new Date()))
        })
        document.addEventListener("mouseleave", (event) => {
            const appTime = localStorage.getItem("app_start_time")
            const usage = localStorage.getItem("usage")
            if (usage) {
                const oldArry = Object.assign([], JSON.parse(usage))
                oldArry.push({ id: oldArry.length + 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                localStorage.setItem("usage", JSON.stringify(oldArry))
            } else {
                const newArry = Object.assign([], [])
                newArry.push({ id: 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                localStorage.setItem('usage', JSON.stringify(newArry))
            }
            localStorage.removeItem("app_start_time")
        })
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                localStorage.setItem("app_start_time", moment(new Date()))
                // uploadModuleUsage()
            } else {
                const appTime = localStorage.getItem("app_start_time")
                if (appTime) {
                    const usage = localStorage.getItem("usage")
                    if (usage) {
                        const oldArry = Object.assign([], JSON.parse(usage))
                        oldArry.push({ id: oldArry.length + 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                        localStorage.setItem("usage", JSON.stringify(oldArry))
                    } else {
                        const newArry = Object.assign([], [])
                        newArry.push({ id: 1, module: "overall_app_usage", activity_type: "app_usage", sub_module_id: 0, time: parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds()) })
                        localStorage.setItem('usage', JSON.stringify(newArry))
                    }
                    localStorage.removeItem("app_start_time")
                }

            }
        });
        return function name(params) {
            document.removeEventListener("visibilitychange", () => {
            })
            window.removeEventListener("beforeunload", () => {
            })
            document.removeEventListener("mouseleave", () => {
            })
            document.removeEventListener("mouseenter", () => {
            })
        }
    }, [])
    return (
        <React.Fragment>
            <BrowserRouter>
                {platform == null ? null :
                    <Layout>
                        <Switch>
                            <PrivateRoute path="/" exact component={Home} />
                            <PrivateRoute path="/Leaderboard" exact component={Leaderboard} />
                            <PrivateRoute path="/Assessment" exact component={Assessment} />
                            <PublicRoute path="/Login" exact component={Login} />
                            <PublicRoute path="/Sign-up" exact component={Signup} />
                            <PublicRoute path="/VerifyMobileNumber" exact component={VerifyMobileNumber} />
                            <PublicRoute path="/VerifyOtpPassword" exact component={VerifyOtpPassword} />
                            <PublicRoute path="/ForgotPassword" exact component={ForgotPassword} />
                            <PrivateRoute path="/Account" exact component={Account} />
                            <PrivateRoute path="/EditProfileDetails" exact component={EditProfileDetails} />
                            <PrivateRoute path="/EditProfilePicture" exact component={EditProfilePicture} />
                            <PrivateRoute path="/MoreTools" exact component={MoreTools} />
                            <PrivateRoute path="/Algorithms" exact component={Algorithms} />
                            <PrivateRoute path="/AlgorithmList" exact component={AlgorithmList} />
                            <PrivateRoute path="/AlgorithmList/AlgorithmDetails" exact component={AlgorithmDetails} />
                            <PrivateRoute path="/AlgorithmList/AlgorithmDetails/AlgorithmScreen" exact component={AlgorithmScreen} />
                            <PrivateRoute path="/AlgorithmList/AlgorithmDetails/Algorithm" exact component={AlgorithmWithOutOptins} />
                            <PrivateRoute path="/ResourceMaterials" exact component={ResourceMaterials} />
                            <PrivateRoute path="/ResourceMaterials/Material" exact component={Material} />
                            <PrivateRoute path="/AssessmentQuestions/:id" slug component={CurrentAssessmentsDetails} />
                            <PrivateRoute path="/LaboratoryInvestigation" exact component={LaboratoryInvestigation} />
                            <PrivateRoute path="/LaboratoryInvestigation/ScoreResult" exact component={ScoreResult} />
                            <PrivateRoute path="/Certificates" exact component={Certificates} />
                            <PrivateRoute path="/MasterSearch" exact component={MasterSearch} />
                            <PrivateRoute path="/ReferralHealthFacility" exact component={ReferralHealthFacility} />
                            <PrivateRoute path="/SearchHealthFacility" exact component={SearchHealthFacility} />
                            <PrivateRoute path="/Screening" exact component={Screening} />
                            <PrivateRoute path="/ScreeningDetails" exact component={ScreeningDetails} />
                            <PrivateRoute path="/ScreeningDetailsResult" exact component={ScreeningDetailsResult} />
                            <PrivateRoute path="/NutritionOutcome" exact component={NutritionOutcome} />
                            <PrivateRoute path="/NutritionOutcomeDetails" exact component={NutritionOutcomeDetails} />
                            <PrivateRoute path="/Survey" exact component={SurveyForm} />
                            <PrivateRoute path="/SurveyFormList" exact component={SurveyFormList} />
                            <PrivateRoute path="/SurveyQuestions" exact component={SurveyQuestions} />
                            <Route path="/AboutCGCProject" component={AboutCGCProject} />
                            <Route path="/PartnersAndDevelopers" component={PartnersAndDevelopers} />
                            <PrivateRoute path="/ContactUs" exact component={ContactUs} />
                            <PrivateRoute path="/FeedBack" exact component={FeedBack} />
                            <PrivateRoute path="/ApplicationLanguage" exact component={ApplicationLanguage} />
                            <PrivateRoute path="/ChangePassword" exact component={ChangePassword} />
                        </Switch>
                    </Layout>}
            </BrowserRouter>
        </React.Fragment>
    )
};

export default MainApp;
