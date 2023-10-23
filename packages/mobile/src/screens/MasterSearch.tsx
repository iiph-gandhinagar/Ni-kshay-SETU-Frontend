import { useNavigation } from '@react-navigation/core';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import { clearMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  default as Icon,
} from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../components/core/input';
import { FaqComponent } from '../components/MasterSearch/FaqComponent';
import { ModulesComponent } from '../components/MasterSearch/ModulesComponent';
import { ResourceMaterialComponent } from '../components/MasterSearch/ResourceMaterialComponent';
import { SubModulesComponent } from '../components/MasterSearch/SubModulesComponent';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
const Tab = createMaterialTopTabNavigator();
export default function MasterSearch(props): JSX.Element {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    return function searchCleanup() {
      dispatch(clearMasterSearch());
      setSearch('');
    };
  }, []);
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <View style={[styles.Row, { backgroundColor: colors.MasterBackground }]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="arrowleft"
            size={RFValue(20)}
            color={colors.Blue_2}
            style={{ marginRight: RFValue(24) }}
          />
        </Pressable>
        <SearchBar
          placeholder={appTranslations.PLACEHOLDER_SEARCH}
          value={search}
          onChangeText={search => {
            setSearch(search);
          }}
          onEndEditing={() => {
            if (search) {
            } else {
              dispatch(clearMasterSearch());
              setSearch('');
            }
          }}
          onClear={() => {
            dispatch(clearMasterSearch());
            setSearch('');
          }}
        />
      </View>
      <View
        style={[styles.tabContainer, { backgroundColor: colors.background }]}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorContainerStyle: { backgroundColor: colors.background, ...styles.Container },
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: colors.tabActive,
            tabBarInactiveTintColor: colors.tabInActive,
            tabBarIndicatorStyle: { borderColor: colors.tabActive, borderWidth: RFValue(1) },
            tabBarContentContainerStyle: {},
            tabBarLabelStyle: { ...FontStyle.Nunito11, textTransform: 'none' },
            tabBarStyle: {
              backgroundColor: colors.background,
              marginHorizontal: RFValue(16),
              overflow: 'hidden',
              borderWidth: 0,
              elevation: 0,
            },
            lazy: true,
          }}>
          <Tab.Screen name="Modules" options={{ title: appTranslations.MASTER_SEARCH_TAB_MODULES }} children={() => <ModulesComponent search={search} />} />
          <Tab.Screen name="SubModules" options={{ title: appTranslations.MASTER_SEARCH_TAB_SUB_MODULES }} children={() => <SubModulesComponent search={search} />} />
          <Tab.Screen name="ResourceMaterial" options={{ title: appTranslations.MASTER_SEARCH_RESOURCE_MATERIAL }} children={() => <ResourceMaterialComponent search={search} />} />
          <Tab.Screen name="Faq" options={{ title: appTranslations.MASTER_SEARCH_TAB_FAQ }} children={() => <FaqComponent search={search} />} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(11),
    height: RFValue(50),
  },
  tabContainer: {
    flex: 1,
    elevation: RFValue(1),
    overflow: 'hidden',
  },
});
