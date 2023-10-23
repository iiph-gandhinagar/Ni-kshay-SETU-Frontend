import { useTheme } from '@react-navigation/native';
import { changePassword } from '@tb-frontend/shared/Store/action/authActions';
import { Formik } from 'formik';
import React from 'react';
import {
  Alert, Dimensions, KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FormInput } from '../../components/core/input';
import { LogoContainer } from '../../components/LogoContainer';
import { appConfigTypes, themeProps } from '../../types';
const Dimension = Dimensions.get('window');
export default function ChangePassword(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
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
    old_password: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(6, appTranslations.VALIDATION_PASSWORD)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations.VALIDATION_PASSWORD_MATCH,
      ),
    new_password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
        appTranslations?.VALIDATION_PASSWORD_MATCH,
      )
      .min(6)
      .required(appTranslations?.REQUIRED),
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
      keyboardVerticalOffset={20}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.HEADER_CHANGE_PASS}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
      <LogoContainer />
        <View style={[styles.subConatiner, { backgroundColor: colors.Light_blue }]}>
          <Formik
            initialValues={{
              phone_no: '',
              old_password: '',
              new_password: '',
              confirm_password: '',
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values, actions) => {
              console.log('onSubmit', values);
              const ChangePasswordCallback = response => {
                console.log('ChangePasswordCallback', response);
                if (response?.code == 200) {
                  Alert.alert('Success', response?.data, [
                    {
                      text: 'OK',
                      onPress: () => {
                        actions.resetForm();
                        // navigation.navigate('Home');
                      },
                    },
                  ]);
                } else {
                  Alert.alert('Error!', response?.data);
                }

                actions.setSubmitting(false);
              };
              dispatch(changePassword(values, ChangePasswordCallback));
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
              <>
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
                />

                <FormInput
                  maxLength={10}
                  placeholder={appTranslations.PLACEHOLDER_OLD_PASSWORD}
                  Icon={'Lock'}
                  value={values.old_password}
                  onChangeText={handleChange('old_password')}
                  onBlur={handleBlur('old_password')}
                  errors={errors.old_password}
                  touched={touched.old_password}
                  secureTextEntry={true}
                  showPasswordBtn={
                    values.old_password.length > 0 ? true : false
                  }
                />
                <FormInput
                  maxLength={10}
                  placeholder={appTranslations.PLACEHOLDER_NEW_PASSWORD}
                  Icon={'Lock'}
                  value={values.new_password}
                  onChangeText={handleChange('new_password')}
                  onBlur={handleBlur('new_password')}
                  errors={errors.new_password}
                  touched={touched.new_password}
                  secureTextEntry={true}
                  showPasswordBtn={
                    values.new_password.length > 0 ? true : false
                  }
                />
                <FormInput
                  maxLength={10}
                  placeholder={appTranslations.PLACEHOLDER_CONFIRM_PASSWORD}
                  Icon={'Lock'}
                  value={values.confirm_password}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  errors={errors.confirm_password}
                  touched={touched.confirm_password}
                  secureTextEntry={true}
                  showPasswordBtn={
                    values.confirm_password.length > 0 ? true : false
                  }
                />
                <View>
                  <Button
                    style={{ alignSelf: 'center' }}
                    loader={isSubmitting}
                    onPress={handleSubmit}
                    buttonText={appTranslations.ACCOUNT_CHANGE_PASSWORD}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    maxHeight: Dimension.height,
  },
  LogoContainer: {
    height: Dimension.height / 3,
    maxHeight: Dimension.height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(24),
    marginBottom: RFValue(24),
  },
  subConatiner: {
    padding: RFValue(20),
    margin: RFValue(25),
    marginBottom:RFValue(130),
    borderRadius: RFValue(5),
  },

});
