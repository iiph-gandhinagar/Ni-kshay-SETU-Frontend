/** @jsxImportSource theme-ui */
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
    getUserData,
    updateUserData
} from '@tb-frontend/shared/Store/action/usersActions';
import { Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Input, Select, Spinner, Text } from 'theme-ui';
import * as Yup from 'yup';
// import AlertModal from '../components/Modals/AlertModal';
import TitleTag from '../../components/TitleTag';

const EditProfileDetails = () => {
    const state = useSelector(state => state?.user?.State);
    const district = useSelector(state => state?.user?.allDistricts);
    const block = useSelector(state => state?.user?.allBlocks);
    const cadre = useSelector(state => state?.user?.allCadres);
    const cadreType = useSelector(state => state?.user?.allCadresType);
    const health = useSelector(state => state?.user?.allHealths);
    const userDetails = useSelector(state => state?.user?.userData);
    const [model, setModal] = useState(false);
    const [noOk, setNoOk] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory()
    const appTranslations = useSelector(
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
                .notOneOf([-1, 0], appTranslations.UNSELECTED_DROPDOWN_STATE)
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
    const getState = async () => {
        try {
            dispatch(getAllState());
        } catch (error) {
            console.log('error', error);
        }
    };

    const getCadreType = async () => {
        try {
            dispatch(getAllCadreType());
        } catch (error) {
            console.log('error', error);
        }
    };
    
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
    useEffect(() => {
        dispatch(getUserData());
    }, []);
    
    return (
        <>
            <TitleTag title="Edit Personal Details" />
            <section sx={{ variant: 'layout.Home' }}>
                <Container sx={{ mt: 50 }}>
                    <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="">{appTranslations.	EDIT_PERSONAL_DETAILES}</Heading>
                    <hr sx={{ variant: "ProfileHr" }} />
                    <div className="row align-items-center pt-4 justify-content-center">
                        <div className="col-xl-6">
                            {userDetails?.length > 0 && <Formik
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
                                onSubmit={
                                    (values, actions) => {
                                        const updateCallback = (response) => {
                                            actions.setSubmitting(false);
                                            console.log("updateCallback", response);
                                            if (response?.code == 200) {
                                                setTitle('Success !!');
                                                setMessage(response?.data)
                                                setNoOk(false);
                                                setModal(true)
                                                dispatch(getUserData());

                                            } else {
                                                if (response?.data?.['phone_no']?.[0]) {
                                                    setTitle('Error !!');
                                                    setMessage(response?.data?.['phone_no']?.[0])
                                                    setNoOk(false);
                                                    setModal(true)
                                                } else {
                                                    setTitle('Error !!');
                                                    setMessage(response?.data)
                                                    setNoOk(false);
                                                    setModal(true)
                                                }
                                            }

                                            // openSnackbar(response.message, [10000])
                                        }
                                        dispatch(updateUserData(values, updateCallback));
                                    }}
                            >
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
                                    handleChange = async (name, value) => {
                                        if (name === 'cadre_type' && values.cadre_type !== value && value != '-1') {
                                            // console.log('in handleChange cadre_type ', name, value);
                                            await dispatch(clearCadre());
                                            await dispatch(clearDistrict());
                                            await dispatch(clearBlock());
                                            await dispatch(clearHelth());
                                            setFieldValue('cadre_type', value);
                                            setFieldValue('cadre_id', 0);
                                            setFieldValue('state_id', 0);
                                            setFieldValue('district_id', 0);
                                            setFieldValue('block_id', 0);
                                            setFieldValue('health_facility_id', 0);
                                            if (value === 'National_Level') {
                                                setFieldValue('country_id', 1)
                                            } else {
                                                setFieldValue('country_id', 0)
                                            }
                                            await dispatch(getAllCadre(value));
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
                                            await dispatch(clearDistrict());
                                            await dispatch(clearBlock());
                                            await dispatch(clearHelth());
                                            setFieldValue('district_id', 0);
                                            setFieldValue('block_id', 0);
                                            setFieldValue('health_facility_id', 0);
                                            // console.log('in handleChange state_id ', name, value);
                                            setFieldValue('state_id', parseInt(value));
                                            await dispatch(getDistrictByState(parseInt(value)));
                                        } else if (
                                            name === 'district_id' &&
                                            values.district_id !== parseInt(value)
                                        ) {
                                            await dispatch(clearBlock());
                                            await dispatch(clearHelth());
                                            setFieldValue('block_id', 0);
                                            setFieldValue('health_facility_id', 0);
                                            await dispatch(getBlockByDistrict(parseInt(value)));
                                            // console.log('in handleChange district_id ', name, value);
                                            setFieldValue('district_id', parseInt(value));

                                        } else if (
                                            name === 'block_id' &&
                                            values.block_id !== parseInt(value)
                                        ) {
                                            await dispatch(clearHelth());
                                            setFieldValue('health_facility_id', 0);
                                            // console.log('in handleChange block_id ', name, value);
                                            setFieldValue('block_id', parseInt(value));
                                            await dispatch(getHealthByBlock(parseInt(value)));
                                        } else if (
                                            name === 'health_facility_id' &&
                                            values.health_facility_id !== parseInt(value)
                                        ) {
                                            // console.log('in handleChange health_facility_id ', name, value);
                                            setFieldValue('health_facility_id', parseInt(value));
                                        } else if (value != '-1') {
                                            // console.log('in handleChange else ', name, value);
                                            setFieldValue(name, value);
                                        }
                                    };
                                    return (
                                        <>
                                            <div sx={{ position: "relative", marginBottom: 4 }}>
                                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="mb-1">{appTranslations.TABLE_NAME}</Heading>
                                                <Input
                                                    variant="PersonalDetailsInput"
                                                    placeholder={appTranslations?.PLACEHOLDER_FULL_NAME}
                                                    autoFocus={true}
                                                    sx={{ py: 10, px: 15 }}
                                                    onChange={event => handleChange('name', event?.target?.value)}
                                                    name="name"
                                                    onBlur={handleBlur('name')}
                                                    value={values.name} />
                                                <span className='text-danger'>
                                                    {errors.name && touched.name && errors.name}
                                                </span>
                                            </div>
                                            <div sx={{ position: "relative", marginBottom: 4 }}>
                                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.PLACEHOLDER_MOBILE_NUMBER}</Heading>
                                                <Input
                                                    variant="PersonalDetailsInput"
                                                    disabled={true}
                                                    placeholder={appTranslations?.PLACEHOLDER_MOBILE_NUMBER}
                                                    sx={{ py: 10, px: 15, backgroundColor: '#ddd' }}
                                                    name="phone_no"
                                                    value={userDetails[0]?.phone_no} />
                                            </div>
                                            <div sx={{ marginBottom: 4, position: "relative", }}>
                                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.CADER_TYPE}</Heading>
                                                <Select
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
                                                    sx={{ color: values.cadre_type !== '' && "Grey_3" }}
                                                    onChange={(event) => handleChange('cadre_type', event?.target?.value)}
                                                    onBlur={handleBlur('cadre_type')}
                                                    name="cadre_type"
                                                    value={values.cadre_type}>
                                                    <option value={-1}>{appTranslations.CADER_TYPE}</option>
                                                    {cadreType?.map((item, id) => {
                                                        return (
                                                            <option key={id} value={item.cadre_type}>{item.cadre_type}</option>
                                                        )
                                                    })}
                                                </Select>
                                                <span className='text-danger'>
                                                    {errors.cadre_type && touched.cadre_type && errors.cadre_type}
                                                </span>
                                            </div>
                                            <div sx={{ marginBottom: 4, position: "relative", }}>
                                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.CADER}</Heading>
                                                <Select
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
                                                    sx={{ color: values.cadre_id > 0 && "Grey_3" }}
                                                    onChange={(event) => handleChange('cadre_id', event?.target?.value)}
                                                    onBlur={handleBlur('cadre_id')}
                                                    name="cadre_id"
                                                    value={values.cadre_id}>
                                                    <option value={-1}>{appTranslations.DROPDOWN_SELECT_CADRE}</option>
                                                    {cadre?.map((item) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>{item.title}</option>
                                                        )
                                                    })}
                                                </Select>
                                                <span className='text-danger'>
                                                    {errors.cadre_id && touched.cadre_id && errors.cadre_id}
                                                </span>
                                            </div>
                                            {(values.cadre_type === 'State_Level' ||
                                                values.cadre_type === 'District_Level' ||
                                                values.cadre_type === 'Block_Level' ||
                                                values.cadre_type === 'Health-facility_Level') &&
                                                <div sx={{ marginBottom: 4, position: "relative", }}>
                                                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.HEADER_STATE}</Heading>
                                                    <Select
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
                                                        sx={{ color: values.state_id > 0 && "Grey_3" }}
                                                        onChange={(event) => handleChange('state_id', event?.target?.value)}
                                                        name="state_id"
                                                        disabled={state?.length == 0}
                                                        value={values.state_id}>
                                                        <option value={-1}>{appTranslations.DROPDOWN_SELECT_STATE}</option>
                                                        {state?.map((item) => {
                                                            return (
                                                                <option key={item.id} value={item.id}>{item.title}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                    <span className='text-danger'>
                                                        {errors.state_id && touched.state_id && errors.state_id}
                                                    </span>
                                                </div>
                                            }
                                            {(values.cadre_type === 'District_Level' ||
                                                values.cadre_type === 'Block_Level' ||
                                                values.cadre_type === 'Health-facility_Level') &&
                                                <div sx={{ marginBottom: 4, position: "relative", }}>
                                                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.DISTRICT}</Heading>
                                                    <Select
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
                                                        sx={{ color: values.district_id > 0 && "Grey_3" }}
                                                        disabled={district?.length == 0}
                                                        onChange={(event) => handleChange('district_id', event?.target?.value)}
                                                        name="district_id"
                                                        value={values.district_id}>
                                                        <option value={-1}>{appTranslations.DROPDOWN_SELECT_DISTRICT}</option>
                                                        {district?.map((item) => {
                                                            return (
                                                                <option key={item.id} value={item.id}>{item.title}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                    <span className='text-danger'>
                                                        {errors.district_id && touched.district_id && errors.district_id}
                                                    </span>
                                                </div>
                                            }
                                            {(values.cadre_type === 'Block_Level' ||
                                                values.cadre_type === 'Health-facility_Level') &&
                                                <div sx={{ marginBottom: 4, position: "relative", }}>
                                                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">TU</Heading>
                                                    <Select
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
                                                        sx={{ color: values.block_id > 0 && "Grey_3" }}
                                                        disabled={block?.length == 0}
                                                        onChange={(event) => handleChange('block_id', event?.target?.value)}
                                                        name="block_id"
                                                        value={values.block_id}>
                                                        <option value={-1}>{appTranslations.DROPDOWN_SELECT_TU}</option>
                                                        {block?.map((item) => {
                                                            return (
                                                                <option key={item.id} value={item.id}>{item.title}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                    <span className='text-danger'>
                                                        {errors.block_id && touched.block_id && errors.block_id}
                                                    </span>
                                                </div>
                                            }
                                            {values.cadre_type === 'Health-facility_Level' &&
                                                <div sx={{ marginBottom: 4, position: "relative", }}>
                                                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="my-1">{appTranslations.HEADER_HEALTH_FACILITY}</Heading>
                                                    <Select
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
                                                        sx={{ color: values.health_facility_id > 0 && "Grey_3" }}
                                                        disabled={health?.length == 0}
                                                        onChange={(event) => handleChange('health_facility_id', event?.target?.value)}
                                                        name="health_facility_id"
                                                        value={values.health_facility_id}>
                                                        <option value={-1}>{appTranslations.DROPDOWN_SELECT_HEALTHFACILITY}</option>
                                                        {health?.map((item) => {
                                                            return (
                                                                <option key={item.id} value={item.id}>{item.health_facility_code}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                    <span className='text-danger'>
                                                        {errors.health_facility_id && touched.health_facility_id && errors.health_facility_id}
                                                    </span>
                                                </div>
                                            }
                                            <div className="text-center pt-4">
                                                <Button style={{ width: 193 }} py={12} backgroundColor="Blue_2" color="white" onClick={handleSubmit}>{isSubmitting ?
                                                    <Spinner size={20} sx={{ color: '#fff' }} />
                                                    : appTranslations.BTN_UPDATE_PROFILE}</Button>
                                            </div>

                                        </>
                                    )
                                }
                                }
                            </Formik>
                            }
                        </div>
                    </div>
                </Container>
                {/* <AlertModal
                        isOpen={model}
                        Title={title}
                        message={message}
                        noCancle={true}
                        noOK={noOk}
                        closeModal={() => {
                            setModal(false);
                            setMessage('');
                            setTitle('')
                        }}
                        onOk={() => {
                            if (title === 'Success !!') { history.push('/') }
                            setModal(false);
                            setMessage('');
                            setTitle('');
                        }} /> */}
            </section>
        </>
    );
}
export default EditProfileDetails;