/** @jsxImportSource theme-ui */
import {
    clearFilterDetails, getFilterDetails, setFacilities, setFilterPage, setStateId
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
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
    getUserData
} from '@tb-frontend/shared/Store/action/usersActions';
import { Formik } from 'formik';
import { Multiselect } from "multiselect-react-dropdown";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Select, Spinner } from 'theme-ui';
import * as Yup from 'yup';
// import AlertModal from '../components/Modals/AlertModal';
import TitleTag from '../../components/TitleTag';

const SearchHealthFacility = () => {
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
    const { healthFacility } = useSelector(state => state?.app);
    const { stateID, districtID, sortBy, blockID, facility, searchTerm, filterDetails } = useSelector(state => state?.health);
    //   console.log("healthFacility >>>>>>", healthFacility);
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
            <TitleTag title={appTranslations.SEARCH_HEALTH_FACILITY}/>
            <section sx={{ variant: 'layout.Home' }}>
                <Container sx={{ mt: 50 }}>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations.TITLE_REFERRAL_HEALTH_FACILITY}</Heading>
                    <div className="row align-items-center pt-4 justify-content-center">
                        <div className="col-12">
                            <Flex sx={{ justifyContent: 'center' }} className="mb-4">
                                <img style={{}} src="../../images/Hospital.png" alt="Hospital" sx={{ width: 200 }} />
                            </Flex>
                            <Box className="mx-auto" sx={{ maxWidth: 378 }}>
                                <Box variant="SearchHealthFacilityBox" className="p-2 " >
                                    <Heading variant="Heading4" sx={{ color: "Blue_Theme", mb: 25 }} className="mx-2 mt-2">{appTranslations.SEARCH_HEALTH_FACILITY}</Heading>
                                    <Formik
                                        initialValues={{
                                            state_id: "",
                                            district_id: "",
                                            block_id: "",
                                            health_facility_id: userDetails[0]?.health_facility_id,
                                        }}
                                    // validationSchema={SignupSchema}
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
                                                if (
                                                    name === 'state_id' &&
                                                    values.state_id !== parseInt(value)
                                                ) {
                                                    dispatch(clearDistrict());
                                                    dispatch(clearBlock());
                                                    dispatch(clearHelth());
                                                    setFieldValue('district_id', 0);
                                                    setFieldValue('block_id', 0);
                                                    setFieldValue('health_facility_id', 0);
                                                    dispatch(setStateId(parseInt(value)));
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
                                                    dispatch(getBlockByDistrict(parseInt(value)));
                                                    setFieldValue('district_id', parseInt(value));

                                                } else if (
                                                    name === 'block_id' &&
                                                    values.block_id !== parseInt(value)
                                                ) {
                                                    dispatch(clearHelth());
                                                    setFieldValue('health_facility_id', 0);
                                                    setFieldValue('block_id', parseInt(value));
                                                    dispatch(getHealthByBlock(parseInt(value)));
                                                } else if (
                                                    name === 'health_facility_id' &&
                                                    values.health_facility_id !== parseInt(value)
                                                ) {
                                                    setFieldValue('health_facility_id', parseInt(value));
                                                } else if (value != '-1') {
                                                    setFieldValue(name, value);
                                                }
                                            };
                                            return (
                                                <React.Fragment>
                                                    <div sx={{ marginBottom: 4, position: "relative", }}>
                                                        <Heading variant="Nunito16" sx={{ color: "Blue_2" }} className="my-1">State</Heading>
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
                                                            sx={{ color: values.state_id > 0 && "Grey_3", fontSize: 3, fontWeight: 500, backgroundColor: "white" }}
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
                                                    <div sx={{ marginBottom: 4, position: "relative", }}>
                                                        <Heading variant="Nunito16" sx={{ color: "Blue_2" }} className="my-1">District</Heading>
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
                                                            sx={{ color: values.district_id > 0 && "Grey_3", fontSize: 3, fontWeight: 500, backgroundColor: "white" }}
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
                                                    <div sx={{ marginBottom: 4, position: "relative", }}>
                                                        <Heading variant="Nunito16" sx={{ color: "Blue_2" }} className="my-1">TU</Heading>
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
                                                            sx={{ color: values.block_id > 0 && "Grey_3", fontSize: 3, fontWeight: 500, backgroundColor: "white" }}
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
                                                    <div sx={{ marginBottom: 4, position: "relative", }}>
                                                        <Heading variant="Nunito16" sx={{ color: "Blue_2" }} className="my-1">Health Facility</Heading>
                                                        <Multiselect
                                                            onSelect={(selectedList, selectedItem) => {
                                                                dispatch(setFacilities(selectedList?.map(e => e.id)?.join(",")));
                                                            }}
                                                            options={Object.keys(healthFacility)?.map((e, i) => {
                                                                return {
                                                                    name: healthFacility[e],
                                                                    id: e,
                                                                };
                                                            }) || []} displayValue="name"
                                                            selectedValues={facility?.split(",").length > 1 ? facility?.split(",")?.map((e) => {
                                                                return {
                                                                    name: healthFacility[e],
                                                                    id: e,
                                                                };
                                                            }) : []}
                                                            showArrow
                                                            customArrow={
                                                                <Box
                                                                    as="svg"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="18"
                                                                    height="19"
                                                                    viewBox="0 0 18 19"
                                                                    fill="none"
                                                                    sx={{
                                                                        ml: -16,
                                                                        alignSelf: 'center',
                                                                        pointerEvents: 'none',
                                                                    }}>
                                                                    <path d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z" fill="#808080" />
                                                                </Box>
                                                            }
                                                            style={{
                                                                inputField: {
                                                                    minHeight: 34,
                                                                    marginTop: 0
                                                                },
                                                                searchBox: {
                                                                    fontFamily: "'Nunito', sans-serif",
                                                                    fontWeight: 500,
                                                                    fontSize: 16,
                                                                    lineHeight: "24px",
                                                                }
                                                            }}
                                                            placeholder={appTranslations.DROPDOWN_SELECT_HEALTHFACILITY}
                                                        />

                                                        <span className='text-danger'>
                                                            {errors.health_facility_id && touched.health_facility_id && errors.health_facility_id}
                                                        </span>
                                                    </div>
                                                    <div className="text-center pt-4">
                                                        <Button style={{ width: 193 }} py={12} backgroundColor="Blue_2" color="white" onClick={async () => {

                                                            // dispatch(setFilterPage(1));
                                                            // dispatch(
                                                            //     getFilterDetails({
                                                            //         page: 1,
                                                            //         HF: facility,
                                                            //         ST: searchTerm,
                                                            //         stateID: values.state_id,
                                                            //         districtID: values.district_id,
                                                            //         blockID: values.block_id,
                                                            //         sort: SortBy,
                                                            //     }),
                                                            // );
                                                            history.push(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${values.state_id}&&districtID=${values.district_id}&&blockID=${values.block_id}&&sort=${sortBy}`)
                                                        }}>{isSubmitting ?
                                                            <Spinner size={20} sx={{ color: '#fff' }} />
                                                            : appTranslations.PLACEHOLDER_SEARCH}</Button>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }
                                        }
                                    </Formik>
                                </Box>
                                <Box sx={{ mt: 20 }} className="text-end">
                                    <Button sx={{ px: 14, width: 120, borderColor: "Blue_2", }} variant="white" className="py-1"
                                        onClick={async () => {
                                            dispatch(clearFilterDetails());
                                            history.push("/ReferralHealthFacility")
                                        }}><Heading variant="Raleway18" sx={{ color: "Blue_2", }}>{appTranslations.VIEW_ALL}</Heading></Button>
                                </Box>
                            </Box>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
export default SearchHealthFacility;