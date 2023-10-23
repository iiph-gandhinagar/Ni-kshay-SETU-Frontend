import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface SimilarAppProps {
  Heading: String;
  Logo: String | undefined;
  onPress: () => void;
}
export const SimilarAppComponent: React.FC<SimilarAppProps> = ({
  Heading = '',
  Logo = undefined,
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable onPress={onPress} style={[styles.Card]}>
      <Image style={styles.Image} source={{ uri: Logo }} />
      <Text
        style={[
          FontStyle.Nunito11,
          {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: RFValue(5),
            color: colors.black,
          },
        ]}>
        {Heading}
      </Text>
    </Pressable>
  );
};

let styles = StyleSheet.create({
  Card: {
    flex: 1,
    width: RFValue(95),
    marginLeft: RFValue(15),
  },
  Image: {
    height: RFValue(45),
    width: RFValue(45),
    alignSelf: 'center',
    marginBottom: RFValue(1),
  },
  Details: {
    paddingLeft: RFValue(5),
  },
  Subtitle: {
    marginBottom: RFValue(7),
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },

});
