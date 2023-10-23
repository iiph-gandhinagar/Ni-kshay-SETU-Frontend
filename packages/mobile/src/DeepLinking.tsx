import { utils } from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Linking } from 'react-native';
const deepLinksConf = {
    screens: {
        Home: {
            initialRouteName: 'HomeScreen',
            screens: {
                HomeScreen: 'HomeScreen',
                Leaderboards: {
                    initialRouteName: 'Leaderboard',
                    screens: {
                        Leaderboard: 'Leaderboard',
                        Tasks: 'Tasks',
                        Achievements: 'Achievements',
                        Information: 'Information',
                    },
                },
                Assessment: {
                    initialRouteName: 'Performance',
                    screens: {
                        Performance: 'Performance',
                        CurrentAssessment: 'CurrentAssessment',
                        PastAssessment: 'PastAssessment',
                        FutureAssessment: 'FutureAssessment',
                    },
                },
                AllModules: 'AllModules',
                Account: 'Account',
                EditProfile: 'EditProfile',
                EditProfilePicture: 'EditProfilePicture',
                ChangePassword: 'ChangePassword',
                Algorithms: 'Algorithms/:name/:sectionKey',
                AlgorithmList: 'AlgorithmList/:name/:type/:algo_Id',
                AlgorithmDetails: 'AlgorithmDetails',
                AlgorithmScreen: 'AlgorithmScreen',
                CmsScreen: 'CmsScreen',
                AboutCGCProject: 'AboutCGCProject',
                AboutIIPHG: 'AboutIIPHG',
                ContactUs: 'ContactUs',
                Materials: 'Materials/:id/:type_of_materials/:title',
                SelectLang: 'SelectLang',
                MasterSearch: {
                    screens: {
                        Modules: 'Modules',
                        SubModules: 'SubModules',
                        ResourceMaterial: 'ResourceMaterial',
                        Faq: 'Faq',
                    },

                },
                SurveyFormList: 'SurveyFormList',
                WebView: 'WebView/:url/:title',
            },
        },
    },
};

export const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: deepLinksConf,
    enabled: true,

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
        // First, you would need to get the initial URL from your third-party integration
        // The exact usage depend on the third-party SDK you use
        // For example, to get to get the initial URL for Firebase Dynamic Links:
        const { isAvailable } = utils().playServicesAvailability;
        console.log('isAvailable', isAvailable);

        if (isAvailable) {
            const initialLink = await dynamicLinks().getInitialLink();
            console.log('initialLink', initialLink);
            if (initialLink) {
                return initialLink.url;
            }
        }

        // As a fallback, you may want to do the default deep link handling
        const url = await Linking.getInitialURL();

        return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {
        // Listen to incoming links from Firebase Dynamic Links
        const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
            listener(url);
        });

        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
            listener(url);
        });

        return () => {
            // Clean up the event listeners
            unsubscribeFirebase();
            linkingSubscription.remove();
        };
    },
};
