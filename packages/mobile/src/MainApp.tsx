import { useNetInfo } from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {
  NavigationContainer, StackActions, useNavigation, useTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  getAllSimilarApps, getAppConfig,
  getAppDynamicAlgo,
  getAppHelthStatus, getAppTour, getFlashNews, getRecentlyAdded, getTopModule, removeNotificationToken,
  setAppLang, setAppPlatform, setNotificationPop, setOldAppTourID, storeApptime, storeModuleUsage, storeUserActivity, StoreUserDeviceToken,
} from '@tb-frontend/shared/Store/action/appActions';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import {
  clearChatFlow,
} from '@tb-frontend/shared/Store/action/chatActions';
import { getUserData } from '@tb-frontend/shared/Store/action/usersActions';
import {
  getDataFromAsyncStorage,
  removeItemFromAsyncStorage,
  storeDataToAsyncStorage,
} from '@tb-frontend/shared/utils/functions';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Appearance, AppState, Linking, Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { iosversionName, versionName } from '../package.json';
import { ScreenStacks } from './AppNavigation';
import { AuthContext } from './components/context';
import { AppLoader } from './components/core/Loaders/Loader';
import AppBanner from './components/core/Modals/AppBanner';
import { FeedBackModal } from './components/core/Modals/FeedBackModal';
import NoInterner from './components/core/Modals/NoInternet';
import { NotificationPopUp } from './components/core/Modals/TaskCanCompletedModal';
import { appTheme } from './config/theme';
import { linking } from './DeepLinking';
import { CustomBottomTab } from './navigations/CustomeBottomTabs';
import ForgotPassword from './screens/Guest/ForgotPassword';
import Signup from './screens/Guest/Signup';
import VerifyMobileNumber from './screens/Guest/VerifyMobileNumber';
import VerifyOtpPassword from './screens/Guest/VerifyOtpPassword';
import Login from './screens/Login';
import OnboardingScreen from './screens/OnboardingScreen';
import { dBInstance } from './SqlStore/Database';
import { themeProps } from './types';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function MainApp(): JSX.Element {
  const { platform } = useSelector(state => state?.app);
  const colorScheme = Appearance.getColorScheme();
  const dispatch = useDispatch();
  useEffect(() => {
    const applang = async () => {
      await getDataFromAsyncStorage('appLang').then(appLang => {
        if (appLang && appLang != '') {
          dispatch(setAppLang(appLang));

        } else {

        }
      });
    };
    applang();
    dispatch(setAppPlatform(Platform.OS == 'android' ? 'mobile-app' : 'iPhone-app'));
  }, []);
  if (platform == null) {
    return null;
  }
  return (
    <SafeAreaView style={[styles?.appRoot, {
      backgroundColor:
        colorScheme === 'dark' ?
          appTheme.darkcolors?.colors.background : appTheme.lightcolors.colors.background,
    }]}>
      <NavigationContainer
        fallback={<Text>Loading...</Text>}
        linking={linking}
        theme={
          colorScheme === 'dark' ? appTheme.darkcolors : appTheme.lightcolors
        }>
        <NoInterner />
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

function AppNavigation(): JSX.Element {
  const { tourLoader, tourSlider, appTime, appStatusloader } = useSelector(state => state?.app);
  const { token } = useSelector(state => state?.auth);
  const [isLoading, setloader] = useState(false);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const colorScheme = Appearance.getColorScheme();
  const handleAppStateBlur = () => {
    const diff = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds());
    if (diff) {
      dBInstance()?.transaction(txn => {
        txn.executeSql(
          'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
          [
            'overall_app_usage',
            'app_usage',
            0,
            diff,
          ],
        );
      }).then(() => {
        dispatch(storeApptime(null));
        uploadModuleUsage();
      }).catch((err) => {
        console.log('handleAppStateBlur ', err);

      });
    } else {
      dispatch(storeApptime(null));
      uploadModuleUsage();
    }
  };
  const uploadModuleUsage = () => {
    var moduleUsage = [];
    dBInstance()?.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM app_time ORDER BY id LIMIT 10',
        [],
        async (txn1, results) => {
          if (results?.rows?.length > 0) {
            for (let index = 0; index < results?.rows?.length; index++) {
              moduleUsage.push(results?.rows?.item(index));
            }
          } else {
            moduleUsage = [];
          }
        },
      );
    }).then(async () => {
      if (moduleUsage.length > 0) {
        dispatch(storeModuleUsage(moduleUsage, (ids) => {
          console.log('ids', ids);

          dBInstance()?.transaction(txn => {
            for (let index = 0; index < ids.length; index++) {
              txn.executeSql('DELETE FROM app_time WHERE id=?', [ids[index]]);
            }
          }).then(async () => {
            setTimeout(() => {
              uploadModuleUsage();
            }, 2000);
          }).catch((error) => {
            console.log('uploadModuleUsage ctach-iner', error);
          });
        }));
      } else {
        setloader(false);
        navigation.dispatch(StackActions.popToTop());
        dispatch(clearChatFlow());
        dispatch(setUserToken(false));
        removeItemFromAsyncStorage('_token');
        removeItemFromAsyncStorage('notification_token');
      }
    }).catch(err => {
      setloader(false);
      console.log('error', err);
    });
  };
  const Context = () => {
    return {
      signIn: (_token: string) => {
        dispatch(setUserToken(_token));
      },
      signOut: async () => {
        setloader(true);
        const uniqueID = await DeviceInfo.getUniqueId();
        await dispatch(storeUserActivity('user_Logout'));
        dispatch(
          removeNotificationToken(
            {
              device_id: uniqueID,
            },
            () => {
              PushNotification.abandonPermissions();
              handleAppStateBlur();

            },
          ),
        );
      },
    };
  };
  const authContext = useMemo(() => Context(), []);
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      if (netInfo.isInternetReachable) {
        dispatch(getFlashNews());
        dispatch(getAppConfig());
        getDataFromAsyncStorage('tourIds').then((ids) => {
          if (ids) {
            dispatch(setOldAppTourID(ids));
            dispatch(getAppTour());
          } else {
            dispatch(getAppTour());
          }
        });
        if (Platform.OS == 'android') {
          dispatch(getAppHelthStatus(versionName));
        } else {
          dispatch(getAppHelthStatus(iosversionName));
        }
      }
      getDataFromAsyncStorage('_token').then(token => {
        if (token && token != '') {
          dispatch(setUserToken(token));
        } else {
          dispatch(setUserToken(false));
        }
      });
    };
    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
    };
  }, [netInfo]);
  return (
    <SafeAreaView style={[styles?.appRoot, {
      backgroundColor:
        colorScheme === 'dark' ?
          appTheme.darkcolors?.colors.background : appTheme.lightcolors.colors.background,
    }]}>
      {isLoading && <AppLoader />}
      <AppBanner />
      {appStatusloader || tourLoader ? <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size={'large'} color={colorScheme === 'dark' ?
          appTheme.darkcolors?.colors.Blue_Theme : appTheme.lightcolors.colors.Blue_Theme} />
      </View> :
        (tourSlider.length > 0 && tourLoader == false) ?
          <OnboardingScreen /> :
          <AuthContext.Provider value={authContext}>
            <FeedBackModal />
            {token ? (
              <AppNavigationUser />
            ) : (
              token === false && <AppNavigationGuest />
            )}
          </AuthContext.Provider>
      }
    </SafeAreaView >
  );
}

//for ios

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Notification Device token ', fcmToken);
  } else {
    console.log('Notification failed token', fcmToken);
  }
  return fcmToken;
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Notification Authorization status:', authStatus);
    return await getFcmToken();
  }
  return '';
};

const AppNavigationUser = () => {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const { colors } = useTheme() as unknown as themeProps;
  const { appTime } = useSelector(state => state?.app);
  const storeDeviceToken = async () => {
    const uniqueID = await DeviceInfo.getUniqueId();
    const callback = (res, payload) => {
      if (res?.code == 200 && payload?.notification_token) {
        storeDataToAsyncStorage(
          'notification_token',
          payload?.notification_token,
        );
      }
    };
    const callbackIOS = (res, payload) => {
      if (res?.code == 200 && payload) {
        storeDataToAsyncStorage('notification_token', payload);
      }
    };
    PushNotification.configure({
      onRegister: function (token) {
        getDataFromAsyncStorage('notification_token').then(
          notification_token => {
            if (Platform.OS === 'ios') {
              requestUserPermission().then(iosFBToken => {
                console.log('got token', iosFBToken);

                if (notification_token == iosFBToken) {
                  console.log('same ios token for notification');
                  return null;
                } else {
                  console.log('sending to server ', {
                    device_id: uniqueID,
                    notification_token: iosFBToken,
                  });

                  dispatch(
                    StoreUserDeviceToken(
                      {
                        device_id: uniqueID,
                        notification_token: iosFBToken,
                      },
                      callbackIOS,
                    ),
                  );
                }
              });
            } else {
              if (notification_token == token.token) {
                return null;
              } else {
                dispatch(
                  StoreUserDeviceToken(
                    {
                      device_id: uniqueID,
                      notification_token: token.token,
                    },
                    callback,
                  ),
                );
              }
            }
          },
        );
      },
      onRegistrationError: function (err) {
        console.error('PushNotification Error', err.message, err);
      },
      onNotification: function (notification) {
        if (notification?.data?.link) {
          console.log('notification?.data', notification, AppState.currentState);

          if (AppState.currentState === 'active' && notification?.foreground == true) {
            Toast.show({
              type: 'success',
              text1: notification?.title,
              text2: notification?.message,
              onPress() {
                Linking.openURL(notification?.data?.link);
              },
            });
          } else {
            Linking.openURL(notification?.data?.link);
          }

        } else {
          dispatch(setNotificationPop(notification));
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: true,
      requestPermissions: true,
    });
  };

  const changeIOSEvent = (nextEvent) => {
    if (nextEvent == 'active') {
      handleAppStateFocus();
    } else {
      handleAppStateBlur();
    }
  };

  const handleAppStateFocus = () => {
    dispatch(storeApptime(moment(new Date())));
    uploadModuleUsage();
  };
  const handleAppStateBlur = () => {
    const diff = parseInt(moment.duration(moment(new Date()).diff(appTime)).asSeconds());
    if (diff) {
      dBInstance()?.transaction(txn => {
        txn.executeSql(
          'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
          [
            'overall_app_usage',
            'app_usage',
            0,
            diff,
          ],
        );
      }).then(() => {
        dispatch(storeApptime(null));
      }).catch((err) => {
        console.log('handleAppStateBlur ', err);

      });
    } else {
      dispatch(storeApptime(null));
    }
  };
  const uploadModuleUsage = () => {
    var moduleUsage = [];
    dBInstance()?.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM app_time ORDER BY id LIMIT 10',
        [],
        async (txn1, results) => {
          if (results?.rows?.length > 0) {
            for (let index = 0; index < results?.rows?.length; index++) {
              moduleUsage.push(results?.rows?.item(index));
            }
          } else {
            moduleUsage = [];
          }
        },
      );
    }).then(async () => {
      if (moduleUsage.length > 0) {
        dispatch(storeModuleUsage(moduleUsage, (ids) => {
          console.log('ids', ids);

          dBInstance()?.transaction(txn => {
            for (let index = 0; index < ids.length; index++) {
              txn.executeSql('DELETE FROM app_time WHERE id=?', [ids[index]]);
            }
          }).then(async () => {
            setTimeout(() => {
              uploadModuleUsage();
            }, 2000);
          }).catch((error) => {
            console.log('uploadModuleUsage ctach-iner', error);
          });
        }));
      }
    }).catch(err => {
      console.log('error', err);
    });
  };
  useEffect(() => {
    if (netInfo.isInternetReachable) {
      dispatch(getUserData());
      dispatch(getAllSimilarApps());
      dispatch(getAppDynamicAlgo());
      dispatch(getTopModule());
      dispatch(getRecentlyAdded());
      storeDeviceToken();
      if (Platform.OS == 'android') {
        dispatch(storeUserActivity('user_App_Version==' + versionName));
      } else {
        dispatch(storeUserActivity('user_App_Version==' + iosversionName));
      }
    }
  }, [netInfo.isInternetReachable]);
  useEffect(() => {
    if (Platform.OS == 'android') {
      const appStateFocus = AppState.addEventListener('focus', handleAppStateFocus);
      return () => {
        appStateFocus.remove();
      };
    } else {
      const appStateFocus = AppState.addEventListener('change', changeIOSEvent);
      return () => {
        appStateFocus.remove();
      };
    }

  });
  useEffect(() => {
    if (Platform.OS == 'android') {
      const appStateBlur = AppState.addEventListener('blur', handleAppStateBlur);
      return () => {
        appStateBlur.remove();
      };
    }
  });
  return (
    <SafeAreaView style={[styles?.appRoot, { backgroundColor: colors.background }]}>
      <NotificationPopUp />
      <Tab.Navigator
        initialRouteName="Home"
        sceneContainerStyle={{
          backgroundColor: colors.background,
        }}
        tabBar={props => (
          <CustomBottomTab
            {...props}
          />
        )}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }} component={ScreenStacks} />

      </Tab.Navigator>
    </SafeAreaView>
  );
};
const AppNavigationGuest = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyMobileNumber"
        component={VerifyMobileNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyOtpPassword"
        component={VerifyOtpPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

let styles = StyleSheet.create({
  appRoot: {
    flex: 1,
  },
});
