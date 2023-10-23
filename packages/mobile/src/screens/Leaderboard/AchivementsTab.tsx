import { useNavigation, useTheme } from '@react-navigation/native';
import { getAchivement } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AchivementAnimation } from '../../components/core/AchivementAnimation';
import { CertificateButton } from '../../components/core/Button';
import { CompletionRateCard } from '../../components/core/Cards/CompletionRateCard';
import { appConfigTypes, themeProps } from '../../types';

export const AchivementsTab = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const { achivement } = useSelector(state => state?.leaderBoard);
  const navigaion = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const Focus = navigaion.addListener('focus', () => {
      dispatch(getAchivement());
    });
    return Focus;
  });
  const appTranslations: appConfigTypes = useSelector(state => state?.app?.appTranslations,);
  return (
    <ScrollView style={{ flex: 1 }}>
      <AchivementAnimation title={achivement?.level || ''} />
      <View style={styles.CompletionRateCardContainer}>
        <CompletionRateCard
          title={appTranslations.BRONZE_MEDAL}
          circularProgress={
            <>
              <CircularProgress
                showProgressValue={false}
                activeStrokeColor={'#FFAB2D'}
                inActiveStrokeColor={colors.Grey_2}
                value={achivement?.achive_bronze_medal * 100 /
                  achivement?.total_bronze_medal || 0}
                radius={RFValue(40)}
              />
              <Image
                source={require('../../assets/Star1.png')}
                style={styles.PhotoProfile} />
            </>
          }
          completed={achivement?.achive_bronze_medal}
          pending={
            achivement?.total_bronze_medal - achivement?.achive_bronze_medal
          }
        />
        <CompletionRateCard
          title={appTranslations.SILVER_MEDAL}
          circularProgress={
            <><CircularProgress
              showProgressValue={false}
              activeStrokeColor={'#8A8A8A'}
              inActiveStrokeColor={colors.Grey_2}
              value={achivement?.achive_silver_medal * 100 /
                achivement?.total_silver_medal || 0}
              radius={RFValue(40)}
            />
              <Image
                source={require('../../assets/Star2.png')}
                style={styles.PhotoProfile} />
            </>
          }
          completed={achivement?.achive_silver_medal || 0}
          pending={
            achivement?.total_silver_medal - achivement?.achive_silver_medal ||
            0
          }
        />
        <CompletionRateCard
          title={appTranslations.GOLD_MEDAL}
          circularProgress={
            <><CircularProgress
              showProgressValue={false}
              activeStrokeColor={'#EFD701'}
              inActiveStrokeColor={colors.Grey_2}
              value={achivement?.achive_gold_medal * 100 / achivement?.total_gold_medal || 0}
              radius={RFValue(40)}
            />
              <Image
                source={require('../../assets/Star3.png')}
                style={styles.PhotoProfile} />
            </>
          }
          completed={achivement?.achive_gold_medal || 0}
          pending={
            achivement?.total_gold_medal - achivement?.achive_gold_medal || 0
          }
        />
      </View>
      <CertificateButton
        title={appTranslations.ASSESSMENT_COMPLETION_CERTI}
        style={styles.Btn}
        onPress={() => navigaion.navigate('Certificates')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Btn: {
    alignItems: 'center',
    marginHorizontal: RFValue(20),
  },
  PhotoProfile: {
    width: RFValue(43),
    height: RFValue(43),
    alignSelf: 'center',
    position: 'absolute',
    marginTop: RFValue(17),
  },
  CompletionRateCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  BottomConatiner: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: RFValue(15),
    borderRadius: RFValue(5),
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(30),
  },
  Img: {
    height: RFValue(40),
    width: RFValue(40),
  },
  CompletionAssText: {
    marginHorizontal: RFValue(10),
  },
});
