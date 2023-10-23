import { useNavigation, useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { forgotPassword } from '@tb-frontend/shared/Store/action/authActions';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform, ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FormInput } from '../../components/core/input';
import { LogoContainer } from '../../components/LogoContainer';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';

const Dimension = Dimensions.get('window');

export default function ForgotPassword(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const ChangePasswordSchema = Yup.object().shape({
    phone_no: Yup.string()
      .required(appTranslations.REQUIRED)
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        appTranslations.VALIDATION_MOBILE_NUMBER,
      ),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={40}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header headerTitle={appTranslations.HEADER_PASSWORD} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.LogoContainer}>
          <LogoContainer />
        </View>

        <View style={[styles.SubContainer, { backgroundColor: colors.Light_blue }]}>
          <Text style={[FontStyle.Heading4, styles.HeaderTxt, { color: colors.Blue_Theme }]}>{appTranslations.LINK_FORGOT_PASSWORD}</Text>
          <Formik
            initialValues={{
              phone_no: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, actions) => {
              console.log('onSubmit', values);
              const Callback = response => {
                console.log('forgot Password Callback', response);
                if (response?.code == 200) {
                  navigation.navigate('VerifyOtpPassword', {
                    token: response?.data,
                    mobileNo: values.phone_no,
                  });
                } else {
                  Alert.alert('Error!', response?.data);
                }
                actions.setSubmitting(false);
              };
              dispatch(forgotPassword(values, Callback));
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FormInput
                  maxLength={10}
                  keyboardType="phone-pad"
                  placeholder={appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                  Icon={'Phone'}
                  value={values.phone_no}
                  onChangeText={handleChange('phone_no')}
                  onBlur={handleBlur('phone_no')}
                  errors={errors.phone_no}
                  touched={touched.phone_no}
                  showLeftIcon={true}
                  MaterialLeftIcon={'phone'}
                  header={''} />
                <View style={styles.btn}>
                  <Button
                    loader={isSubmitting}
                    onPress={handleSubmit}
                    style={{ alignSelf: 'center' }}
                    buttonText={appTranslations.BTN_GET_OTP}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,

  }, SubContainer: {
    padding: RFValue(20),
    margin: RFValue(25),
    borderRadius: RFValue(5),
    marginTop: RFValue(50),
  },
  LogoContainer: {
    marginTop: RFValue(20),
  },
  HeaderTxt: {
    marginBottom: RFValue(40),
  },
  ForgotPassword: { alignSelf: 'flex-end', marginTop: -RFValue(20) },

  btn: { marginBottom: RFValue(24), marginTop: RFValue(20) },
});
