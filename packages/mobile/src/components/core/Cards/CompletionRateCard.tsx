import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface Props {
  title: string;
  circularProgress: any;
  completed: number;
  pending: number;
}
export const CompletionRateCard: React.FC<Props> = ({
  title = '',
  circularProgress,
  completed = '',
  pending = '',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.Card, { backgroundColor: colors.cardBackground }]}>
      <Text
        style={[styles.HeaderText, { color: colors.tabInActive }]}>
        {title}
      </Text>
      <View style={styles.CircularProgress}>{circularProgress}</View>
      <View
        style={[styles.Row]}>
        <Text
          style={[styles.Text, { color: colors.tabInActive }]}>
          Achieved
        </Text>
        <Text
          style={[styles.Text, { color: colors.tabInActive }]}>
          {completed}
        </Text>
      </View>
      <View style={styles.Row}>
        <Text
          style={[styles.Text, { color: colors.tabInActive }]}>
          Pending
        </Text>
        <Text
          style={[styles.Text, { color: colors.secondary }]}>
          {pending}
        </Text>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  Card: {
    flex: 1,
    padding: RFValue(10),
    marginTop: RFValue(25),
    borderRadius: RFValue(5),
    elevation: RFValue(2),
    marginHorizontal: RFValue(8),

    maxWidth: RFValue(230),
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(7),
  },
  Details: {
    paddingLeft: RFValue(5),
  },
  Subtitle: {
    marginBottom: RFValue(7),
  },
  CircularProgress: {
    alignItems: 'center',
    // backgroundColor: '#3f3',
  },
  HeaderText: {
    ...FontStyle.Nunito12,
    marginBottom: RFValue(12),
  },
  Text: {
    ...FontStyle.Nunito12,
  },
});
