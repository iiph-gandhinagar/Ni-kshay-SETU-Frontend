import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
const Dimension = Dimensions.get('window');

interface LogoContainerProps {
  bottomText?: String;
}
export const LogoContainer: React.FC<LogoContainerProps> = ({
  bottomText = 'Support to End TUberculosis (SETU)',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  return (
    <View style={styles.LogoContainer}>
    <Image
      style={[styles.img,{borderColor: colors.Light_blue}]}
      source={require('../assets/tblogo.png')}
    />
    <Image
      style={[styles.img2,{borderColor: colors.Light_blue}]}
      source={require('../assets/nikshayLogo.png')}
    />
    <Text style={[FontStyle.RalewayText12, styles.LogoText, { color: colors.HOVER_ORANGE }]}>{bottomText}</Text>
  </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    maxHeight: Dimension.height,
    flex: 1,
  },
  LogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(20),
  },
  Logo: {
    height: RFValue(150),
    width: RFValue(150),
    borderRadius: RFValue(10),
    borderWidth: 4,
  },
  LogoText: {
    marginTop: RFValue(10),
  },img:{
    height: RFValue(80),
    width: RFValue(80),
    borderRadius: RFValue(10),
    borderWidth: 1,
    marginBottom:RFValue(15),
  },img2:{
    height: RFValue(25),
    width: RFValue(225),
  },
});
