import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { registerUser } from '@tb-frontend/shared/Store/action/authActions';
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
  getHealthByBlock,
} from '@tb-frontend/shared/Store/action/usersActions';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { ImagePicker } from '../../components/core/ImagePicker';
import { FormInput, FormPicker } from '../../components/core/input';
import BottomSheetModal from '../../components/core/Modals/BottomSheet';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';

const Dimension = Dimensions.get('window');
export default function Signup(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [pickedImage, setImage] = useState('');
  const navigation = useNavigation();
  const state = useSelector(state => state?.user?.State);
  const district = useSelector(state => state?.user?.allDistricts);
  const block = useSelector(state => state?.user?.allBlocks);
  const cadre = useSelector(state => state?.user?.allCadres);
  const cadreType = useSelector(state => state?.user?.allCadresType);
  const health = useSelector(state => state?.user?.allHealths);

  const dispatch = useDispatch();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required(appTranslations.REQUIRED)
      .min(3, appTranslations.VALIDATION_FULL_NAME),

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
    try {
      dispatch(getAllState());
      dispatch(getAllCadreType());
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  const { colors } = useTheme() as unknown as themeProps;
  const checkAppPermission = () => {
    if (Platform.OS === 'android') {
      try {
        requestMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]).then(granted => {
          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] == 'granted' &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted' &&
            granted['android.permission.CAMERA'] == 'granted'
          ) {
            setIsOpen(true);
          } else {
            Alert.alert('Error', 'Permission Required', [
              {
                onPress: () => {
                  setIsOpen(false);
                  Linking.openSettings();
                },
                text: 'Ok',
              },
            ]);
          }
        });
      } catch (err) {
        setIsOpen(false);
        console.log('err', err);
      }
    }
  };
  useEffect(() => {
    if (isOpen) {
      checkAppPermission();
    }
  }, [isOpen]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={40}
      style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.HEADER_CREATE_AN_ACCOUNT}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <Pressable onPress={() => setIsOpen(true)} style={styles.imgConatiner}>
          {pickedImage ? (
            <Image
              style={[styles.img, { borderRadius: RFValue(100) }]}
              source={{
                uri: pickedImage,
              }}
            />
          ) : (
            <Image
              style={[styles.img, { borderColor: colors.Light_blue }]}
              source={require('../../assets/profileFrame.png')}
            />
          )}
          <Text style={[FontStyle.RalewayTitle, { color: colors.Grey_4, marginVertical: RFValue(5) }]}>{appTranslations.ADD_PROF_PIC}</Text>
        </Pressable>
        <View style={{ backgroundColor: colors.Light_blue, padding: RFValue(20), margin: RFValue(25), borderRadius: RFValue(5) }}>
          <Text style={[FontStyle.Heading4, { color: colors.Blue_Theme, marginBottom: RFValue(40) }]}>{appTranslations.HEADER_CREATE_ACCOUNT}</Text>
          <Formik
            initialValues={{
              name: '',
              phone_no: '',
              password: '',
              cadre_type: '',
              country_id: 0,
              cadre_id: 0,
              state_id: 0,
              district_id: 0,
              block_id: 0,
              health_facility_id: 0,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              const signupCallback = async response => {
                console.log('onSubmit', response);
                actions.setSubmitting(false);
                if (response?.code == 200 && response.status) {
                  navigation.navigate('VerifyMobileNumber', {
                    token: response?.data?.api_token,
                    mobileNo: values.phone_no,
                  });
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
              body.append('phone_no', values.phone_no);
              body.append('password', values.password);
              body.append('cadre_type', values.cadre_type);
              body.append('country_id', values.country_id);
              body.append('cadre_id', values.cadre_id);
              body.append('state_id', values.state_id);
              body.append('district_id', values.district_id);
              body.append('block_id', values.block_id);
              body.append('health_facility_id', values.health_facility_id);
              pickedImage ? body.append('profile_image', {
                uri: pickedImage,
                name: pickedImage?.split('/')[pickedImage.split('/')?.length - 1],
                filename: pickedImage?.split('/')[pickedImage.split('/')?.length - 1],
                type: 'image/png',
              }) : null;
              dispatch(registerUser(body, signupCallback));
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
                    showLeftIcon={true}
                    MaterialLeftIcon={'person'}
                  />
                  <FormInput
                    maxLength={10}
                    keyboardType="phone-pad"
                    placeholder={appTranslations.PLACEHOLDER_MOBILE_NUMBER}
                    value={values.phone_no}
                    onChangeText={no => handleChange('phone_no', no)}
                    onBlur={handleBlur('phone_no')}
                    errors={errors.phone_no}
                    touched={touched.phone_no}
                    showLeftIcon={true}
                    MaterialLeftIcon={'phone'}
                  />
                  <FormInput
                    maxLength={10}
                    placeholder={appTranslations.PLACEHOLDER_PASSWORD}
                    secureTextEntry={true}
                    showPasswordBtn
                    value={values.password}
                    onChangeText={value => handleChange('password', value)}
                    onBlur={handleBlur('password')}
                    errors={errors.password}
                    touched={touched.password}
                    showLeftIcon={true}
                    MaterialLeftIcon={'lock'}
                  />

                  <FormPicker
                    label={appTranslations.DROPDOWN_SELECT_CADRE_TYPE}
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
                    showLeftIcon={true}
                    MaterialLeftIcon={'all-inbox'}
                  />
                  <FormPicker
                    label={appTranslations.DROPDOWN_SELECT_CADRE}
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
                    showLeftIcon={true}
                    MaterialLeftIcon={'all-inbox'}
                  />

                  {(values.cadre_type === 'State_Level' ||
                    values.cadre_type === 'District_Level' ||
                    values.cadre_type === 'Block_Level' ||
                    values.cadre_type === 'Health-facility_Level') && (
                      <FormPicker
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
                        showLeftIcon={true}
                        MaterialLeftIcon={'all-inbox'}
                      />
                    )}
                  {(values.cadre_type === 'District_Level' ||
                    values.cadre_type === 'Block_Level' ||
                    values.cadre_type === 'Health-facility_Level') && (
                      <FormPicker
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
                        showLeftIcon={true}
                        MaterialLeftIcon={'all-inbox'}
                      />
                    )}
                  {(values.cadre_type === 'Block_Level' ||
                    values.cadre_type === 'Health-facility_Level') && (
                      <FormPicker
                        label={appTranslations.DROPDOWN_SELECT_TU}
                        options={block.map(data => {
                          return {
                            id: data?.id,
                            name: data?.title,
                            value: data?.id,
                          };
                        })}
                        value={values.block_id}
                        onChangeValue={value => handleChange('block_id', value)}
                        onBlur={() => handleBlur('block_id')}
                        errors={errors.block_id}
                        touched={touched.block_id}
                        showLeftIcon={true}
                        MaterialLeftIcon={'all-inbox'}
                      />
                    )}
                  {values.cadre_type === 'Health-facility_Level' && (
                    <FormPicker
                      label={appTranslations.DROPDOWN_SELECT_HEALTHFACILITY}
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
                        handleChange('health_facility_id', value)
                      }
                      onBlur={() => handleBlur('health_facility_id')}
                      errors={errors.health_facility_id}
                      showLeftIcon={true}
                      MaterialLeftIcon={'all-inbox'}
                    />
                  )}
                  <Button
                    loader={isSubmitting}
                    onPress={handleSubmit}
                    style={{ alignSelf: 'center' }}
                    buttonText={appTranslations.BTN_CREATE_MY_ACCOUNT}
                  />
                </>
              );
            }}
          </Formik>

        </View>
      </ScrollView>
      <BottomSheetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {/* <ImagePicker
          onClose={() => setIsOpen(false)}
          setPickedImage={img => setImage(img)}
        /> */}
      </BottomSheetModal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    maxHeight: Dimension.height,
  },
  imgConatiner: {
    alignItems: 'center',
    marginVertical: RFValue(20),
  },
  img: {
    height: RFValue(60),
    width: RFValue(60),
  },
});
