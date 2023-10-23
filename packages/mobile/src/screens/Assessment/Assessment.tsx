import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ProfileConatainer } from '../../components/core/ProfileConatainer';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import { CurrentAssessmentTab } from './CurrentAssessmentTab';
import { FutureAssessmentTab } from './FutureAssessmentTab';
import { PastAssessmentTab } from './PastAssessmentTab';
import { PerformanceTab } from './PerformanceTab';

const Tab = createMaterialTopTabNavigator();
export default function Assessment(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const userDetails = useSelector(state => state?.user?.userData);
  return (
    <SafeAreaView style={styles.Container} testID="assessment-screen">
      <ProfileConatainer style={styles.TopContainer} Name={userDetails[0]?.name} ShowAppPerformance={false} />
      <View testID="Navigator_Conatiner"
        style={[styles.tabContainer, { backgroundColor: colors.background }]}>
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.tabActive,
            tabBarInactiveTintColor: colors.tabInActive,
            tabBarContentContainerStyle: {},
            tabBarLabelStyle: { ...FontStyle.Nunito11, textTransform: 'none', flex: 1, width: '100%' },
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
          <Tab.Screen name="Performance" options={{ title: appTranslations.PERFORMANCE }} component={PerformanceTab} />
          <Tab.Screen name="CurrentAssessment" options={{ title: appTranslations.CURRENT_ASSMNT }} component={CurrentAssessmentTab} />
          <Tab.Screen name="PastAssessment" options={{ title: appTranslations.PAST_ASSMNT }} component={PastAssessmentTab} />
          <Tab.Screen name="FutureAssessment" options={{ title: appTranslations.FUTURE_ASSMNT }} component={FutureAssessmentTab} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
