import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AssessmentListCard } from '../../components/core/CurrentAssessmentComponent';
import { appConfigTypes, themeProps } from '../../types';
import {
  getUserAssessment,
  ClearPastAssessment,
} from '@tb-frontend/shared/Store/action/assessmentAction';
import { NoResultFound } from '../../components/core/NoResultFound';
import { getImage } from '../../utils/functions';
export const PastAssessmentTab = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userPastAssessments, loader } = useSelector(
    state => state?.assessment,
  );
  useEffect(() => {
    const Focus = navigation.addListener('focus', () => {
      dispatch(getUserAssessment());
    });
    return Focus;
  });
  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      dispatch(ClearPastAssessment());
    });
    return blur;
  });
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);

  return (
    <SafeAreaView style={[style.container, { backgroundColor: colors.background }]} >
      <FlatList
        data={userPastAssessments}
        ListEmptyComponent={
          loader ? null :
            <NoResultFound
              source={getImage(undefined, 'Ass', undefined)}
              header={appTranslations?.NO_DATA_PAST_ASSESS}
              viewStyle={{ marginTop: RFValue(50) }} />
        }
        keyExtractor={(item) => item?.assessment_id}
        renderItem={({ item }) => {
          return (
            <AssessmentListCard
              BtnName={appTranslations.VIEW}
              key={item?.assessment_id}
              Quetions={item?.assessment_questions_count}
              min={item?.assessment_with_trashed?.time_to_complete}
              headerTitle={item?.assessment_with_trashed?.assessment_title}
              onPress={() => {
                navigation.navigate('PastAssessmentView', {
                  id: item?.assessment_id,
                });
              }} />
          );
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
