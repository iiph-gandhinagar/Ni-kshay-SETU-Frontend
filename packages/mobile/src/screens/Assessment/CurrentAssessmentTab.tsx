import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, useTheme } from '@react-navigation/native';
import {
  clearCurrentAssessments, getAllAssessment,
  getAssessmentWithQuestions,
  getUserAssessmentDetails,
} from '@tb-frontend/shared/Store/action/assessmentAction';
import { getAchivement } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AssessmentListCard } from '../../components/core/CurrentAssessmentComponent';
import { RulesOfAssessmentsModal } from '../../components/core/Modals/CurrentAssePopup';
import { NoResultFound } from '../../components/core/NoResultFound';
// import { UpdateVersionModal } from '../../components/core/Modals/CurrentAssePopup';
import { appConfigTypes, themeProps } from '../../types';
import { getImage } from '../../utils/functions';
export const CurrentAssessmentTab = () => {
  const netInfo = useNetInfo();
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  const { allAssessment, loader } = useSelector(state => state?.assessment);
  const Assessment = useSelector(
    state => state?.assessment?.assessmentQuestions,
  );
  const [isRulesOfAssessmentsModalVisible, setRulesOfAssessmentsModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const Focus = navigation.addListener('focus', () => {
      dispatch(getAchivement());
      dispatch(getAllAssessment());
    });
    return Focus;
  });
  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setRulesOfAssessmentsModalVisible(false);
      dispatch(clearCurrentAssessments());
    });
    return blur;
  });

  const CallBack = response => {
    setRulesOfAssessmentsModalVisible(false);
    if (response.code == 200) {
      if (response?.data?.is_assessment_expired === 0) {
        navigation.navigate('AssessmentQuestions', {
          questionList: Assessment[0],
          answerList: response?.data?.answers,
          time: response?.data?.remaining_time,
        });
      } else {
        Alert.alert('⌛ Time Up!', 'Your Assessment Time is over!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('PastAssessmentView', {
                id: Assessment[0]?.id,
              });
            },
          },
        ]);
      }
    } else {
      Alert.alert('Error!', response?.response?.data?.data);
    }
  };

  return (
    <SafeAreaView style={[style.container, { backgroundColor: colors.background }]} >
      <FlatList
        data={allAssessment}
        ListEmptyComponent={
          loader ? null :
            <NoResultFound
              source={getImage(undefined, 'Ass', undefined)}
              header={appTranslations?.NO_DATA_CURRENT_ASSESS}
              viewStyle={{ marginTop: RFValue(50) }} />
        }
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => {
          return (
            <AssessmentListCard
              IsBtnDisable={item?.user_assessment_result?.[0]?.is_calculated === 1
                ? true
                : false}
              key={item?.id}
              Quetions={item?.assessment_questions_count}
              min={item?.time_to_complete}
              headerTitle={item?.assessment_title}
              onPress={() => {
                if (netInfo.isInternetReachable) {
                  setRulesOfAssessmentsModalVisible(true);
                  dispatch(getAssessmentWithQuestions(item?.id));
                  // navigation.navigate('AssessmentOverview', {id: data?.id});
                } else {
                  Alert.alert(
                    'No Internet!!',
                    'Please Connect to Internet..',
                    [
                      {
                        text: 'OK',
                        onPress: () => null,
                      },
                    ],
                  );
                }
              }} />
          );
        }}
      />
      <RulesOfAssessmentsModal
        isModalVisible={isRulesOfAssessmentsModalVisible}
        closeModal={() => setRulesOfAssessmentsModalVisible(false)}
        onPress={() => {
          if (Assessment[0]?.assessment_questions?.length > 0) {
            dispatch(
              getUserAssessmentDetails(
                {
                  assessment_id: Assessment?.[0]?.id,
                },
                CallBack,
              ),
            );
          } else {
            setRulesOfAssessmentsModalVisible(false);
            Alert.alert('Error!', 'No Questions Found');
          }
        }}
      />

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1, padding: RFValue(20), paddingBottom: 0,
  },
});
