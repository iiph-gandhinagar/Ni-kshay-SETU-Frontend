/** @jsxImportSource theme-ui */
import { contactUs } from '@tb-frontend/shared/Store/action/authActions';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Flex, Heading, Input, Select, Spinner, Textarea } from 'theme-ui';
import * as Yup from 'yup';
import AlertModal from '../../components/Modals/AlertModal';
import TitleTag from '../../components/TitleTag';
const ContactUs = (props) => {
  const dispatch = useDispatch();
  const [model, setModal] = useState(false);
  const [noCancle, setNoCancle] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [noOk, setNoOk] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();
  const userDetails = useSelector(state => state?.user?.userData);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <>
      <TitleTag title={"Contact Us"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 73 }}>{appTranslations?.HEADER_CONTACT_US}</Heading>

          <Box bg="purple_light" variant="Card" className="mx-auto" sx={{ px: 10, pt: 20, pb: 55, }}>
            <Heading variant="Heading4" sx={{ color: "Blue_Theme", mb: 35 }} className="px-2">{appTranslations?.HEADER_CONTACT_US}</Heading>
            {userDetails?.length > 0 &&
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
                    .required(appTranslations.REQUIRED)
                    .notOneOf([-1, 0, '-1', '0'], appTranslations.UNSELECTED_DROPDOWN_CADRE),
                  email: Yup.string()
                    .required(appTranslations.REQUIRED)
                    .matches(
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
                      appTranslations.TEXT_INVALID_EMAIL,
                    ),
                })}
                onSubmit={
                  (values, actions) => {
                    console.log(values);
                    const ContactUsCallback = response => {
                      console.log('ContactUsCallback', response);
                      if (response?.code == 200) {
                        setTitle('Success');
                        setMessage(response?.data)
                        setNoCancle(true);
                        setNoOk(false);
                        setModal(true)
                        setRedirect('/');
                        actions.resetForm();
                      } else {
                        setTitle('Error');
                        setMessage(response?.response?.data?.data)
                        setNoCancle(false);
                        setNoOk(false);
                        setModal(true);
                        setRedirect('');
                      }

                      actions.setSubmitting(false);
                    };
                    dispatch(contactUs(values, ContactUsCallback));
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
                    <div sx={{ marginBottom: 25, position: "relative" }}>
                      <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">Subject</Heading>
                      <Select
                        autoFocus={true}
                        arrow={
                          <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            sx={{
                              ml: -40,
                              alignSelf: 'center',
                              pointerEvents: 'none',
                            }}>
                            <path d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z" fill="#808080" />
                          </Box>
                        }
                        sx={{ color: values.subject !== '' && "Grey_3", backgroundColor: 'white' }}
                        // disabled={health?.length == 0}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="subject"
                        value={values.subject}>
                        <option value={-1}>{appTranslations.PLACEHOLDER_SUBJECT}</option>
                        {appTranslations?.CONTACT_US_SUBJECTS?.split(',')?.map((data, id) => {
                          return (
                            <option key={id} value={data}>{data}</option>
                          )
                        })}
                      </Select>
                      <span className='text-danger'>
                        {errors.subject && touched.subject && errors.subject}
                      </span>
                    </div>
                    <div sx={{}}>
                      <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations.PLACEHOLDER_EMAIL}</Heading>
                      <Input placeholder={appTranslations.PLACEHOLDER_EMAIL} sx={{
                        fontSize: 4,
                        fontFamily: 'body',
                        fontWeight: "semiBold",
                        lineHeight: "27px", py: 10, px: 15
                      }}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                      <span className='text-danger'>
                        {errors.email && touched.email && errors.email}
                      </span>

                    </div>
                    <div sx={{ position: "relative", mb: 81 }}>
                      <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">Message</Heading>
                      <Textarea
                        placeholder="Write Message"
                        sx={{
                          fontSize: 4,
                          fontFamily: 'body',
                          fontWeight: "semiBold",
                          lineHeight: "27px", py: 10, px: 12
                        }}
                        // type="number"
                        rows={5}
                        inputMode='text'
                        name="message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message} />
                      <span className='text-danger'>
                        {errors.message && touched.message && errors.message}
                      </span>

                    </div>
                    <Flex sx={{ justifyContent: 'center', }}>
                      <Button disabled={isSubmitting} style={{ width: 193 }} backgroundColor="Blue_2" color="white" type="submit" onClick={handleSubmit} >{isSubmitting ?
                        <Spinner size={20} sx={{ color: '#fff' }} />
                        : <Heading variant="RalewayTitle">{appTranslations.BTN_CONTACT_US}</Heading>}</Button>
                    </Flex>
                  </>
                )}
              </Formik>
            }
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
                setRedirect('');
                history.push('/');
              }
            }} />
        </Container>
      </section>
    </>
  );
}
export default ContactUs;