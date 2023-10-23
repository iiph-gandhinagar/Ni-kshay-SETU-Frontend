import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import React from 'react';
import { verifiedForgotPasswordOtp } from '@tb-frontend/shared/Store/action/authActions';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform, ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { FormInput } from '../../components/core/input';
import { LogoContainer } from '../../components/LogoContainer';
import { FontStyle } from '../../config/FontStyle';
import { themeProps, appConfigTypes } from '../../types';

const Dimension = Dimensions.get('window');

export default function VerifyOtpPassword(props): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const dispatch = useDispatch();
  const token = props?.route?.params?.token;
  const mobileNo = props?.route?.params?.mobileNo;

  const ChangePasswordSchema = Yup.object().shape({
    otp: Yup.string().required(appTranslations.REQUIRED),
    new_password: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(6, appTranslations.VALIDATION_PASSWORD)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations.VALIDATION_PASSWORD_MATCH,
      ),

    confirm_password: Yup.string()
      .required(appTranslations.REQUIRED)
      .oneOf(
        [Yup.ref('new_password'), null],
        appTranslations.VALIDATION_CONFIRM_PASSWORD,
      ),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={40}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <LogoContainer />
        <View style={[styles.subConatiner, { backgroundColor: colors.Light_blue }]}>
          <Text style={[FontStyle.Nunito16, { color: colors.Blue_Theme }]}>
            {appTranslations.VERIFICATION_OTP_MESSAGE_ONE}{' '}
            {mobileNo?.substr(0, 6)?.replace(new RegExp('[0-9]', 'g'), 'X')}
            {mobileNo?.substr(6)}{' '}{appTranslations.VERIFICATION_OTP_MESSAGE_TWO}
          </Text>
          <Formik
            initialValues={{
              otp: '',
              new_password: '',
              confirm_password: '',
              temp_token: token,
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, actions) => {
              console.log('onSubmit', values);
              const Callback = response => {
                console.log('VerifyOtpPassword Callback', response);
                if (response?.code == 200) {
                  Alert.alert('Success', response?.data, [
                    {
                      text: 'OK',
                      onPress: () => {
                        actions.resetForm();
                        navigation.dispatch(StackActions.popToTop());
                      },
                    },
                  ]);
                } else {
                  Alert.alert('Error!', response?.data);
                }

                actions.setSubmitting(false);
              };
              dispatch(verifiedForgotPasswordOtp(values, Callback));
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
                  <OTPInputView
                    style={{ flex: 1 }}
                    pinCount={6}
                    code={values.otp}
                    onCodeChanged={handleChange('otp')}
                    autoFocusOnLoad
                    codeInputFieldStyle={[styles.underlineStyleBase, { color: colors.black, borderColor: colors.black }]}
                    codeInputHighlightStyle={{ color: colors.Blue_Theme }} />
                  <FormInput
                    maxLength={10}
                    placeholder={appTranslations.PLACEHOLDER_NEW_PASSWORD}
                    value={values.new_password}
                    onChangeText={handleChange('new_password')}
                    onBlur={handleBlur('new_password')}
                    errors={errors.new_password}
                    touched={touched.new_password}
                    secureTextEntry={true}
                    showPasswordBtn={values.new_password.length > 0 ? true : false}
                    showLeftIcon={true}
                    MaterialLeftIcon={'lock'} header={''} />
                  <FormInput
                    maxLength={10}
                    placeholder={appTranslations.PLACEHOLDER_CONFIRM_PASSWORD}
                    value={values.confirm_password}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    errors={errors.confirm_password}
                    touched={touched.confirm_password}
                    secureTextEntry={true}
                    showPasswordBtn={values.confirm_password.length > 0 ? true : false}
                    showLeftIcon={true}
                    MaterialLeftIcon={'lock'} header={''} />

                  <View style={styles.btnConatiner}>
                    <Button
                      loader={isSubmitting}
                      onPress={handleSubmit}
                      style={{ alignSelf: 'center' }}
                      buttonText={appTranslations.ACCOUNT_CHANGE_PASSWORD}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  subConatiner: {
    padding: RFValue(20),
    margin: RFValue(25),
    borderRadius: RFValue(5),
  },
  btnConatiner: {
    marginBottom: RFValue(24),
    marginTop: RFValue(20),
  },
  underlineStyleBase: {
    width: RFValue(35),
    height: RFValue(45),
    borderWidth: 0,
    borderRadius: RFValue(5),
    padding: RFValue(10),
    marginVertical: RFValue(30),
    borderBottomWidth: 1,
  },
});
