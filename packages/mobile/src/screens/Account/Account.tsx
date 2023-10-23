import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { getUserData } from '@tb-frontend/shared/Store/action/usersActions';
import React, { useContext, useEffect } from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { iosversionName, versionName } from '../../../package.json';
import { AuthContext } from '../../components/context';
import { AccountListItem } from '../../components/core/AccountListItem';
import { ProfileConatainer } from '../../components/core/ProfileConatainer';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import { themeProps } from '../../types';
import { appConfigTypes } from '../types';
export default function Account(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state?.user?.userData);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    try {
      dispatch(getUserData());
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  const navigation = useNavigation();
  const appContext = useContext(AuthContext);

  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.purple_light }]}>
      <ProfileConatainer
        ShowAppPerformance={false}
        style={styles.TopContainer}
      />
      <View style={[styles.AccountDetailsContainer, { backgroundColor: colors.background }]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: RFValue(25) }}>
            <AccountListItem title={appTranslations.EDIT_PERSONAL_DETAILES} onPress={() => navigation.navigate('EditProfile')} />
            <AccountListItem title={appTranslations.ACCOUNT_CHANGE_PASSWORD} onPress={() => navigation.navigate('ChangePassword')} />
            <AccountListItem title={appTranslations.EDIT_PROFILE_PICTURE} onPress={() => navigation.navigate('EditProfilePicture')} />
            <View style={styles.SupportArea}>
              <Text style={[FontStyle.NunitoDate11, styles.AccountHeading, { color: colors.Grey_3 }]}>
                {appTranslations.HEADER_SUPPORT}
              </Text>
              <AccountListItem title={appTranslations.CHANGE_APPLICATION_LANG} onPress={() => navigation.navigate('SelectLang')} />
              <AccountListItem title={appTranslations.DRAWER_CONTACT_US} onPress={() => navigation.navigate('ContactUs')} />
              <AccountListItem title={appTranslations.DRAWER_ABOUT_IIPHG} onPress={() => navigation.navigate('AboutIIPHG')} />
              <AccountListItem title={appTranslations.DRAWER_ABOUT_CGC_PROJECT} onPress={() => navigation.navigate('AboutCGCProject')} />
              <AccountListItem title={appTranslations.PRIVACY_POLICY} onPress={() => Linking.openURL('https://privacy-policy_URL')} />
              <AccountListItem title={appTranslations.SHARE_APP_LINK} onPress={() => Share.open({
                message: 'Ni-kshay SETU',
                title: 'App Link',
                url:
                  Platform.OS === 'ios'
                    ? 'https://apps_store_URL'
                    : 'https://play_store_URL',
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                })} />
              <AccountListItem title={appTranslations.SIGN_OUT} onPress={() => appContext.signOut()} />

            </View>
          </View>
          <View style={styles.poweredbyCon}>
            <Text onPress={() => {
              Linking.openURL('https://www.digiflux.io/');
            }} style={[FontStyle.Nunito15, { color: colors.HOVER_ORANGE }]}>
              Powered by Digiflux IT Solutions
            </Text>
            <Text style={[FontStyle.Nunito16, { color: appTheme.colors.Grey_1 }]}> V {Platform.OS == 'android' ? versionName : iosversionName}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    borderRadius: RFValue(30),
  },
  AccountDetailsContainer: {
    flex: 2.2,
    paddingTop: RFValue(24),

    // paddingLeft: RFValue(25),
    // paddingRight: RFValue(34),
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  TopContainer: {
    flex: 1.3,
    // justifyContent: 'center',
  },
  AccountHeading: {
    marginBottom: RFValue(10),
  },

  SupportArea: {
    marginTop: RFValue(30),
  },

  poweredbyCon: {
    flexDirection: 'row',
    marginTop: RFValue(50),
    margin: RFValue(10),
    justifyContent: 'space-between',
  },
});
