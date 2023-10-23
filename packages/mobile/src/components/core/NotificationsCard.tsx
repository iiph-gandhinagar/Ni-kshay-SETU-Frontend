import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
interface NotificationsCardProps {
  Title: String;
  time: String;
  Text2: String;
  ImgSrc: ImageSourcePropType | undefined;
  onPress?: () => void
}
export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  Title = '',
  time = '',
  Text2 = '',
  ImgSrc = undefined,
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.Card, {
      }]}>
      <View style={styles.ImageContainer}>
        <Image source={ImgSrc}
          style={styles.Image}
        />
      </View>

      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View
          style={styles.subContainer}>
          <Text
            style={[FontStyle.RalewayTitle, styles.TitleTxt, { color: colors.Blue_2 }]}>
            {Title}
          </Text>
          {Text2 ?
            <Text
              style={[FontStyle.Nunito12, { color: colors.Blue_2 }]}>
              {Text2}
            </Text> : null}
        </View>
        <Text
          style={[FontStyle.NunitoDate, styles.timeTxt, { color: colors.Grey_4 }]}>
          {time}
        </Text>
      </View>
    </Pressable>
  );
};


let styles = StyleSheet.create({
  Card: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(5),
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
    marginEnd: RFValue(4),
    alignItems: 'center',
  },
  TitleTxt: {
    flex: 1,
    marginBottom: RFValue(1),
  },
  subContainer: {
    flex: 1,
    paddingRight: RFValue(4),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  timeTxt: {
    // alignSelf: 'flex-end',
  },
});
