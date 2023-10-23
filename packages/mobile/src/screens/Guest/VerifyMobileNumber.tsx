import { useNavigation, useTheme } from '@react-navigation/native';
import {
  generateOtp,
  verifiedOtp,
} from '@tb-frontend/shared/Store/action/appActions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions, KeyboardAvoidingView,
  Platform, Pressable, ScrollView,
  StyleSheet,
  Text, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../components/context';
import { Button } from '../../components/core/Button';
import { LogoContainer } from '../../components/LogoContainer';
import { FontStyle } from '../../config/FontStyle';
import { storeDataToAsyncStorage } from '../../functions';
import { appConfigTypes, themeProps } from '../../types';

const Dimension = Dimensions.get('window');

export default function VerifyMobileNumber(props): JSX.Element {
  const [otp, setOTP] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const dispatch = useDispatch();
  const token = props?.route?.params?.token;
  useEffect(() => {
    dispatch(generateOtp(token));
  }, []);
  const mobileNo = props?.route?.params?.mobileNo;
  const { colors } = useTheme() as unknown as themeProps;
  const callBack = res => {
    console.log('callBack res', res);
    if (res?.code == 200) {
      Alert.alert('Success!!', 'Registered Successfully!!', [
        {
          text: 'OK',
          onPress: () => {
            signIn(token);
            storeDataToAsyncStorage('_token', token);
          },
        },
      ]);
    }
  };
  const verify = () => {
    dispatch(
      verifiedOtp(
        {
          otp: otp,
          token: token,
        },
        callBack,
      ),
    );
  };
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
            {appTranslations.VERIFICATION_OTP_MESSAGE_ONE}{' '} {mobileNo?.substr(0, 6)?.replace(new RegExp('[0-9]', 'g'), 'X')}
            {mobileNo?.substr(6)}{' '}
            {appTranslations.VERIFICATION_OTP_MESSAGE_TWO}</Text>
          <OTPInputView
            style={{ flex: 1 }}
            pinCount={6}
            code={otp}
            onCodeChanged={text => setOTP(text)}
            autoFocusOnLoad
            codeInputFieldStyle={[styles.underlineStyleBase, { color: colors.black, borderColor: colors.black }]}
            codeInputHighlightStyle={{ color: colors.Blue_Theme }}
            onCodeFilled={(code) => { verify(); }} />
          <View style={{ marginBottom: RFValue(24) }}>
            <Button
              disabled={otp.length != 6 ? true : false}
              onPress={() => {
                verify();
              }}
              buttonText={appTranslations.BTN_VERIFY}
            />
          </View>

          <Pressable
            disabled={true}
            onPress={() => {
              dispatch(generateOtp(token));
            }}>
            <Text style={styles.ResendOTP}>{appTranslations.LINK_RESEND_OTP}</Text>
          </Pressable>
          <Pressable
            disabled={true}
            style={styles.ChangeMobileNumber}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: RFValue(14),
                color: colors.lightBlue3,
              }}>
              {appTranslations.LINK_CHANGE_MOBILE_NUMBER}
            </Text>
          </Pressable>
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
  ResendOTP: {
    fontSize: RFValue(14),
    textAlign: 'center',
    marginBottom: RFValue(24),
  },
  ChangeMobileNumber: {
    marginBottom: RFValue(24),
    alignSelf: 'center',
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
