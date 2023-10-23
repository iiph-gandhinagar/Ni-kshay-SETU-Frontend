import { useNavigation, useTheme } from '@react-navigation/native';
import { getAssessmentPerformace } from '@tb-frontend/shared/Store/action/assessmentAction';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { CertificateButton } from '../../components/core/Button';
import { CompletionCom, completionCom } from '../../components/core/completionCom';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';

export const PerformanceTab = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigaion = useNavigation();
  const dispatch = useDispatch();
  const { assessmentPerformance } = useSelector(
    state => state?.assessment);

  useEffect(() => {
    const Focus = navigaion.addListener('focus', () => {
      dispatch(getAssessmentPerformace());
    });
    return Focus;
  });
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.Conatiner}>
        <View style={[styles.Card, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.HeaderContainer, {
            backgroundColor: colors.cardBackground2,
          }]}>
            <Text
              style={[FontStyle.RalewayText12, styles.HeaderText, { color: colors.white }]}>
              {appTranslations.COMPLETION_RATE}</Text>
          </View>
          <View style={styles.ProgressConatiner}>
            <CircularProgress
              value={((assessmentPerformance.complete_assessment * 100) / assessmentPerformance.total_assessment_count) || 0}
              progressValueStyle={{ ...FontStyle.Nunito18Title, fontSize: RFValue(25) }}
              radius={RFValue(60)}
              showProgressValue={false}
              title={
                <CompletionCom
                  Total={assessmentPerformance.total_assessment_count || 0}
                  Complete={assessmentPerformance.complete_assessment || 0} />
              }
              subtitle={appTranslations.ASSESSMENT}
              titleColor={colors.Blue_Theme}
              titleStyle={{ justifyContent: 'center' }}
              subtitleStyle={{ ...FontStyle.Nunito11, color: colors.Blue_Theme }}
              activeStrokeColor={'#FFD12D'}
              inActiveStrokeColor={colors.CircularProgressInactive}
              progressValueColor={colors.Blue_Theme}
              activeStrokeWidth={RFValue(13)}
              inActiveStrokeWidth={RFValue(13)}
            />
          </View>
        </View>

        <View style={[styles.Card, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.HeaderContainer, {
            backgroundColor: colors.cardBackground2,
          }]}>
            <Text
              style={[FontStyle.RalewayText12, styles.HeaderText, { color: colors.white }]}>
              {appTranslations.ACCURACY}
            </Text>
          </View>
          <View style={styles.ProgressConatiner}>
            <CircularProgress value={assessmentPerformance.accuracy || 0}
              valueSuffix={'%'}
              progressValueStyle={{ ...FontStyle.Nunito18Title, fontSize: RFValue(25) }}
              radius={RFValue(60)}
              activeStrokeColor={colors.Card_2}
              inActiveStrokeColor={colors.CircularProgressInactive}
              progressValueColor={colors.Blue_Theme}
              activeStrokeWidth={RFValue(13)}
              inActiveStrokeWidth={RFValue(13)}
            />
          </View>
        </View>
      </View>
      <CertificateButton
        title={appTranslations.ASSESSMENT_COMPLETION_CERTI}
        style={styles.Btn}
        onPress={() => navigaion.navigate('Certificates')} />

    </ScrollView>
  );
};



let styles = StyleSheet.create({
  Card: {
    flex: 1,
    marginTop: RFValue(25),
    borderRadius: RFValue(10),
    elevation: RFValue(2),
    marginHorizontal: RFValue(8),
    maxWidth: RFValue(160),
  },
  CircularProgress: {
    alignItems: 'center',
  },
  HeaderText: {
    padding: RFValue(3),
  },
  ProgressConatiner: {
    alignItems: 'center',
    margin: RFValue(25),
  },
  Conatiner: {
    flexDirection: 'row',
    justifyContent: 'center',

  }, HeaderContainer: {
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    alignItems: 'center',
  }, Btn: {
    alignItems: 'center',
    marginHorizontal: RFValue(20),
  },

});
