import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { AirbnbRating } from 'react-native-ratings';
import { useContentWidth } from 'react-native-render-html';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface RatingCardsProps {
  Title: String;
  Descriptions: String;
  ImgSrc: ImageSourcePropType | undefined;
  onSetRating: (e: number | string) => void,
  defaultRating?: number
}
export const RatingCards: React.FC<RatingCardsProps> = ({
  Title = '',
  Descriptions = '',
  ImgSrc = undefined,
  onSetRating = () => null,
  defaultRating = 5,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const width = useContentWidth();
  useEffect(() => {
    onSetRating(5);
  }, []);
  return (
    <View
      style={[styles.container, {
        backgroundColor: colors.certiSubHeaderBack,
        borderColor: colors.bottomBorder,
      }]}>
      <View
        style={styles.titleContainer}>
        <Image
          source={ImgSrc}
          style={{ height: RFValue(35), width: RFValue(35), marginRight: RFValue(10), borderRadius: RFValue(5) }}
        />
        <Text
          style={[FontStyle.Nunito18Title, {
            color: colors.Blue_2,
            flex: 1,
          }]}>
          {Title}
        </Text>
      </View>
      <Text
        style={[FontStyle.Nunito16, styles.Descriptions, {
          color: colors.Grey_3,
        }]}>
        {Descriptions}
      </Text>
      <AirbnbRating
        ratingContainerStyle={styles.ratingContainer}
        starContainerStyle={[styles.star, { width: width - RFValue(30) }]}
        showRating={false}
        defaultRating={defaultRating}
        selectedColor={colors.brightYellow}
        size={RFValue(30)}
        unSelectedColor={colors.Grey_4}
        onFinishRating={onSetRating}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(15),
    padding: RFValue(5),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  Descriptions: {
    marginVertical: RFValue(10),
  },
  ratingContainer: {
    marginHorizontal: RFValue(10),
    marginTop: RFValue(5),
  },
  star: {
    paddingVertical: RFValue(10),
    justifyContent: 'space-evenly',
  },
});
