import { useNavigation, useTheme } from '@react-navigation/native';
import {
  ClearFutureAssessment, getFutureAssessment, storeAssessmentEnrollnment,
} from '@tb-frontend/shared/Store/action/assessmentAction';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AssessmentListCard } from '../../components/core/CurrentAssessmentComponent';
import { NoResultFound } from '../../components/core/NoResultFound';
import { appConfigTypes, themeProps } from '../../types';
import { getImage } from '../../utils/functions';
export const FutureAssessmentTab = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { futureAssessments, loader } = useSelector(state => state?.assessment);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    const Focus = navigation.addListener('focus', () => {
      dispatch(getFutureAssessment());
    });
    return Focus;
  });
  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      dispatch(ClearFutureAssessment());
    });
    return blur;
  });
  return (
    <SafeAreaView style={[style.container, { backgroundColor: colors.background }]} >
      <FlatList
        data={futureAssessments}
        keyExtractor={(item) => item?.assessment_id}
        ListEmptyComponent={
          loader ? null :
            <NoResultFound
              source={getImage(undefined, 'Ass', undefined)}
              header={appTranslations?.NO_DATA_FUTURE_ASSESS}
              viewStyle={{ marginTop: RFValue(50) }} />
        }
        renderItem={({ item }) => {
          return (
            <AssessmentListCard
              Quetions={item?.assessment_questions_count}
              min={item?.time_to_complete}
              headerTitle={item?.assessment_title}
              FutureAssessment={true}
              ReleasesDateTime={'Releases  ' + item?.from_date}
              BtnName={item?.response === 'yes' ? 'Enrolled' : 'Enroll'}
              IsBtnDisable={item?.response === 'yes'}
              onPress={() => dispatch(storeAssessmentEnrollnment({
                assessment_id: item?.id,
                response: 'yes',
              }, () => { dispatch(getFutureAssessment()); }))}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(20),
    paddingBottom: 0,
  },
});
