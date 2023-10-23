import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType, Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';
interface Props {
  onPress: () => void;
  title: string;
  source?: ImageSourcePropType | undefined
}

export const MaterialsCards: React.FC<Props> = ({
  onPress = () => null,
  title = '',
  source = undefined,
}) => {
  const { colors } = useTheme() as themeProps;
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <Image
        source={source}
        style={styles.ImageStyle}
        resizeMode="contain"
      />
      <Text style={[styles.listItemText, FontStyle.Nunito16, { color: colors.Blue_2 }]}>{title}</Text>
    </Pressable>
  );
};

let styles = StyleSheet.create({
  ImageStyle: {
    width: RFValue(30),
    height: RFValue(30),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFValue(10),
    padding: RFValue(5),
  },

  listItemText: {
    flex: 1,
    marginLeft: RFValue(10),
  },

});
