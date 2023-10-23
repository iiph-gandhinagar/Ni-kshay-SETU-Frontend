import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../../types';
interface RecentlyAddedProps {
  Title: String;
  time: String;
  Text2: String;
  ImgSrc: ImageSourcePropType | undefined;
  onPress?: () => void
}
export const RecentlyAddedComponents: React.FC<RecentlyAddedProps> = ({
  Title = '',
  time = '',
  Text2 = '',
  ImgSrc = undefined,
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <Pressable
      onPress={onPress}
      style={[styles.Card, {
        backgroundColor: colors.Light_blue,
      }]}>
      <View style={styles.ImageContainer}>
        <Image source={ImgSrc}
          resizeMode="cover"
          style={styles.Image}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[FontStyle.Nunito15, styles.TitleTxt, { color: colors.Blue_Theme }]}>
          {appTranslations?.[Title] || Title}
        </Text>
        <View
          style={styles.subContainer}>
          <Text
            style={[FontStyle.Nunito11, { color: colors.HOVER_ORANGE }]}>
            {appTranslations?.[Text2] || Text2}
          </Text>
          <Text
            style={[FontStyle.NunitoDate, styles.timeTxt, { color: colors.Grey_4 }]}>
           {time }
          </Text>
        </View>
      </View>
    </Pressable>
  );
};


let styles = StyleSheet.create({
  Card: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(5),
    borderRadius: RFValue(10),
    flex: 1,
    marginVertical: RFValue(7),
  },
  ImageContainer: {
    justifyContent: 'center',
    marginRight: RFValue(5),
  },
  Image: {
    height: RFValue(35),
    width: RFValue(35),
    marginRight: RFValue(4),
    alignItems: 'center',
  },
  TitleTxt: {
    flex: 1,
    marginBottom: RFValue(1),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeTxt: {
    alignSelf: 'flex-end',
  },
});
