/** @jsxImportSource theme-ui */
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
import { handleLogin, setUserToken } from '@tb-frontend/shared/Store/action/authActions';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Box, Button, Container, Flex, Input, Text } from 'theme-ui';
import * as Yup from 'yup';
import TitleTag from '../components/TitleTag';
import { mixpanel } from '../MainApp';

const Login = (props) => {
  const [error, setError] = useState("");
  const history = useHistory()
  const dispatch = useDispatch();
  console.log("props", props);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const SignupSchema = Yup.object().shape({
    phone_no: Yup.string()
      .required(appTranslations?.REQUIRED)
      .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, appTranslations?.VALIDATION_PHONE_NO),
    password: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, appTranslations?.VALIDATION_PASSWORD_MATCH)
      .min(6)
      .required(appTranslations?.REQUIRED),
  });
  return (
    <>
      <TitleTag title={"Login"} />
      <section sx={{ variant: 'layout.Section' }}>
        <Container>
          <Flex sx={{
            justifyContent: 'center',
            py: '70px',
          }}>
            <Box bg="LightBlue" p={4} variant="Card">

              <div sx={{
                marginBottom: 5,
              }}>
                <Text
                  sx={{
                    fontSize: [4, 5],
                    fontFamily: 'body',
                    fontWeight: 500,
                    color: "Blue_Theme"
                  }}>Welcome!
                </Text>
              </div>

              <Formik
                initialValues={{
                  phone_no: '',
                  password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={
                  (values) => {
                    const loginCallback = async (response) => {
                      if (response?.code === 401) {
                        var r = window.confirm('Unauthorized !\n' + response?.data?.message);
                        if (r == true) {
                          Cookies.set('V-uid', response?.data?.api_token)
                          props?.history.push(`/VerifyMobileNumber?uid=${response?.data?.api_token}&&number=${values.phone_no}`)
                        } else {
                          return null;
                        }
                      }
                      else if (response?.code == 200 && response.status) {
                        await Cookies.set('token', response?.data?.api_token, { expires: 7 })
                        mixpanel.track('user_Login');
                        dispatch(storeUserActivity('user_Login'));
                        dispatch(setUserToken(response?.data?.api_token))
                        props?.history?.push('/');
                        window.location?.reload();
                      } else {
                        // Alert.alert('Error!', response?.data);
                        setError(response?.data)
                      }
                    }
                    setError('')
                    loginCallback({
                      "status": true,
                      "data": {
                        "api_token": "uWcD68WsNv2xJkcWRrlOwqVFaWqaShnTlA2R0rrW7MVLxyo0VUdL8AW8DWyW",
                        "id": 1
                      },
                      "code": 200
                    })
                    // please opne swhile Api 
                    // dispatch(handleLogin(values, loginCallback))
                  }}
              >
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
                    <div sx={{ position: "relative", mb: 7 }}>
                      <img src={"../images/phone.svg"} alt="phone" sx={{ position: "absolute", top: 10, left: "15px" }} />
                      <Input placeholder="Mobile Number" sx={{ mb: 0 }}
                        // type="number"
                        // autoFocus={true}
                        inputMode='numeric'
                        name="phone_no"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone_no} />
                      <span className='text-danger'>
                        {errors.phone_no && touched.phone_no && errors.phone_no}
                      </span>

                    </div>

                    <div sx={{ position: "relative", }}>
                      <img src={"../images/lock.svg"} alt="lock" sx={{ position: "absolute", top: 10, left: "15px" }} />
                      <Input placeholder="Password" sx={{ mb: 0 }} type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => {
                          if (e.code === 'Enter') {
                            handleSubmit()
                          }
                        }}
                        value={values.password} />
                      <span className='text-danger'>
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <span className='text-danger'>
                        {error}
                      </span>
                    </div>

                    <div className="text-end" sx={{
                      marginBottom: 6,
                    }}>
                      <NavLink to="/ForgotPassword" sx={{ textDecorationLine: 'none' }}>
                        <Text variant={"Nunito12"} color="green">
                          Forgot Password?
                        </Text>
                      </NavLink>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <Button py={10} type="submit" onClick={handleSubmit} mb={4} >Log In</Button>
                      </div>
                      <div className="col-lg-12 text-center">
                        <Button py={10} type="submit" onClick={() => history.push("/Sign-up")} >Create an account</Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Text variant={"Nunito12"} color={"Blue_2"}>
                        Follow us on social media
                      </Text>
                    </div>
                    <Flex sx={{ justifyContent: 'space-between' }}>
                      <div>
                        <img src={"../images/facebook.svg"} alt="facebook" sx={{ mr: "2px" }} />
                        <a href="https://www.facebook.com/profile.php?id=100086461717566" sx={{ textDecorationLine: 'none' }} target={'_blank'}>
                          <Text variant={"Nunito12"} color={"Blue_2"}>
                            Ni-kshay.Setu
                          </Text>
                        </a>
                      </div>
                      <div>
                        <img src={"../images/instagram.svg"} alt="instagram" sx={{ mr: "2px" }} />
                        <a href="https://www.instagram.com/nikshaysetu/" sx={{ textDecorationLine: 'none' }} target={'_blank'}>
                          <Text variant={"Nunito12"} color={"Blue_2"}>
                            Ni-kshay.Setu
                          </Text>
                        </a>
                      </div>
                    </Flex>
                  </>
                )}
              </Formik>
            </Box>
          </Flex>
        </Container>
      </section>
    </>
  );
}
export default Login;
