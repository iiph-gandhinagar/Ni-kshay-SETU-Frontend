import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView, StyleSheet, useWindowDimensions, View, Text,
} from 'react-native';
import HTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Header } from '../../components/core/Header';
import { FontStyle } from '../../config/FontStyle';
import {
  baseFontStyle, em, iframe, li, p, span, strong,
  tableStyles, ul,
} from '../../config/styles.js';
import { appConfigTypes, themeProps } from '../../types';
export default function AboutCGCProject(props): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const contentWidth = useWindowDimensions().width;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const appMasterCms = useSelector(state => state?.app?.appMasterCms);
  const htmlContent = appMasterCms?.filter(e => e.title === 'About CGC')?.[0]
    ?.description;
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.white }]}>
      <Header headerTitle={appTranslations.DRAWER_ABOUT_CGC_PROJECT} />
      <ScrollView showsVerticalScrollIndicator={false} testID="scroll-view">
        <View style={[styles.AboutContainer]}>
          <Image style={styles.img} source={require('../../assets/information.png')} testID="image" />
          <Text style={[styles.UsTxt, FontStyle.Nunito18Title, { color: colors.Blue_2 }]} testID="About_us_test">About US</Text>
          <HTML
            source={{ html: htmlContent }}
            contentWidth={contentWidth}
            baseFontStyle={baseFontStyle}
            tagsStyles={{
              p: {
                ...p,
                color: colors.black2,
                marginBottom: RFValue(10),
                textAlign: 'auto',
              },
              span: {
                ...span,
                color: colors.black2,
              },
              em: {
                ...em,
                padding: 'auto',
                color: colors.Grey_3,
              },
              ul: {
                ...ul,
                padding: 'auto',
                color: colors.Blue_2,
                margin: 0,
              },
              ol: {
                color: colors.Blue_2,
                padding: 'auto',
              },
              li: {
                ...li,
                padding: 'auto',
                color: colors.black2,
                alignItems: 'flex-start',
                marginBottom: RFValue(10),
              },
              strong: {
                ...strong,
                color: colors.black2,
                textAlign: 'auto',
              },
              table: {
                ...tableStyles,
                color: colors.black2,
              },
              iframe: {
                ...iframe,
                minHeight: RFValue(230),
                color: colors.black2,
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  AboutContainer: {
    flex: 1,
    // paddingTop: RFValue(64),
    paddingTop: RFValue(24),
    paddingHorizontal: RFValue(24),

  },
  img: {
    height: RFValue(100),
    width: RFValue(100),
    alignSelf: 'center',
    marginBottom: RFValue(20),
  }, UsTxt: {
    alignSelf: 'center',
    marginBottom: RFValue(10),
  },
});
