import { StackActions, useNavigation, useTheme } from '@react-navigation/native';

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { CmsData } from '../../components/core/Algo/cmsData';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { appConfigTypes, themeProps } from '../../types';

export default function NutritionOutcomeDetails(props): JSX.Element {
  const navigation = useNavigation();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const appMasterCms = useSelector(state => state?.app?.appMasterCms);
  const htmlContent = appMasterCms?.filter(
    e => e.title === props.route.params?.title,
  )?.[0]?.description;
  const ResultObj = props.route.params?.ResultObj;
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.NUTRITION_OUTCOME_DETAILS}
      />
      <ScrollView contentContainerStyle={{ paddingVertical: RFValue(25), marginHorizontal: RFValue(33) }} showsVerticalScrollIndicator={false} >
        <CmsData
          source={htmlContent}
        />
        <View
          style={styles.ButtonContainer}>
          <Button
            //   disabled={btndisable}
            onPress={() => {
              navigation.dispatch(StackActions.popToTop());
              navigation.navigate('HomeScreen');
            }}
            buttonText={appTranslations.HEADER_HOME}
            style={styles.Button}
          />
          <Button
            //   disabled={btndisable}
            onPress={() => {
              navigation.navigate('AlgorithmDetails', {
                name: 'Diagnosis',
                type: 'Diagnosis Algorithm',
                id: ResultObj?.tbId,
              });
            }}
            buttonText={appTranslations.BTN_ALGORITHM_LINK}
            style={styles.Button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ButtonContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(16),
  },
  Button: {
    marginVertical: RFValue(10),
  },
});
