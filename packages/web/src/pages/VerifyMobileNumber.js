/** @jsxImportSource theme-ui */
import { generateOtp, storeUserActivity, verifiedOtp } from '@tb-frontend/shared/Store/action/appActions';
import { setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useTimer } from 'react-timer-hook';
import { Box, Button, Container, Flex, Input, Text } from 'theme-ui';
import AlertModal from '../components/Modals/AlertModal';
import TitleTag from '../components/TitleTag';
import { mixpanel } from '../MainApp';
import theme from '../theme';
function padLeadingZeros(num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}
const VerifyMobileNumber = (props) => {
  const [otp, setOTP] = useState('');
  const [otpResend, setOTPResend] = useState(false);
  const [model, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(
    new Date().setSeconds(
      new Date().getSeconds() + 310,
    ),
  );
  const MyTimer = ({ expiryTimestamp }) => {
    const {
      seconds,
      minutes,
      hours,
    } = useTimer({
      expiryTimestamp, onExpire: () => {
        setOTPResend(true);
      }
    });
    return (
      <div>
        <Text sx={{
          fontSize: 1, color: theme.colors.error, lineHeight: "heading", fontWeight: "heading", ml: "12px",
        }}>{padLeadingZeros(hours, 2)}:{padLeadingZeros(minutes, 2)}:
          {padLeadingZeros(seconds, 2)}</Text>
      </div>
    );
  }
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const location = useLocation();
  console.log("VerifyMobileNumber props", queryString?.parse(location?.search));
  const user = queryString?.parse(location?.search);
  const dispatch = useDispatch();
  const callBack = async res => {
    console.log('callBack res', res);
    if (res?.code == 200) {
      Cookies.remove('V-uid')
      await Cookies.set('token', user?.uid, { expires: 7 });
      await dispatch(setUserToken(user?.uid));
      await dispatch(storeUserActivity('user_Login'));
      mixpanel.track('user_Login');
      props?.history?.push('/');
      window.location?.reload();
    } else {
      setTitle('Error !!');
      setMessage(res?.data)

      setModal(true)
    }
  };
  const verify = () => {
    dispatch(
      verifiedOtp(
        {
          otp: otp,
          token: user?.uid,
        },
        callBack,
      ),
    );
  };
  useEffect(() => {
    if (Cookies.get('V-uid') === user?.uid) {
      dispatch(generateOtp(user?.uid));
    } else {
      Cookies.remove('V-uid')
      props?.history?.push('/Login');
    }
  }, []);
  return (
    <>
      <TitleTag title={"Verify Mobile Number"} />
      <section sx={{ variant: 'layout.Section' }}>
        <Container>
          <Flex sx={{
            justifyContent: 'center',
          }}>

            <Box bg="LightBlue" p={4} variant="Card">
              <div sx={{
                textAlign: 'center',
                marginTop: 4,
                marginBottom: 5,
              }}>
              <Text
                sx={{
                  fontSize: [4, 5],
                  fontFamily: 'body',
                  fontWeight: 500,
                  color: "Blue_Theme"
                }}>
                  {appTranslations?.APP_SUBTITLE}
                </Text>

              </div>
              <div sx={{
                textAlign: 'center',
                paddingTop: 2,
                marginBottom: 3,
              }}>
                <Text
                  sx={{
                    fontSize: 1,
                    // fontWeight: 'bold',
                    fontFamily: 'body',
                    color: "colorDark3"
                    // textAlign: 'center',
                  }}>
                  {appTranslations?.VERIFICATION_OTP_MESSAGE_ONE}{' '}
                  <strong>
                    {user?.number?.substr(0, 6)?.replace(new RegExp('[0-9]', 'g'), 'X')}
                    {user?.number?.substr(6)}</strong> {' '}
                  {appTranslations?.VERIFICATION_OTP_MESSAGE_TWO}
                </Text>
              </div>

              <div className="row">
                <div className="col-12 col-sm-8">
                  <Input placeholder={appTranslations?.PLACEHOLDER_OTP} sx={{ padding: "15px", marginBottom: 0, height: "49px" }}
                    inputMode='numeric'
                    name="OTP"
                    autoFocus={true}
                    onKeyPress={(e) => {
                      if (e.code === 'Enter') {
                        verify()
                      }
                    }}
                    onChange={(e) => setOTP(e.target.value)}
                    value={otp}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <Button disabled={otp.length != 6 ? true : false}
                    onClick={() => {
                      verify()
                    }} px={4} py={3} sx={{
                      opacity: otp.length !== 6 ? 0.5 : 1,
                      width: [null, "100%"],
                      height: "49px"
                    }} className="mt-3 mt-sm-0">{appTranslations?.BTN_VERIFY}</Button>
                </div>
              </div>

              <div sx={{
                textAlign: 'center',
                marginTop: 5,
                marginBottom: 4,
              }}>
                <Text
                  onClick={() => {
                    if (otpResend) {
                      dispatch(generateOtp(user?.uid));
                    }
                  }}
                  sx={{
                    fontSize: 1,
                    fontWeight: 'heading',
                    fontFamily: 'body',
                    color: "primary",
                    cursor: 'pointer',
                    opacity: otpResend ? 1 : 0.5
                    // textAlign: 'center',
                    // marginLeft: 2,
                  }}>
                  {appTranslations?.LINK_RESEND_OTP}
                </Text>
                <MyTimer expiryTimestamp={time} />
              </div>
              <div sx={{
                textAlign: 'center',
                // marginTop: 5,
              }}>
                <Text className="pointer"
                  sx={{
                    fontSize: 1,
                    fontWeight: 'heading',
                    fontFamily: 'body',
                    color: "colorLight3",
                    // textAlign: 'center',
                    // marginLeft: 2,
                  }}
                  onClick={() => {
                    props?.history.goBack();
                  }}>
                  {appTranslations?.LINK_CHANGE_MOBILE_NUMBER}
                </Text>
              </div>
            </Box>
          </Flex>
        </Container>
        <AlertModal
          isOpen={model}
          Title={title}
          message={message}
          noCancle={true}
          noOK={false}
          closeModal={() => {
            setModal(false);
            setMessage('');
            setTitle('')
          }}
          onOk={() => {
            setModal(false);
            setMessage('');
            setTitle('');
          }} />
      </section>
    </>
  );
}
export default VerifyMobileNumber;