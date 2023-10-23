import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { LevelInfoCard } from '../../components/LevelInfoCard';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';

export const InformationTab = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const { leaderboardInfo } = useSelector(state => state?.app);
  const appTranslations: appConfigTypes = useSelector(state => state?.app?.appTranslations,);
  return (
    <ScrollView style={styles.scrollStyle}>
      <Text
        style={[
          FontStyle.Nunito15,styles.Txt,
          { color: colors.Blue_2 },
        ]}>
        {appTranslations.LEADERBOARD_INFOTAB_HEADER}
      </Text>
      {leaderboardInfo?.map((item, i) => {
        return (
          <LevelInfoCard
            key={'leaderboardInfo - ' + i}
            Level={item?.id}
            TitleLvl={item?.level}
            description={item?.content}
            BronzeImg={
              item?.id == 1
                ? require('../../assets/Beg/active/BB.png')
                : item?.id == 2
                  ? require('../../assets/Beg/active/ABB.png')
                  : item?.id == 3
                    ? require('../../assets/Beg/active/CB.png')
                    : item?.id == 4
                      ? require('../../assets/Beg/active/PB.png')
                      : require('../../assets/Beg/active/EB.png')
            }
            GoldImg={
              item?.id == 1
                ? require('../../assets/Beg/active/BG.png')
                : item?.id == 2
                  ? require('../../assets/Beg/active/ABG.png')
                  : item?.id == 3
                    ? require('../../assets/Beg/active/CG.png')
                    : item?.id == 4
                      ? require('../../assets/Beg/active/PG.png')
                      : require('../../assets/Beg/active/EG.png')
            }
            SilverImg={
              item?.id == 1
                ? require('../../assets/Beg/active/BS.png')
                : item?.id == 2
                  ? require('../../assets/Beg/active/ABS.png')
                  : item?.id == 3
                    ? require('../../assets/Beg/active/CS.png')
                    : item?.id == 4
                      ? require('../../assets/Beg/active/PS.png')
                      : require('../../assets/Beg/active/ES.png')
            }
            TopColor={
              item?.id == 1
                ? '#362F64'
                : item?.id == 2
                  ? '#2F6434'
                  : item?.id == 3
                    ? '#28315D'
                    : item?.id == 4
                      ? '#612C3B'
                      : '#2F6434'
            }
            colored={
              item?.id == 1
                ? ['#80689D', '#80689D', '#1F1E54']
                : item?.id == 2
                  ? ['#6F9D68', '#6F9D68', '#1E543A']
                  : item?.id == 3
                    ? ['#688A9D', '#688A9D', '#1E2454']
                    : item?.id == 4
                      ? ['#9D6868', '#9D6868', '#541E32']
                      : ['#689D97', '#689D97', '#1E3454']
            }
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollStyle:{
    flex: 1,
    paddingHorizontal: RFValue(5),
  },
  Txt:{
    padding: RFValue(20),
  },
});
