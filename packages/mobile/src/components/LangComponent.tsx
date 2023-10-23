import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RFValue } from 'react-native-responsive-fontsize';
import { Props } from 'react-native-tab-view/lib/typescript/TabBarItem';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';


interface Props {
  onPress?: () => void;
  title: string;
  subTitle?: string;
  source: ImageSourcePropType | undefined;
  isSelected: boolean
}

export const LangComponent: React.FC<Props> = ({
  onPress = () => null,
  title = '',
  subTitle = '',
  source = undefined,
  isSelected = false,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable
      onPress={onPress}>
      <View style={[styles.Container, { backgroundColor: colors.purple_light }]}>
        <BouncyCheckbox
          style={styles.Container2}
          size={RFValue(20)}
          fillColor={colors.Blue_2}
          unfillColor={colors.background}
          disableBuiltInState
          isChecked={isSelected}
          onPress={onPress}
        />
        <Image source={source} style={styles.img} />
        <Text style={[FontStyle.RalewayTitle, { color: colors.black, marginTop: RFValue(10) }]}>{title}</Text>
        <Text style={[FontStyle.RalewayTitle, { color: colors.Grey_4, marginVertical: RFValue(10) }]}>{subTitle}</Text>

      </View>
    </Pressable>
  );
};





let styles = StyleSheet.create({
  Container:
  {
    // borderWidth: RFValue(1),
    alignItems: 'center',
    flex: 1,
    padding: RFValue(5),
    borderRadius: RFValue(5),
  },
  Container2: {
    alignSelf: 'flex-end',
  },
  img: {
    height: RFValue(33),
    width: RFValue(33),
    marginVertical: RFValue(10),
  },
});
