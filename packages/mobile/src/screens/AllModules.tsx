import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header2 } from '../components/core/Header';
import { AllModulesList } from '../components/core/ModulesList';
import { themeProps } from '../types';
export default function AllModules(): JSX.Element {

  const { colors } = useTheme() as unknown as themeProps;
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header2 />
      <AllModulesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: RFValue(10),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
