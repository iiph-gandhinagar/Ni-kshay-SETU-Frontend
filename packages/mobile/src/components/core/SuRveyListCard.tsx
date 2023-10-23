import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface Props {
  dis?: boolean;
  Title: string;
  onPress: () => void;
}
export const SuRveyListCard: React.FC<Props> = ({
  Title = '',
  onPress = () => null,
  dis = false,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable disabled={dis} onPress={onPress} style={[styles.Conatiner, { backgroundColor: colors.background }]}>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <Image
          source={require('../../assets/contactform.png')}
          style={styles.img} />
        <Text style={[FontStyle.Nunito18Title, { color: colors.Blue_2 }]}>{Title}</Text>
      </View>
      <Text style={[FontStyle.Nunito12, styles.Rtxt, { color: colors.green }]}>{dis ? 'Done' : 'Start'}</Text>
    </Pressable>
  );
};

let styles = StyleSheet.create({
  Rtxt: {
    margin: RFValue(10),
    marginEnd: RFValue(20),
  },
  Conatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFValue(6),
    alignItems: 'center',
    marginBottom: RFValue(15),
  },
  img: {
    height: RFValue(27),
    width: RFValue(27),
    marginEnd: RFValue(10),
  },
});
