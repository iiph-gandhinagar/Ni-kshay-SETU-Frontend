import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageSourcePropType, Platform, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';

interface FeatureContainerProps {
  DisableImg: ImageSourcePropType | undefined;
  medalImg: ImageSourcePropType | undefined;
  isDisable: boolean;
  isSilver: boolean;
  isBronze: boolean;
  badgeName: string;
  TAO: String | number;
  AO: String | number;
  TRMU: String | number;
  RMU: String | number;
  TCBU: String | number;
  CBU: String | number;
  TSMV: String | number;
  SMV: String | number;
  TMS: String | number;
  MS: String | number;
}
export const RankContainer: React.FC<FeatureContainerProps> = ({
  medalImg = undefined,
  DisableImg = undefined,
  isDisable = false,
  isBronze = false,
  isSilver = false,
  badgeName = '',
  TAO = 0,
  AO = 0,
  TRMU = 0,
  RMU = 0,
  TCBU = 0,
  CBU = 0,
  TSMV = 0,
  SMV = 0,
  TMS = 0,
  MS = 0,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          isDisable
            ? ['#ebebeb', '#ebebeb']
            : isBronze
              ? ['#ad731a', '#E29B2F', '#f0b65d', '#f5d5a4']
              : isSilver
                ? ['#918e8e', '#ebebeb']
                : ['#dba904', '#f5bc00', '#f5df95']
        }
        style={styles.gradientCon}>
        <Text
          style={[
            FontStyle.RalewayTitle,
            styles.titleName,
            {
              color: isDisable ? '#707070' : '#FFF',
            },
          ]}>
          {badgeName}
        </Text>
        {isDisable ? (
          <Image source={DisableImg} style={styles.img} />
        ) : (
          <Image source={medalImg} style={styles.img} />
        )}
      </LinearGradient>

      <View
        style={[
          styles.taskListCon,
          {
            backgroundColor: isDisable
              ? colors.BorderColor
              : isBronze
                ? '#FFFCF7'
                : isSilver
                  ? '#F6F6F6'
                  : '#FFFDF7',
          },
        ]}>
        <Text
          style={[
            FontStyle.Nunito12,
            styles.tasktitle,
            {
              color: colors.Blue_Theme,
            },
          ]}>
          {appTranslations?.TASKS}
        </Text>
        <View style={styles.taskCon}>
          <Text
            style={[
              FontStyle.Nunito11
              , {
                color: isDisable ? colors.Grey_4 : '#707070',
              }]}>
            {appTranslations?.APP_OPENED}:
          </Text>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : colors.Blue_2,
            }]}>
            {AO} / {TAO}
          </Text>
        </View>
        <View style={styles.taskCon}>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : '#707070',
            }]}>
            {appTranslations?.RESOURCE_MATERIAL_USAGE}:
          </Text>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : colors.Blue_2,
            }]}>
            {RMU} / {TRMU}
          </Text>
        </View>
        <View style={styles.taskCon}>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : '#707070',
            }]}>
            {appTranslations?.CHATBOT_USAGE}:
          </Text>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : colors.Blue_2,
            }]}>
            {CBU} / {TCBU}
          </Text>
        </View>
        <View style={styles.taskCon}>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : '#707070',
            }]}>
            {appTranslations?.SUB_MODULE_VISITED}:
          </Text>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : colors.Blue_2,
            }]}>
            {SMV} / {TSMV}
          </Text>
        </View>
        <View style={styles.taskCon}>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : '#707070',
            }]}>
            {appTranslations?.MINUTES_SPENT}:
          </Text>
          <Text
            style={[FontStyle.Nunito11, {
              color: isDisable ? colors.Grey_4 : colors.Blue_2,
            }]}>
            {MS} / {TMS}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(30),
    marginBottom: RFValue(20),
    margin: RFValue(10),
    borderRadius: RFValue(10),
    elevation: 8,
    minWidth: RFValue(190),
  },
  gradientCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: RFValue(10),
    borderTopRightRadius: RFValue(10),
    height: RFValue(55),
  },
  img: {
    height: RFValue(55),
    width: RFValue(55),
    right: 0,
    bottom: Platform.OS == 'android' ? RFValue(18) : RFValue(0),
  },
  titleName: {
    marginHorizontal: RFValue(10),
    marginVertical:Platform.OS == 'ios' ? RFValue(5) : 0,
  },
  taskListCon: {
    paddingHorizontal: RFValue(10),
    paddingBottom: RFValue(10),
    borderBottomLeftRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
  },
  tasktitle: {
    marginVertical: RFValue(10),
  },
  taskCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
  },
});
