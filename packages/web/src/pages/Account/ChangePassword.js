/** @jsxImportSource theme-ui */
import { changePassword } from '@tb-frontend/shared/Store/action/authActions';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Flex, Heading, Input } from 'theme-ui';
import * as Yup from 'yup';
import AlertModal from '../../components/Modals/AlertModal';
import TitleTag from '../../components/TitleTag';
const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const [model, setModal] = useState(false);
  const [noCancle, setNoCancle] = useState(false);
  const [noOk, setNoOk] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const [redirect, setRedirect] = useState('');
  console.log("props", props);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const ChangePasswordSchema = Yup.object().shape({
    phone_no: Yup.string()
      .required(appTranslations?.REQUIRED)
      .min(10).max(10),
    old_password: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, appTranslations?.VALIDATION_PASSWORD_MATCH)
      .min(6)
      .required(appTranslations?.REQUIRED),
    new_password: Yup.string()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, appTranslations?.VALIDATION_PASSWORD_MATCH)
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
    <>
      <TitleTag title={"Change Password"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 73 }}>{appTranslations.HEADER_CHANGE_PASS}</Heading>

          <Box bg="purple_light" variant="Card" className="mx-auto" sx={{ px: 10, pt: 20, pb: 55, }}>
            <Heading variant="Heading4" sx={{ color: "Blue_Theme", mb: 35 }} className="px-2">{appTranslations.HEADER_CHANGE_PASS}</Heading>

            <Formik
              initialValues={{
                phone_no: '',
                old_password: '',
                new_password: '',
                confirm_password: '',
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={
                (values, actions) => {
                  console.log(values);
                  const ChangePasswordCallback = response => {
                    console.log('ChangePasswordCallback', response);
                    if (response?.code == 200) {
                      setTitle('Success');
                      setMessage(response?.data)
                      setNoCancle(true);
                      setNoOk(false);
                      setModal(true)
                      actions.resetForm();
                      setRedirect('/');
                    } else {
                      setTitle('Error');
                      setMessage(response?.data)
                      setNoCancle(false);
                      setNoOk(false);
                      setModal(true)
                      setRedirect('');
                    }

                    actions.setSubmitting(false);
                  };
                  dispatch(changePassword(values, ChangePasswordCallback));
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
                  <div sx={{ position: "relative", mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations?.PLACEHOLDER_MOBILE_NUMBER}</Heading>
                    <Input placeholder={appTranslations?.PLACEHOLDER_MOBILE_NUMBER} sx={{
                      fontSize: 4,
                      fontFamily: 'body',
                      fontWeight: "semiBold",
                      lineHeight: "27px", py: 10, px: 15
                    }}
                      // type="number"
                      inputMode='numeric'
                      name="phone_no"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone_no} />
                    <span className='text-danger'>
                      {errors.phone_no && touched.phone_no && errors.phone_no}
                    </span>

                  </div>

                  <div sx={{ position: "relative", mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations?.PLACEHOLDER_OLD_PASSWORD}</Heading>
                    <Input placeholder={appTranslations?.PLACEHOLDER_OLD_PASSWORD} sx={{
                      fontSize: 4,
                      fontFamily: 'body',
                      fontWeight: "semiBold",
                      lineHeight: "27px", py: 10, px: 15
                    }} type="password"
                      name="old_password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.old_password} />
                    <span className='text-danger'>
                      {errors.old_password && touched.old_password && errors.old_password}
                    </span>
                  </div>

                  <div sx={{ position: "relative", mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations?.PLACEHOLDER_NEW_PASSWORD}</Heading>
                    <Input placeholder={appTranslations?.PLACEHOLDER_NEW_PASSWORD} sx={{
                      fontSize: 4,
                      fontFamily: 'body',
                      fontWeight: "semiBold",
                      lineHeight: "27px", py: 10, px: 15
                    }} type="password"
                      name="new_password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.new_password} />
                    <span className='text-danger'>
                      {errors.new_password && touched.new_password && errors.new_password}
                    </span>
                  </div>
                  <div sx={{ position: "relative", mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations?.PLACEHOLDER_CONFIRM_PASSWORD}</Heading>
                    <Input placeholder={appTranslations?.PLACEHOLDER_CONFIRM_PASSWORD} sx={{
                      fontSize: 4,
                      fontFamily: 'body',
                      fontWeight: "semiBold",
                      lineHeight: "27px", py: 10, px: 15
                    }} type="password"
                      name="confirm_password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirm_password} />
                    <span className='text-danger'>
                      {errors.confirm_password && touched.confirm_password && errors.confirm_password}
                    </span>
                  </div>
                  <Flex sx={{ justifyContent: 'center', }}>
                    <Button style={{ width: 193 }} backgroundColor="Blue_2" color="white" type="submit" onClick={handleSubmit} >{appTranslations?.BTN_CONTACT_US}</Button>
                  </Flex>
                </>
              )}
            </Formik>
          </Box>
          <AlertModal
            isOpen={model}
            Title={title}
            message={message}
            noCancle={noCancle}
            noOK={noOk}
            closeModal={() => {
              setModal(false);
              setMessage('');
              setTitle('')
            }}
            onCancle={() => {
              setModal(false);
              setMessage('');
              setTitle('')
            }}
            onOk={() => {
              setModal(false);
              setMessage('');
              setTitle('');
              if (redirect !== '') {
                setRedirect('')
                history.push('/')
              }
            }} />
        </Container>
      </section>
    </>
  );
}
export default ChangePassword;
