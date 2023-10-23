import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import { Header } from '../core/Header';

interface Props {
  headerTitle: string;
  isSubHeaderActive: Boolean;
}

export const ChatHeader: React.FC<Props> = ({
  headerTitle,
  isSubHeaderActive = true,
}) => {
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const { colors } = useTheme() as unknown as themeProps;
  return isSubHeaderActive ? (
    <View
      style={styles.container}>
      <Image
        source={require('../../assets/chatbotface.png')}
        style={{ height: RFValue(70), width: RFValue(70) }}
      />
      <View style={styles.subHeaderContainer}>
        <Text style={[FontStyle.Nunito16, { color: colors.whiteYellow, textAlign: 'center' }]}>
          {appTranslations?.BOT_SUB_HEADER?.replace('<br />', '\n')}
        </Text>
      </View>
    </View>
  ) : <Header isTransparent headerTitle={headerTitle} />;
};

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: RFValue(24),
    paddingHorizontal: RFValue(24),
  },

  headerContainer: {
    paddingLeft: RFValue(5),
    paddingVertical: RFValue(10),
    justifyContent: 'center',
  },
  subHeaderContainer: {
    paddingLeft: RFValue(5),
    justifyContent: 'center',
    marginBottom: RFValue(10),
  },

});
