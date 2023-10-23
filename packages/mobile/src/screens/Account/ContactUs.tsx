import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import { contactUs } from '@tb-frontend/shared/Store/action/authActions';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import React from 'react';
import {
  Alert, KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FormInput, FormPicker } from '../../components/core/input';
import { LogoContainer } from '../../components/LogoContainer';
import { appConfigTypes, themeProps } from '../../types';
export default function ContactUs(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const userDetails = useSelector(state => state?.user?.userData);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.HEADER_CONTACT_US}
      />
      <ScrollView showsVerticalScrollIndicator={false} >
        <LogoContainer />
        <View style={[styles.subConatiner, { backgroundColor: colors.Light_blue }]}>
          {userDetails?.length > 0 && (
            <Formik
              initialValues={{
                phone: userDetails[0]?.phone_no,
                name: userDetails[0]?.name,
                subject: '',
                message: '',
                email: '',
              }}
              validationSchema={Yup.object().shape({
                message: Yup.string()
                  .min(4, appTranslations.VALIDATION_CHARACTER)
                  .required(appTranslations.REQUIRED),
                subject: Yup.string()
                  // .min(4, appTranslations.VALIDATION_CHARACTER)
                  .required(appTranslations.REQUIRED),
                email: Yup.string()
                  .required('Required')
                  .matches(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
                    appTranslations.TEXT_INVALID_EMAIL,
                  ),
              })}
              onSubmit={(values, actions) => {
                console.log('onSubmit', values);
                const ContactUsCallback = response => {
                  console.log('ContactUsCallback', response);
                  if (response?.code == 200) {
                    Toast.show({
                      type: 'success',
                      text1: "Success!!",
                      text2: response?.data,
                      onHide() {
                        actions.resetForm();
                        navigation.dispatch(StackActions.popToTop())
                      },
                      onPress() {
                        actions.resetForm();
                        navigation.dispatch(StackActions.popToTop())
                      },
                    });

                  } else {
                    Toast.show({
                      type: 'error',
                      text1: "Error!!",
                      text2: response?.response?.data?.data,
                    });
                  }

                  actions.setSubmitting(false);
                };
                dispatch(contactUs(values, ContactUsCallback));
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                /* and other goodies */
              }) => {
                // console.log('errors', values);

                return (
                  <>
                    <FormPicker
                      header={appTranslations.PLACEHOLDER_SUBJECT}
                      Icon={'file'}
                      ShowHeader={false}
                      label={appTranslations.PLACEHOLDER_SUBJECT}
                      options={appTranslations?.CONTACT_US_SUBJECTS?.split(
                        ','
                      )?.map((data, id) => {
                        return {
                          id: id,
                          name: data,
                          value: data,
                        };
                      })}
                      value={values.subject}
                      onChangeValue={newVal => setFieldValue('subject', newVal)}
                      onBlur={() => handleBlur('subject')}
                      errors={errors.subject}
                      touched={touched.subject} />
                    <FormInput
                      placeholder={appTranslations.PLACEHOLDER_EMAIL}
                      // Icon={'Chat'}
                      value={values.email}

                      onChangeText={text => setFieldValue('email', text)}
                      // onBlur={() => handleBlur('email')}
                      onBlur={handleBlur('email')}
                      errors={errors.email}
                      touched={touched.email}
                    />
                    <FormInput
                      placeholder={appTranslations.PLACEHOLDER_MESSAGE}
                      numberOfLines={5}
                      Icon={'Chat'}
                      value={values.message}
                      onChangeText={text => setFieldValue('message', text)}
                      // onBlur={() => handleBlur('message')}
                      onBlur={handleBlur('message')}
                      errors={errors.message}
                      touched={touched.message}
                    />
                    {/* <View style={{marginBottom: RFValue(24)}}> */}
                    <Button
                      style={{ alignSelf: 'center' }}
                      loader={isSubmitting}
                      onPress={handleSubmit}
                      buttonText={appTranslations.BTN_CONTACT_US}
                    />
                    {/* </View> */}
                  </>
                );
              }}
            </Formik>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  FormContainer: {
    // minHeight: Dimension.height - (RFValue(110) + Dimension.height / 3),
    padding: RFValue(24),
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  subConatiner: { padding: RFValue(20), margin: RFValue(25), borderRadius: RFValue(5) },
});
