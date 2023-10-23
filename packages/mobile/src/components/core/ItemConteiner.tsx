import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';

interface ItemConteinerProps {
  title: String;
  ImgSrc: ImageSourcePropType | undefined;
  onPress: (e: any) => void;
}
export const ItemConteiner: React.FC<ItemConteinerProps> = ({
  title = '',
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
      style={styles.Conatiner}>
      <View style={[styles.ICBG, {
        backgroundColor: colors.background,
      }]}>
        <Image source={ImgSrc} style={styles.PhotoProfile} />
      </View>
      <Text style={[FontStyle.Nunito11, styles.text, { color: colors.Grey_4 }]}>{appTranslations[title] || title}</Text>
    </Pressable>
  );
};

let styles = StyleSheet.create({
  PhotoProfile: {
    height: RFValue(25),
    width: RFValue(25),
    // marginHorizontal: RFValue(4),
  },
  text: {
    marginTop: RFValue(5),
    width: RFValue(68),
    textAlign: 'center',
  },
  Conatiner: {
    flex: 1,
    alignItems: 'center',
  },
  ICBG: {
    borderRadius: RFValue(50),
    alignItems: 'center',
    padding: RFValue(10),
  },
});
