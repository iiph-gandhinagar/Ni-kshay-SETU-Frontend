import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface AchivementAnimationProps {
  title: string;
}
export const AchivementAnimation: React.FC<AchivementAnimationProps> = ({
  title = '',
}) => {
  const ref = React.useRef();
  const { colors } = useTheme() as unknown as themeProps;
  React.useEffect(() => {
    ref.current?.play();
  }, [ref.current]);
  return (
    <View
      style={[styles.Conatainer, { borderColor: colors.green, backgroundColor: colors.achivementBackground }]}>
      <Text
        style={[styles.HeaderText, FontStyle.Raleway18ExtraBlod, { color: colors.Blue_Theme }]}>
        Current Level
      </Text>
      <Lottie
        loop
        autoPlay
        source={require('../../assets/Animations/cloud4.json')}
        style={{
          // borderRadius: 190,
          // overflow: 'hidden',
        }} />

      <Lottie
        loop
        autoPlay
        source={require('../../assets/Animations/birds.json')} />
      <Lottie
        loop
        autoPlay
        source={require('../../assets/Animations/Rocket.json')}
        style={{
          height: RFValue(160),
        }} />

      <Text
        style={[styles.Text, FontStyle.Raleway18Bold, { color: colors.Blue_Theme }]}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  Conatainer:
  {
    overflow: 'hidden',
    width: '100%',
    marginVertical: RFValue(20),
    height: RFValue(250),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Text: {
    textAlign: 'center',
    marginBottom: RFValue(22),
  },
  HeaderText: {
    marginTop: RFValue(22),
    // marginBottom: RFValue(-10),
  },

});
