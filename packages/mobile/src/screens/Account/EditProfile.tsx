import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import {
  clearBlock,
  clearCadre,
  clearDistrict,
  clearHelth,
  getAllCadre,
  getAllCadreType,
  getAllState,
  getBlockByDistrict,
  getDistrictByState,
  getHealthByBlock, getUserData, updateUserData,
} from '@tb-frontend/shared/Store/action/usersActions';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform, ScrollView,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FormInput, FormPicker } from '../../components/core/input';
import { appConfigTypes, themeProps } from '../../types';
const Dimension = Dimensions.get('window');
export default function EditProfile(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const state = useSelector(state => state?.user?.State);
  const district = useSelector(state => state?.user?.allDistricts);
  const block = useSelector(state => state?.user?.allBlocks);
  const cadre = useSelector(state => state?.user?.allCadres);
  const cadreType = useSelector(state => state?.user?.allCadresType);
  const health = useSelector(state => state?.user?.allHealths);
  const userDetails = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(3, appTranslations.VALIDATION_FULL_NAME),
    cadre_type: Yup.string().required(
      appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE,
    ),
    cadre_id: Yup.number()
      .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
      .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    state_id: Yup.number().when('cadre_type', {
      is: cadre_type => {
        if (
          cadre_type === 'State_Level' ||
          cadre_type === 'District_Level' ||
          cadre_type === 'Block_Level' ||
          cadre_type === 'Health-facility_Level'
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_STATE),
    }),
    district_id: Yup.number().when('cadre_type', {
      is: cadre_type => {
        if (
          cadre_type === 'District_Level' ||
          cadre_type === 'Block_Level' ||
          cadre_type === 'Health-facility_Level'
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.UNSELECTED_DROPDOWN_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
    block_id: Yup.number().when('cadre_type', {
      is: cadre_type => {
        if (
          cadre_type === 'Block_Level' ||
          cadre_type === 'Health-facility_Level'
        ) {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.DROPDOWN_SELECT_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
    health_facility_id: Yup.number().when('cadre_type', {
      is: cadre_type => {
        if (cadre_type === 'Health-facility_Level') {
          return true;
        } else {
          return false;
        }
      },
      then: Yup.number()
        .required(appTranslations.DROPDOWN_SELECT_CADRE_TYPE)
        .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_CADRE),
    }),
  });
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  useEffect(() => {
    if (userDetails?.[0]) {
      try {
        dispatch(getAllState());
        dispatch(getAllCadreType());
        if (userDetails?.[0]?.cadre_id > 0) {
          dispatch(getAllCadre(userDetails[0]?.cadre_type));
        }
        if (userDetails?.[0]?.district_id > 0) {
          dispatch(getDistrictByState(parseInt(userDetails[0]?.state_id)));
        }
        if (userDetails?.[0]?.block_id > 0) {
          dispatch(getBlockByDistrict(parseInt(userDetails[0]?.district_id)));
        }
        if (userDetails?.[0]?.health_facility_id > 0) {
          dispatch(getHealthByBlock(parseInt(userDetails[0]?.block_id)));
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  }, [userDetails]);
  // console.log('userDetails', userDetails[0]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        backArrow={true}
        noDrawer={true}
        headerTitle={appTranslations.EDIT_PERSONAL_DETAILES}
      />
      <ScrollView
        contentContainerStyle={{ backgroundColor: colors.background }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* <SafeAreaView style={styles.Container}> */}

        <View style={[styles.FormContainer, { backgroundColor: colors.background }]}>
          {userDetails[0]?.cadre_type && (
            <Formik
              initialValues={{
                name: userDetails[0]?.name,
                cadre_type: userDetails[0]?.cadre_type,
                cadre_id: userDetails[0]?.cadre_id,
                country_id: userDetails[0]?.country_id,
                state_id: userDetails[0]?.state_id,
                district_id: userDetails[0]?.district_id,
                block_id: userDetails[0]?.block_id,
                health_facility_id: userDetails[0]?.health_facility_id,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => {
                const updateCallback = async response => {
                  console.log('onSubmit', response);
                  actions.setSubmitting(false);
                  if (response?.code == 200) {
                    Alert.alert('Success !', response?.data, [
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(getUserData());
                          actions.resetForm();
                          navigation.dispatch(StackActions.popToTop());
                        },
                      },
                    ]);
                  } else {
                    if (response?.data?.phone_no?.[0]) {
                      Alert.alert('Error!', response?.data?.phone_no?.[0]);
                    } else {
                      Alert.alert('Error!', response?.data);
                    }
                  }
                };
                let body = new FormData();
                body.append('name', values.name);
                body.append('cadre_type', values.cadre_type);
                body.append('country_id', values.country_id);
                body.append('cadre_id', values.cadre_id);
                body.append('state_id', values.state_id);
                body.append('district_id', values.district_id);
                body.append('block_id', values.block_id);
                body.append('health_facility_id', values.health_facility_id);
                dispatch(updateUserData(body, updateCallback));
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
                handleBlur,
                isSubmitting,
                /* and other goodies */
              }) => {
                handleChange = (name, value) => {
                  if (name === 'cadre_type' && values.cadre_type !== value) {
                    dispatch(clearCadre());
                    dispatch(clearDistrict());
                    dispatch(clearBlock());
                    dispatch(clearHelth());
                    setFieldValue('cadre_type', value);
                    setFieldValue('cadre_id', 0);
                    setFieldValue('state_id', 0);
                    setFieldValue('district_id', 0);
                    setFieldValue('block_id', 0);
                    setFieldValue('health_facility_id', 0);
                    if (value === 'National_Level') {
                      setFieldValue('country_id', 1);
                    } else {
                      setFieldValue('country_id', 0);
                    }
                    dispatch(getAllCadre(value));
                  } else if (
                    name === 'cadre_id' &&
                    values.cadre_id !== parseInt(value)
                  ) {
                    // console.log('in handleChange cadre_id ', name, value);
                    setFieldValue('cadre_id', parseInt(value));
                  } else if (
                    name === 'state_id' &&
                    values.state_id !== parseInt(value)
                  ) {
                    dispatch(clearDistrict());
                    dispatch(clearBlock());
                    dispatch(clearHelth());
                    setFieldValue('district_id', 0);
                    setFieldValue('block_id', 0);
                    setFieldValue('health_facility_id', 0);
                    // console.log('in handleChange state_id ', name, value);
                    setFieldValue('state_id', parseInt(value));
                    dispatch(getDistrictByState(parseInt(value)));
                  } else if (
                    name === 'district_id' &&
                    values.district_id !== parseInt(value)
                  ) {
                    dispatch(clearBlock());
                    dispatch(clearHelth());
                    setFieldValue('block_id', 0);
                    setFieldValue('health_facility_id', 0);
                    // console.log('in handleChange district_id ', name, value);
                    setFieldValue('district_id', parseInt(value));
                    dispatch(getBlockByDistrict(parseInt(value)));
                  } else if (
                    name === 'block_id' &&
                    values.block_id !== parseInt(value)
                  ) {
                    dispatch(clearHelth());
                    setFieldValue('health_facility_id', 0);
                    // console.log('in handleChange block_id ', name, value);
                    setFieldValue('block_id', parseInt(value));
                    dispatch(getHealthByBlock(parseInt(value)));
                  } else if (
                    name === 'health_facility_id' &&
                    values.health_facility_id !== parseInt(value)
                  ) {
                    // console.log('in handleChange health_facility_id ', name, value);
                    setFieldValue('health_facility_id', parseInt(value));
                  } else {
                    // console.log('in handleChange else ', name, value);
                    setFieldValue(name, value);
                  }
                };
                return (
                  <>
                    <FormInput
                      placeholder={appTranslations.PLACEHOLDER_FULL_NAME}
                      value={values.name}
                      onChangeText={text => handleChange('name', text)}
                      onBlur={handleBlur('name')}
                      errors={errors.name}
                      touched={touched.name}
                      header={appTranslations.PLACEHOLDER_NAME}
                    />
                    <FormInput
                      placeholder={appTranslations.HEADER_MOBILE_NO}
                      value={values.name}
                      onChangeText={text => handleChange('name', text)}
                      onBlur={handleBlur('name')}
                      errors={errors.name}
                      touched={touched.name}
                      header={appTranslations.HEADER_MOBILE_NO}
                      editable={false}
                      placeholder={appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                      Icon={'Phone'}
                      value={userDetails[0]?.phone_no}
                    />
                    <FormPicker
                      header={appTranslations.CADER_TYPE}
                      label={appTranslations.HEALTH_FACILITY_LVL}
                      options={cadreType?.map((data, id) => {
                        return {
                          id: id,
                          name: data?.cadre_type.replace('_', ' '),
                          value: data?.cadre_type,
                        };
                      })}
                      value={values.cadre_type}
                      onChangeValue={value => handleChange('cadre_type', value)}
                      // onBlur={handleBlur('cadre_type')}
                      onBlur={() => handleBlur('cadre_type')}
                      errors={errors.cadre_type}
                      touched={touched.cadre_type}
                    />
                    <FormPicker
                      header={appTranslations.CADER}
                      label={appTranslations.DROPDOWN_SELECT_CADRE_TYPE}
                      Icon={'Layers'}
                      options={cadre?.map(data => {
                        return {
                          id: data?.id,
                          name: data?.title,
                          value: data?.id,
                        };
                      })}
                      value={values.cadre_id}
                      onChangeValue={value => handleChange('cadre_id', value)}
                      // onBlur={handleBlur('cadre_id')}
                      onBlur={() => handleBlur('cadre_id')}
                      errors={errors.cadre_id}
                      touched={touched.cadre_id}
                    />
                    {(values.cadre_type === 'State_Level' ||
                      values.cadre_type === 'District_Level' ||
                      values.cadre_type === 'Block_Level' ||
                      values.cadre_type === 'Health-facility_Level') && (
                        <FormPicker
                          header={appTranslations.HEADER_STATE}
                          label={appTranslations.DROPDOWN_SELECT_STATE}
                          Icon={'MapPin'}
                          options={state?.map(data => {
                            return {
                              id: data?.id,
                              name: data?.title,
                              value: data?.id,
                            };
                          })}
                          value={parseInt(values.state_id)}
                          onChangeValue={value => handleChange('state_id', value)}
                          // onBlur={handleBlur('state_id')}
                          onBlur={() => handleBlur('state_id')}
                          errors={errors.state_id}
                          touched={touched.state_id}
                        />
                      )}
                    {(values.cadre_type === 'District_Level' ||
                      values.cadre_type === 'Block_Level' ||
                      values.cadre_type === 'Health-facility_Level') && (
                        <FormPicker
                          header={appTranslations.DISTRICT}
                          label={appTranslations.DROPDOWN_SELECT_DISTRICT}
                          Icon={'MapPin'}
                          options={district.map(data => {
                            return {
                              id: data?.id,
                              name: data?.title,
                              value: data?.id,
                            };
                          })}
                          value={values.district_id}
                          onChangeValue={value =>
                            handleChange('district_id', value)
                          }
                          // onBlur={handleBlur('district_id')}
                          onBlur={() => handleBlur('district_id')}
                          errors={errors.district_id}
                          touched={touched.district_id}
                        />
                      )}
                    {(values.cadre_type === 'Block_Level' ||
                      values.cadre_type === 'Health-facility_Level') && (
                        <FormPicker
                          header={'TU'}
                          label={appTranslations.DROPDOWN_SELECT_TU}
                          Icon={'MapPin'}
                          options={block.map(data => {
                            return {
                              id: data?.id,
                              name: data?.title,
                              value: data?.id,
                            };
                          })}
                          value={values.block_id}
                          onChangeValue={value => handleChange('block_id', value)}
                          // onBlur={handleBlur('block_id')}
                          onBlur={() => handleBlur('block_id')}
                          errors={errors.block_id}
                          touched={touched.block_id}
                        />
                      )}
                    {values.cadre_type === 'Health-facility_Level' && (
                      <FormPicker
                        header={appTranslations.HEALTH_FACILITY}
                        label={appTranslations.DROPDOWN_SELECT_HEALTHFACILITY}
                        Icon={'MapPin'}
                        options={health?.map(data => {
                          return {
                            id: data?.id,
                            name: data?.health_facility_code,
                            value: data?.id,
                          };
                        })}
                        value={values.health_facility_id}
                        touched={touched.health_facility_id}
                        onChangeValue={value =>
                          handleChange('health_facility_id', value)}
                        // onBlur={handleBlur('health_facility_id')}
                        onBlur={() => handleBlur('health_facility_id')}
                        errors={errors.health_facility_id}
                      />
                    )}
                    <View
                      style={{
                        alignItems: 'center',
                        marginBottom: RFValue(20),
                      }}>
                      <Button
                        loader={isSubmitting}
                        onPress={handleSubmit}
                        buttonText={appTranslations.UPDATE_DETAILS}
                      />
                    </View>
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
    flex: 1,
    maxHeight: Dimension.height,
  },
  FormContainer: {
    paddingVertical: RFValue(32),
    paddingHorizontal: RFValue(24),
  },
});
