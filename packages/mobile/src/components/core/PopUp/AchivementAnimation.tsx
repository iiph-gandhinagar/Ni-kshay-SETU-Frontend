import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';

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
      style={[styles.Container, { borderColor: colors.green, backgroundColor: colors.lightBlue3 }]}>
      <Lottie
        loop
        autoPlay
        source={require('../../../assets/Animations/cloud4.json')}
        style={styles.anim1} />
      <Lottie
        loop
        autoPlay
        source={require('../../../assets/Animations/birds.json')}/>

      <Text
        style={[styles.HeaderText, FontStyle.Raleway18ExtraBlod,{ color: colors.white }]}>
        Level Achieved
      </Text>
      <Lottie
        loop
        autoPlay
        source={require('../../../assets/Animations/Rocket.json')}
        style={styles.anim2}/>

      <Text
        style={[styles.Text,FontStyle.Raleway18Bold,{color:colors.Blue_Theme}]}>
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  Container:
  {
    borderWidth:RFValue(3),
    marginVertical: RFValue(20),
    borderRadius: RFValue(100),
    width: RFValue(200),
    height: RFValue(200),
    alignSelf: 'center',
    alignItems: 'center',
  },
  Text: {
    textAlign: 'center',
    width: RFPercentage(20),
    marginTop: RFValue(-10),
  },
  HeaderText: {
    marginTop: RFValue(20),
    marginBottom:RFValue(-10),
  },
  anim1: {
    borderRadius: 190,
    overflow: 'hidden',
  },  anim2: {
    height: RFValue(110),
  },

});
