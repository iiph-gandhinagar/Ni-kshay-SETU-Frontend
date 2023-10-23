import table, { IGNORED_TAGS } from '@native-html/table-plugin';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { Header } from '../../components/core/Header';
import { FontStyle } from '../../config/FontStyle';
import {
  baseFontStyle, em, img, li, p, span, strong,
  tableStyles, ul,
} from '../../config/styles.js';
import { appTheme } from '../../config/theme';
import { appConfigTypes, themeProps } from '../../types';
export default function AboutIIPHG(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const contentWidth = useWindowDimensions().width;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const appMasterCms = useSelector(state => state?.app?.appMasterCms);
  const htmlContent = appMasterCms?.filter(e => e.title === 'About IIPHG')?.[0]
    ?.description;
  const renderers = {
    table,
  };
  const htmlConfig = {
    WebView,
    renderers,
    ignoredTags: IGNORED_TAGS,
    renderersProps: {
      table: {
        animationType: 'animated',
        tableStyleSpecs: {
          fitContainerWidth: true,
          trOddBackground: colors.white,
          columnsBorderWidthPx: 0,
          rowsBorderWidthPx: 0,
          outerBorderWidthPx: 0,
          outerBorderColor: 0,
          trEvenBackground: colors.white,
          fontSizePx: RFValue(16),
          fontFamily: appTheme.fontFamily.NunitoRegular,
          cellPaddingEm: 0.625,
        },
      },
    },
    tagsStyles: {
      table: {},
    },
  };
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.DRAWER_ABOUT_IIPHG}
      />
      <Text style={[FontStyle.Nunito18Title, { color: colors.Blue_2, marginVertical: RFValue(25), textAlign: 'center' }]}>
        Our Partners
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => Linking.openURL('https://tbcindia.gov.in/')}>
          <Image
            source={require('../../assets/NTEPlogo.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://www.usaid.gov/')}>
          <Image
            source={require('../../assets/USAIDLogo.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://worldhealthpartners.org/')}>
          <Image
            source={require('../../assets/WHPLogo.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://iiphg.edu.in/')}>
          <Image
            source={require('../../assets/IIPHGLogo.png')}
            style={styles.image}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  image: {
    width: RFValue(170),
    height: RFValue(102),
    alignSelf: 'center',
    marginVertical: RFValue(5),
  },
});
