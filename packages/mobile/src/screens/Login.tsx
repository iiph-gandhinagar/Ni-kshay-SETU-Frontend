import { useNavigation, useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useContext } from 'react';

import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
import { handleLogin } from '@tb-frontend/shared/Store/action/authActions';
import { storeDataToAsyncStorage } from '@tb-frontend/shared/utils/functions';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Linking,
  Platform, Pressable, ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { LogoContainer } from '../components/LogoContainer';
import { AuthContext } from '../components/context';
import { Button } from '../components/core/Button';
import { FormInput } from '../components/core/input';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
const Dimension = Dimensions.get('window');

export default function Login(): JSX.Element {
  const navigation = useNavigation();
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const LoginSchema = Yup.object().shape({
    phone_no: Yup.string()
      .required(appTranslations.REQUIRED)
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        appTranslations.VALIDATION_MOBILE_NUMBER,
      ),

    password: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(6, appTranslations.VALIDATION_PASSWORD)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations.VALIDATION_PASSWORD_MATCH,
      ),
  });

  const { signIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={40}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <LogoContainer />
        <View style={[styles.subContainer, { backgroundColor: colors.Light_blue }]}>
          <Text style={[FontStyle.Heading4, styles.headerTxt, { color: colors.Blue_Theme }]}>{appTranslations.WELCOME}!</Text>
          <Formik
            initialValues={{
              phone_no: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              const loginCallback = response => {
                console.log('loginCallback', response);
                if (response?.code == 200 && response.status) {
                  storeDataToAsyncStorage('_token', response?.data?.api_token)
                    .then(() => {
                      dispatch(storeUserActivity('user_Login'));
                      signIn(response?.data?.api_token);
                    })
                    .catch(err => { });
                } else if (response?.code === 401) {
                  Alert.alert('Unauthorized !', response?.data?.message, [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                      onPress: () => null,
                    },
                    {
                      text: 'OK',
                      style: 'default',
                      onPress: () => {
                        navigation.navigate('VerifyMobileNumber', {
                          token: response?.data?.api_token,
                          mobileNo: values.phone_no,
                        });
                      },
                    },
                  ]);
                } else {
                  Alert.alert(
                    'Error!',
                    response?.data || 'Error Connecting Server!!',
                  );
                }
                actions.setSubmitting(false);
              };
              dispatch(handleLogin(values, loginCallback));
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => {
              return (
                <>
                  <FormInput
                    maxLength={10}
                    keyboardType="phone-pad"
                    placeholder={appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                    header={appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                    value={values.phone_no}
                    onChangeText={handleChange('phone_no')}
                    onBlur={handleBlur('phone_no')}
                    errors={errors.phone_no}
                    touched={touched.phone_no}
                    showLeftIcon={true}
                    HideHeader={true}
                    MaterialLeftIcon={'phone'}
                  />
                  <FormInput
                    maxLength={10}
                    header={appTranslations.PLACEHOLDER_PASSWORD}
                    placeholder={appTranslations.PLACEHOLDER_PASSWORD}
                    secureTextEntry={true}
                    showPasswordBtn={true}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errors={errors.password}
                    touched={touched.password}
                    showLeftIcon={true}
                    HideHeader={true}
                    MaterialLeftIcon={'lock'}
                  />
                  <Pressable
                    onPress={() => {
                      navigation.navigate('ForgotPassword');
                    }}>
                    <Text style={[styles.ForgotPassword, FontStyle.Nunito12, { color: colors.green }]}>
                      {appTranslations.LINK_FORGOT_PASSWORD}?
                    </Text>
                  </Pressable>

                  <View style={styles.btnContainer}>
                    <Button
                      loader={isSubmitting}
                      textStyle={{ marginHorizontal: RFValue(45) }}
                      onPress={handleSubmit}
                      style={styles.centerItm}
                      buttonText={appTranslations.BTN_LOGIN}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
          <Button
            style={styles.btnContainer2} onPress={() => {
              navigation.navigate('Signup');
            }}
            buttonText={appTranslations.BTN_CREATE_AN_ACCOUNT} />
          <View>
            <Text style={[FontStyle.Nunito12, styles.centerItm, styles.mb8, { color: colors.Blue_2 }]} onPress={() => {
              Linking.openURL('https://privacy-policy_URL');
            }}>{appTranslations.PRIVACY_POLICY}</Text>
            <Text style={[FontStyle.Nunito12, styles.centerItm, { color: colors.Blue_2 }]} >{appTranslations.FOLLOW_US_ON_SOCIAL_MEDIA}</Text>

            <View style={styles.socialConatiner}>

              <Pressable onPress={() => {
                Linking.openURL('https://www.facebook.com/profile.php?id=100086461717566');
              }} style={styles.fbIcon}>
                <Icon
                  name={'facebook'}
                  size={RFValue(20)}
                  color={colors.Blue_2}
                />
                <Text style={[FontStyle.Nunito12, { color: colors.Blue_2 }]}>{appTranslations.FB_SOCIAL_MEDIA_NAME}</Text>
              </Pressable >
              <Pressable onPress={() => {
                Linking.openURL('https://www.instagram.com/nikshaysetu/');
              }} style={styles.socialConatiner}><Icon
                  name={'instagram'}
                  size={RFValue(20)}
                  color={colors.Blue_2}
                />
                <Text style={[FontStyle.Nunito12, { color: colors.Blue_2 }]}>{appTranslations.INSTA_SOCIAL_MEDIA_NAME}</Text>
              </Pressable >
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,

  },
  LogoContainer: {
    // flex: 2,
    height: Dimension.height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: RFValue(171),
    // marginBottom: RFValue(24),
  },

  ForgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -RFValue(10),
  },
  subContainer: {
    padding: RFValue(20),
    margin: RFValue(25),
    borderRadius: RFValue(5),
  },
  headerTxt: {
    marginBottom: RFValue(15),
  },
  btnContainer: {
    marginBottom: RFValue(24),
    marginTop: RFValue(20),
  },
  btnContainer2: {
    alignSelf: 'center',
    marginBottom: RFValue(20),
  }, socialConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(12),
  }, fbIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  }, centerItm: {
    alignSelf: 'center',
  },
  mb8: { marginBottom: RFValue(8) },

});
