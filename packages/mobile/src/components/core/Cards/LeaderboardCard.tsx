import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  ImgUrl: ImageSourcePropType | undefined;
  name: string;
  subTitle: string;
}
export const LeaderboardCard: React.FC<Props> = ({
  name = '',
  ImgUrl = undefined,
  subTitle = '',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.Card, { backgroundColor: colors.white }]}>
      <Image
        source={ImgUrl}
        width={RFValue(70)}
        style={styles.Img}
      />
      <View style={styles.Details}>
        <Text
          style={[
            FontStyle.Nunito18Title,
            styles.Name,
            { color: colors.Blue_2 },
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.Subtitle1, FontStyle.Nunito11,
            { color: colors.Grey_4 },
          ]}>
          {subTitle}
        </Text>
        <View style={styles.ProgressBarContainer}>
          <Progress.Bar
            progress={0.3}
            unfilledColor={colors.Grey_1}
            color={colors.Blue_2}
            borderWidth={0}
            height={RFValue(3.6)}
            width={null}
            style={{ flex: 1, marginRight: RFValue(10) }}
          />
          <Text
            style={[FontStyle.Nunito12, { color: colors.Grey_4 }]}>
            25%
          </Text>
        </View>
      </View>
    </View>
  );
};
interface LeaderboardListCardProps {
  ImgUrl: ImageSourcePropType | undefined;
  name: string;
  subTitle: string;
  rank: string;
  percentage: number;
  isUser: boolean;
}
export const LeaderboardListCard: React.FC<LeaderboardListCardProps> = ({
  name = '',
  ImgUrl = undefined,
  subTitle = '',
  rank = '',
  percentage = 0,
  isUser = false,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.Card, { backgroundColor: isUser ? colors.hilight : colors.cardBackground }]}>
      {ImgUrl ?
        <Image
          source={ImgUrl}
          style={styles.Img}
        />
        :
        <Icon
          name="account-circle"
          size={RFValue(70)}
          color={colors.Blue_2}
        />
      }
      <View style={styles.Details}>
        <Text
          style={[
            FontStyle.Nunito15, styles.NameText,
            { color: colors.Blue_2 },
          ]}>
          {name}
        </Text>
        <Text
          style={[
            styles.subTitle, FontStyle.NunitoDate,
            { color: colors.Blue_2 },
          ]}>
          {subTitle}
        </Text>
        <Text
          style={[
            styles.Subtitle1, FontStyle.Nunito11,
            { color: colors.Grey_4 },
          ]}>
          App performance rank: {rank}
        </Text>
        <View style={styles.ProgressBarContainer}>
          <Progress.Bar
            progress={percentage / 100}
            unfilledColor={colors.Grey_1}
            color={colors.ORANGE}
            borderWidth={0}
            height={RFValue(3.6)}
            width={null}
            style={styles.ProgressBar}
          />
          <Text
            style={[FontStyle.Nunito11, { color: colors.Grey_4 }]}>
            {percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  Card: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(12),
    marginHorizontal: RFValue(5),
    marginTop: RFValue(20),
    alignItems: 'center',
    elevation: 7,
    overflow: 'hidden',
    borderRadius: RFValue(5),
  },
  Details: {
    flex: 1,
    paddingLeft: RFValue(10),
  },
  Name: {
    marginBottom: RFValue(4),
  },
  Subtitle1: {
    marginBottom: RFValue(2),

  },
  ProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(6),
  },
  ProgressBar: {
    flex: 1,
    marginRight: RFValue(10),
  },
  subTitle: {
    marginBottom: RFValue(5),
  },
  Img: {
    height: RFValue(60),
    width: RFValue(60),
    borderRadius: RFValue(100),
  },
  NameText: {
    marginBottom: RFValue(2),
  },
});
