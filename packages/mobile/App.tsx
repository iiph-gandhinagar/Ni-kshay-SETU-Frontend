import configureStore from '@tb-frontend/shared/Store/index';
import React, { useEffect, useState } from 'react';
import { Appearance, LogBox, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { appTheme } from './src/config/theme';
import MainApp from './src/MainApp';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/ToastMassagesTheme';
import { DowngradeError } from './src/SqlStore/SQLiteClient';
import { initialize } from './src/SqlStore/Database';
import {
  TourGuideProvider,
} from 'rn-tourguide';
import { RFValue } from 'react-native-responsive-fontsize';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { TooltipComponent } from './src/components/TooltipComponent';
LogBox.ignoreLogs([
  "Accessing the 'state' property of the 'route' object is not supported.",
  'Warning: componentWillMount has been renamed, and is not recommended for use.',
  'Warning: Failed prop type: Prop containerStyle passed to Pagination. Has invalid keys paddingVertical',
  'Warning: Failed prop type: Prop dotStyle passed to Pagination. Has invalid keys marginHorizontal',
]);
LogBox.ignoreAllLogs(true);
const App = () => {
  const store = configureStore;
  const colorScheme = Appearance.getColorScheme();
  const [themeState, setThemeState] = useState('defaultMode');
  const dbInitialize = () => {
    initialize()
      .then(() => {
      })
      .catch(err => {
        console.log('DB ERR', err);
        // Alert.alert('Fatal Error', 'App DB not initialized!');
        if (err instanceof DowngradeError) {
          console.log('Downgrade error');
        } else {
          console.log('Unexpected error');
        }
      });
  };
  useEffect(() => {
    dbInitialize();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  useEffect(() => {

  }, [themeState]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Orientation.lockToPortrait();

    setTimeout(() => {
      SplashScreen.hide();
      setLoading(true);
    }, 4000);
  }, []);
  return (
    <TourGuideProvider {...{
      preventOutsideInteraction: true,
      // tooltipComponent: TooltipComponent,
      backdropColor: colorScheme === 'dark' ? 'rgba(112, 112, 112,  0.75)' : 'rgba(112, 112, 112, 0.75)',
    }}>
      <Provider store={store}>
        <SafeAreaView
          style={{
            flex: 0, backgroundColor:
              colorScheme === 'dark' ?
                appTheme.darkcolors?.colors.background : appTheme.lightcolors.colors.background,
          }}
        />
        <SafeAreaView style={{
          flex: 1, backgroundColor:
            colorScheme === 'dark' ?
              appTheme.darkcolors?.colors.background : appTheme.lightcolors.colors.background,
        }}>
          <StatusBar
            backgroundColor={colorScheme === 'dark' ?
              appTheme.darkcolors?.colors.background : appTheme.lightcolors.colors.background}
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          />
          <MainApp />
          <Toast config={toastConfig} />
        </SafeAreaView>
      </Provider>
    </TourGuideProvider>

  );
};



export default App;
