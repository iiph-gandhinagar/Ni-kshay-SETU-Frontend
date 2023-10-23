import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageSourcePropType, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { FeatureSkeleton } from './Loaders/Skeletons';
import { appConfigTypes, themeProps } from '../../types';
interface FeatureContainerProps {
  title: string;
  ImgUrl: ImageSourcePropType | undefined;
  color: string;
  onPress?: () => void;

}
export const FeatureContainer: React.FC<FeatureContainerProps> = ({
  title = '',
  ImgUrl = undefined,
  color = '',
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const { dynamicAlogsloader } = useSelector(state => state?.app);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return dynamicAlogsloader ? <FeatureSkeleton /> : (
    <Pressable onPress={onPress} style={[styles.contenier, styles.iosShadow,{
      backgroundColor: colors.white, shadowColor: color,
    } ]}>
      <Text
        style={[styles.Txt, FontStyle.RalewayText12, { color: color }]}>
        {appTranslations?.[title] || title}
      </Text>
      <Image
        source={ImgUrl}
        width={RFValue(65)}
        style={styles.Img}
      />
    </Pressable>
  );
};

let styles = StyleSheet.create({
  contenier: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(10),
    margin: RFValue(5),
    flex: 1,
    elevation: 5,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  iosShadow:{
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius:1.5,
  },
  Img: {
    marginLeft: RFValue(5),
    height: RFValue(65),
    width: RFValue(65),
  },
  Txt: {
    flex: 1,
    alignSelf: 'center',
  },
});
