import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Props } from 'react-native-tab-view/lib/typescript/TabBarItem';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';

interface Props {
  // onPress?: () => void;
  title: string;
  titleFirst: string;
  style?: ViewStyle;
}

export const AssessmentList: React.FC<Props> = ({
  // onPress = () => null,
  titleFirst = '',
  title = '',
  style = {},
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[style, { flexDirection: 'row', flex: 1 }]}>
      <View style={{ flexDirection: 'row', flex: 1.5 }}>
        <Text style={[FontStyle.RalewayTitle, { color: colors.Grey_3 }]}>{titleFirst}</Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 2 }}>
        <Text style={[FontStyle.Nunito16, { color: colors.Blue_2 }]} >{title}</Text>
      </View>
    </View>
  );
};







interface ListSBProps {
  // onPress?: () => void;
  title: string;
  titleFirst: string;
  ConatinerStyle?: ViewStyle;
  TextStyle?: ViewStyle;
}

export const ListSB: React.FC<ListSBProps> = ({
  // onPress = () => null,
  titleFirst = '',
  title = '',
  ConatinerStyle = {},
  TextStyle = {},


}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[ConatinerStyle, styles.listStyle,{backgroundColor:colors.ResuleColor}]}>
      <Text style={[TextStyle, styles.ResultFont]}>{titleFirst}</Text>
      <Text style={[TextStyle, styles.ResultFont]}>{title}</Text>
    </View>
  );
};





const styles = StyleSheet.create({

  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFValue(5),
    paddingEnd:RFValue(20),
    paddingStart:RFValue(20),
  },
  ResultFont: { textAlign: 'center' },
  pointFont: { textAlign: 'center', padding: RFValue(12) },
  Btn: { marginHorizontal: RFValue(40), alignItems: 'center', marginVertical: RFValue(20) },
  Items: { marginBottom: RFValue(30) },
});
