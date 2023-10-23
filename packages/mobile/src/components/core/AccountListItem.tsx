import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface AccountListItemProps {
  title: string;
  onPress: () => void;
}
export const AccountListItem: React.FC<AccountListItemProps> = ({
  title = '',
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.FlexRow, { backgroundColor: colors.accountlinkBack }]}>
        <Text style={[FontStyle.Nunito16, styles.AccountDetailsText, { marginBottom: 0, color: colors.Blue_2 }]}>
          {title}
        </Text>
        <View style={[styles.RightArrowCon, { borderColor: colors.Blue_2 }]}>
          <Icon
            name="chevron-right"
            size={RFValue(13)}
            color={colors.Blue_2}
            style={{ marginLeft: RFValue(1) }}
          />
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  FlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(5),
    paddingVertical: RFValue(8),
    marginTop: RFValue(15),
  },
  AccountDetailsText: {
    flex: 1,
  },
  RightArrowCon: {
    borderRadius: RFValue(30),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(20),
    width: RFValue(20),
  },

});
