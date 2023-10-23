import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import { getUserAssessmentResult } from '@tb-frontend/shared/Store/action/assessmentAction';
import moment from 'moment';
import React, { useEffect } from 'react';
import {
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Platform, ScrollView,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AssessmentList } from '../../components/AssessmentList';
import { CertificateButton } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { ResultConatiner } from '../../components/ResultConatiner';
import { appConfigTypes, themeProps } from '../../types';
const Dimension = Dimensions.get('window');
export default function PastAssessmentView(props): JSX.Element {
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const result = useSelector(
    state => state?.assessment?.userAssessmentResult[0],
  );
  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(StackActions.popToTop());
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  useEffect(() => {
    const Focus = navigation.addListener('focus', () => {
      dispatch(getUserAssessmentResult(props?.route?.params?.id));
    });
    return Focus;
  });
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        noBackArrow={navigation.getState()?.routes?.find(e => e.name == 'AssessmentQuestions') ? true : false}
        headerTitle={result?.assessment_title}
      />
      <ScrollView
        contentContainerStyle={{ backgroundColor: colors.primary }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <SafeAreaView style={styles.Container}> */}

        <View style={[styles.FormContainer, { backgroundColor: colors.background }]}>

          <AssessmentList titleFirst={appTranslations.ASSESSMENT_NAME + ':'} title={result?.assessment_title} style={styles.Items} />
          <AssessmentList titleFirst={appTranslations.NO_OF_QUES + ':'} title={result?.assessment_questions_count} style={styles.Items} />
          <AssessmentList titleFirst={appTranslations.TIME_TO_COMPLETE + ':'} title={result?.time_to_complete} style={styles.Items} />
          <AssessmentList titleFirst={appTranslations.COMPLETED_ON + ':'} title={moment(result?.user_assessment_result[0]?.created_at).format(
            'll',
          )} style={styles.Items} />
          <View style={{ paddingHorizontal: RFValue(25) }}>
            <ResultConatiner Marks={`${result?.user_assessment_result[0]?.obtained_marks}/${result?.user_assessment_result[0]?.total_marks}`}
              attempted={result?.user_assessment_result[0]?.attempted}
              skipped={result?.user_assessment_result[0]?.skipped}
              right_answers={result?.user_assessment_result[0]?.right_answers}
              wrong_answers={result?.user_assessment_result[0]?.wrong_answers} />
          </View>

          {/*
          in Certificate add navigation like this*/}
          <CertificateButton title={appTranslations.VIEW_CERTIFICATE} style={styles.Btn} onPress={() => navigation.navigate('CertificateView', {
            title: result?.assessment_title,
            id: result?.id,
          })} />

          {/* <Button buttonText={'Certificate'} style={styles.Btn} onPress={() => navigation.navigate('CertificateView', {
            title: result?.assessment_title,
            id: result?.id,
          })} /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    maxHeight: Dimension.height,
  },
  FormContainer: {
    paddingVertical: RFValue(32),
    paddingHorizontal: RFValue(24),
    // alignItems:'center',
  },
  Btn: { alignItems: 'center', marginVertical: RFValue(20) },
  Items: { marginBottom: RFValue(10) },
});
