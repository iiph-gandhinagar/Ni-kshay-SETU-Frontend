import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import {
  clearLeaderboardDetailes,
} from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileConatainer } from '../../components/core/ProfileConatainer';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import { AchivementsTab } from './AchivementsTab';
import { InformationTab } from './InformationTab';
import { LeaderboardComponent } from './LeaderboardTab';
import { TasksTab } from './TaskTab';
const Tab = createMaterialTopTabNavigator();
export default function Leaderboard(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(state => state?.app?.appTranslations,);
  const userDetails = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    return function clean(params: type) {
      dispatch(clearLeaderboardDetailes());
    };
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <ProfileConatainer style={styles.TopContainer} Name={userDetails[0]?.name} ShowAppPerformance={true} />
      <View
        style={[styles.tabContainer, { backgroundColor: colors.background }]}>
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.tabActive,
            tabBarInactiveTintColor: colors.tabInActive,
            tabBarContentContainerStyle: {},
            tabBarLabelStyle: { ...FontStyle.Nunito12, textTransform: 'none', flex: 1, width: '100%' },
            tabBarIndicatorStyle: { borderColor: colors.tabActive, borderWidth: RFValue(1) },
            tabBarStyle: {
              backgroundColor: colors.background,
              marginHorizontal: RFValue(30),
              overflow: 'hidden',
              borderWidth: 0,
              elevation: 0,
            },
            lazy: true,
          }}>
          <Tab.Screen name="Leaderboard" options={{ title: appTranslations.TAB_NAME_LEADERBOARD }} component={LeaderboardComponent} />
          <Tab.Screen name="Tasks" options={{ title: appTranslations.TAB_NAME_TASKS }} component={TasksTab} />
          <Tab.Screen name="Achievements" options={{ title: appTranslations.TAB_NAME_ACHIEVEMENTS }} component={AchivementsTab} />
          <Tab.Screen name="Information" options={{ title: appTranslations.TAB_NAME_INFORMATION }} component={InformationTab} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: RFValue(40),
    marginBottom: RFValue(10),
  },
  TopContainer: {
    flex: 0.5,
  },
  Container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    elevation: RFValue(1),
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: 'hidden',
  },
});
