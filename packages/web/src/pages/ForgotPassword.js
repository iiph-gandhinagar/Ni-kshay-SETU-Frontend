/** @jsxImportSource theme-ui */
import { forgotPassword } from '@tb-frontend/shared/Store/action/authActions';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Flex, Input, Text } from 'theme-ui';
import * as Yup from 'yup';
import TitleTag from '../components/TitleTag';
const ForgotPassword = (props) => {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("props", props);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const ForgotPasswordSchema = Yup.object().shape({
    phone_no: Yup.string()
      .required(appTranslations.REQUIRED)
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        appTranslations.VALIDATION_MOBILE_NUMBER,
      ),
  });
  return (
    <>
      <TitleTag title="Forgot Password" />
      <section sx={{ variant: 'layout.Section' }}>
        <Container>
          <Flex sx={{
            justifyContent: 'center',
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
                  }}>Forgot Password
                </Text>
              </div>

              <Formik
                initialValues={{
                  phone_no: '',
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={(values, actions) => {
                  console.log('onSubmit', values);
                  const Callback = response => {
                    console.log('forgot Password Callback', response);
                    if (response?.code == 200) {
                      Cookies.set('uid', response?.data, { expires: new Date(Date.parse(new Date()) + (15 * 60 * 1000)) })
                      history.push(`/VerifyOtpPassword?uuid=${response?.data}&&number=${values.phone_no}`)
                    } else {
                      setTitle('Error');
                      setMessage(response?.data)
                      setNoCancle(false);
                      setNoOk(false);
                      setModal(true)
                    }
                    actions.setSubmitting(false);
                  };
                  dispatch(forgotPassword(values, Callback));
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
                    <div sx={{ position: "relative", mb: 65 }}>
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
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <Button py={10} type="submit" onClick={handleSubmit} >Get OTP</Button>
                      </div>
                    </div>
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
export default ForgotPassword;
