import { getFocusedRouteNameFromRoute, useTheme } from '@react-navigation/native';
import Lottie, { AnimationObject } from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { TourGuideZone } from 'rn-tourguide';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
interface Props { }
interface BottomTabBtnProps {
  source?: string | AnimationObject | { uri: string };
  onPress?: () => void;
  color?: string; title?: string;
  style: StyleProp<ViewStyle>;
}
const BottomTabBtn: React.FC<BottomTabBtnProps> = ({ source, onPress = () => null, color, title, style = undefined }) => {
  const animationRef = useRef<Lottie>(null);
  return (
    <Pressable
      onPress={() => {
        onPress();
        animationRef.current?.play(0, 120);
      }}
      style={[styles.tabView, style]}>
      <Lottie
        autoPlay
        ref={animationRef}
        source={source}
        style={{
          aspectRatio: 1 / 1,
          marginVertical: -RFValue(5),
          height: RFValue(35),
        }}
        loop={false}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          FontStyle.Nunito12,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
    </Pressable>

  );

};
const showTabBarComponents = ['MasterSearch', 'AssessmentQuestions', 'AlgorithmDetails', 'CmsScreen', 'AlgorithmScreen', 'VideoView'];

export const CustomBottomTab: React.PropsWithChildren<Props> | React.FC =
  props => {
    const { colors } = useTheme() as unknown as themeProps;
    const navigation = props.navigation;
    const [visible, setVisible] = useState(true);
    let focusedName = props?.state.routes[props?.state.index]?.name;
    const ScreenName = getFocusedRouteNameFromRoute(
      props?.state.routes[props?.state.index],
    );
    const show = showTabBarComponents.includes(ScreenName);
    const appTranslations: appConfigTypes = useSelector(
      state => state?.app?.appTranslations,
    );
    useEffect(() => {
      let keyboardEventListeners;
      if (Platform.OS === 'android') {
        keyboardEventListeners = [
          Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
          Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
        ];
      }
      return () => {
        if (Platform.OS === 'android') {
          keyboardEventListeners &&
            keyboardEventListeners.forEach(eventListener =>
              eventListener.remove(),
            );
        }
      };
    }, []);
    return show || !visible ? null : (
      <SafeAreaView style={[styles.TabContainer, {
        backgroundColor: colors.background,
        borderTopColor: colors.bottomBorder,
      }]}>
        <BottomTabBtn
          color={ScreenName === 'HomeScreen'
            ? colors.Blue_2
            : colors.ORANGE}
          onPress={() => {
            navigation.navigate('HomeScreen',);
          }}
          source={require('../assets/Animations/Home.json')}
          title={appTranslations.TAB_HOME}
        />
        <View style={{ flex: 1, minWidth: RFValue(60), justifyContent: 'center' }}>
          <TourGuideZone
            zone={3}
            tourKey="first-tour"
            style={{ flex: 1, marginBottom: -RFValue(30) }}
            text={'Evaluate your knowledge on TB'}
            shape="rectangle">
            <BottomTabBtn
              style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: RFValue(30) }}
              color={ScreenName === 'Assessment'
                ? colors.Blue_2
                : colors.ORANGE}
              onPress={() => {
                navigation.navigate('Assessment');
              }}

              source={require('../assets/Animations/Assess.json')}
              title={appTranslations.TAB_ASSESS}
            />
          </TourGuideZone>
        </View>
        <View style={{ flex: 1, minWidth: RFValue(60), justifyContent: 'center' }}>
          <TourGuideZone
            tourKey="first-tour"
            zone={4}
            style={{ flex: 1, marginBottom: -RFValue(30) }}
            text={'Energize yourself to attain expertise'}
            shape="rectangle">
            <BottomTabBtn
              style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: RFValue(30) }}
              color={ScreenName === 'Leaderboards'
                ? colors.Blue_2
                : colors.ORANGE}
              onPress={() => {
                navigation.navigate('Leaderboards', { screen: 'Leaderboard' });
              }}

              source={require('../assets/Animations/Leaderboard.json')}
              title={appTranslations.TAB_NAME_LEADERBOARD}
            />
          </TourGuideZone>
        </View>
        <View style={{ flex: 1, minWidth: RFValue(60), justifyContent: 'center' }}>
          <TourGuideZone
            tourKey="first-tour"
            zone={5}
            style={{ flex: 1, marginBottom: -RFValue(30) }}
            text={'Edit your Profile Details'}
            shape="rectangle">
            <BottomTabBtn
              style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: RFValue(30) }}
              color={ScreenName === 'Account'
                ? colors.Blue_2
                : colors.ORANGE}
              onPress={() => {
                navigation.navigate('Account');
              }}

              source={require('../assets/Animations/Account.json')}
              title={appTranslations.TAB_ACCOUNT}
            />
          </TourGuideZone>
        </View>
      </SafeAreaView >
    );
  };

let styles = StyleSheet.create({
  TabContainer: {
    borderTopWidth: 0.5,
    height: RFValue(55),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabView: { alignItems: 'center', flex: 1, minWidth: RFValue(60) ,
  marginTop:Platform.OS == 'ios' ? RFValue(10) : RFValue(0)},
  label: { marginTop: -RFValue(5) },
});
