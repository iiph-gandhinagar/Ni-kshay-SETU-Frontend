import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  default as Icons,
} from 'react-native-vector-icons/Fontisto';
import {
  default as Icon, default as MaterialIcon,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
interface Props {
  onClickSorting: () => void
}

export const SearchHeader: React.FC<Props> = ({
  onClickSorting = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const { searchTerm } = useSelector(state => state?.health);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  const { stateID, districtID, blockID, facility } = useSelector(state => state?.health);
  console.log(' stateID, districtID,  blockID, facility ', !stateID || !districtID || !blockID || !facility);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable onPress={() => {
        navigation.navigate('SearchFilter');
      }} style={[styles.Subcontainer, { borderColor: colors.Grey_4 }]}>
        <Icons
          name="zoom"
          size={RFValue(20)}
          color={colors.Blue_2}
        />
        <TextInput
          style={[styles.txtInput, FontStyle.Nunito18Title, { color: colors.Blue_2 }]}
          placeholderTextColor={colors.Blue_2}
          editable={false}
          placeholder={appTranslations?.PLACEHOLDER_SEARCH}
          defaultValue={searchTerm}
        />
      </Pressable >
      <Pressable onPress={() => navigation.navigate('FilterScreen')}>
        <View style={{ marginHorizontal: RFValue(5) }}>
          {
            !stateID || !districtID || !blockID || !facility ?
              <Icon
                name="filter-outline"
                size={RFValue(30)}
                color={colors.Blue_2}
              />
              :

              <Icon
                name="filter-menu"
                size={RFValue(30)}
                color={colors.Blue_2}
              />
          }
        </View>
      </Pressable>
      <Pressable
        onPress={onClickSorting}
        style={{
          marginHorizontal: RFValue(5), justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MaterialIcon
          name="filter-variant"
          size={RFValue(30)}
          color={colors.Blue_2}
        />
      </Pressable>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    margin: RFValue(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  Subcontainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFValue(35),
    paddingHorizontal: RFValue(10),
    flex: 1,
  },
  txtInput: {
    flex: 1,
    paddingHorizontal: RFValue(20),
  },

});
