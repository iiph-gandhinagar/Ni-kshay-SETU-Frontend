/** @jsxImportSource theme-ui */
import {
    clearFilterDetails,
    clearFilters,
    getFilterDetails, setBlockId,
    setDistrictId, setFacilities, setFilterPage,
    setSearchTerm, setSortBy, setStateId
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
import { clearBlock, clearDistrict, getAllState, getBlockByDistrict, getDistrictByState } from '@tb-frontend/shared/Store/action/usersActions';
import FlatList from 'flatlist-react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from "react-router";
import { Box, Checkbox, Container, Flex, Grid, Heading, Input, Label, Select, Text } from 'theme-ui';
import ReferralHealthFacilityCard from '../../components/ReferralHealthFacilityCard';
import TitleTag from '../../components/TitleTag';

import queryString from 'query-string';

const ReferralHealthFacility = (props) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { healthFacility, appTranslations } = useSelector(state => state?.app);
    const { stateID, districtID, sortBy, blockID, facility, searchTerm, filterDetails, filterObj, loader } = useSelector(state => state?.health);
    const { State, allDistricts, allBlocks } = useSelector(state => state?.user);
    const page = useSelector(state => state?.health?.filterPage);
    const checkBox = facility !== '' ? facility?.split(',') : [];
    const CheckBoxUpdate = Object.assign([], checkBox);
    const queryObj = queryString?.parse(props.location?.search)
    const handleLoadMore = async () => {
        if (!loader && (filterObj?.current_page < filterObj?.last_page)) {
            dispatch(setFilterPage(page + 1));
            dispatch(
                getFilterDetails({
                    page: page + 1,
                    HF: facility,
                    ST: searchTerm,
                    stateID: stateID,
                    districtID: districtID,
                    blockID: blockID,
                    sort: sortBy,
                }),
            );
        }
    };
    const filter = async name => {
        const index = CheckBoxUpdate.findIndex(e => e === name);
        if (index == -1) {
            CheckBoxUpdate.push(name);
        } else {
            CheckBoxUpdate.splice(index, 1);
        }
        history.replace(`/ReferralHealthFacility?page=1&&HF=${CheckBoxUpdate.join()}&&ST=${searchTerm}&&stateID=${stateID}&&districtID=${districtID}&&blockID=${blockID}&&sort=${sortBy}`)
    };
    useEffect(() => {
        console.log("useEffect");
        window.scrollTo(0, 0);
        dispatch(setFilterPage(parseInt(queryObj?.page) || 1));
        dispatch(setFacilities(queryObj?.HF || ""));
        dispatch(setStateId(parseInt(queryObj?.stateID) || -1));
        dispatch(setDistrictId(parseInt(queryObj?.districtID) || -1));
        dispatch(setBlockId(parseInt(queryObj?.blockID) || -1));
        dispatch(setSortBy(queryObj?.sort || "ASC"));
        if (queryObj?.stateID) {
            dispatch(getDistrictByState(queryObj?.stateID));
        }
        if (queryObj?.districtID) {
            dispatch(getBlockByDistrict(queryObj?.districtID));
        }
        dispatch(
            getFilterDetails({
                page: queryObj?.page || 1,
                HF: queryObj?.HF || "",
                ST: queryObj?.ST || "",
                stateID: queryObj?.stateID || -1,
                districtID: queryObj?.districtID || -1,
                blockID: queryObj?.blockID || -1,
                sort: queryObj?.sort || "ASC",
            }),
        );
        dispatch(getAllState());
        return function cleanup() {
            console.log("useEffect cleanup");
            dispatch(clearFilterDetails());
            dispatch(clearFilters());
        };
    }, [queryObj?.page, queryObj?.HF, queryObj?.stateID, queryObj?.districtID, queryObj?.blockID, queryObj?.sort]);
    console.log("useEffect filterDetails", filterDetails?.length);
    return (
        <>
            <TitleTag title="Referral Health Facility" />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <div className="row" sx={{}}>
                        <div className="col-12 col-sm-6 col-lg-8 col-xl-8 ">
                            <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 53 }} className="">Referral Health Facility</Heading>
                            <FlatList
                                list={filterDetails}
                                wrapperHtmlTag="div"
                                style={{ overflow: "auto", maxHeight: '100vh' }}
                                display={{
                                    grid: true,
                                    gridGap: "25px",
                                    gridMinColumnWidth: "300px"
                                }}
                                renderWhenEmpty={() => <p style={{ textAlign: "center" }}>
                                    <b>{appTranslations?.END_MESSAGE}</b>
                                </p>}
                                pagination={{
                                    hasMore: filterObj?.current_page ? filterObj?.current_page < filterObj?.last_page ? true : false : true,
                                    loadingIndicatorPosition: 'center',
                                    loadMore: () => handleLoadMore(),
                                    loadingIndicator: <div className="d-flex justify-content-center mt-2">
                                        <img
                                            src="images/load.gif"
                                            alt="loading"
                                            height={40}
                                            width={40}
                                        />
                                    </div>
                                }}

                                renderItem={(item, index) => {
                                    return (
                                        <ReferralHealthFacilityCard
                                            key={"filterDetails-list" + index}
                                            item={item}
                                            facilityName={healthFacility} />
                                    )
                                }}
                            />
                        </div>
                        <div sx={{ mt: 5, }} className="col-12 col-sm-6 col-lg-4 col-xl-4 rhf-filter">
                            <Box sx={{ backgroundColor: "LightBlue", p: 15 }}>
                                <Flex sx={{ mb: 4 }}>
                                    <div className="input-group searchbar" sx={{ height: 45 }}>
                                        <img style={{}} src="../../../images/Search.png" alt="Icon" sx={{ width: 30, position: "absolute", top: "16%", left: 10, zIndex: 4 }} className="" />
                                        <Input placeholder={appTranslations?.PLACEHOLDER_SEARCH} sx={{ pl: 55 }}
                                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                                            enterKeyHint='done'

                                            onKeyPress={(e) => {
                                                if (e.code === 'Enter') {
                                                    history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${e?.nativeEvent?.target?.value}&&stateID=${stateID}&&districtID=${districtID}&&blockID=${blockID}&&sort=${sortBy}`)
                                                }
                                            }}
                                            value={searchTerm}
                                            className={`form-control rounded-pill  `} />

                                    </div>

                                    <Flex sx={{ alignItems: 'center', flex: "0 0 auto", }} className="sort-by position-relative">
                                        <div className="pointer">
                                            <img src="../../../images/sort.png" alt="sort" sx={{ width: 35, ml: 10 }} />
                                        </div>
                                        <ul className="list-unstyled dropdown_menu">
                                            <li className="nav-item">
                                                <a className="nav-link"
                                                    onClick={async () => {

                                                        history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${stateID}&&districtID=${districtID}&&blockID=${blockID}&&sort=ASC`)
                                                    }}
                                                >
                                                    <Flex className="justify-content-between pointer">
                                                        {appTranslations?.FILTER_BOTTOM_SORT_NAME_AZ}
                                                        {sortBy === 'ASC' && (
                                                            <img src="../../../images/check.svg" alt="check" sx={{ mr: 2 }} />
                                                        )}
                                                    </Flex>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link"
                                                    onClick={async () => {
                                                        history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${stateID}&&districtID=${districtID}&&blockID=${blockID}&&sort=DESC`)
                                                    }}
                                                >
                                                    <Flex className="justify-content-between pointer">
                                                        {appTranslations?.FILTER_BOTTOM_SORT_NAME_ZA}
                                                        {sortBy === 'DESC' && (
                                                            <img src="../../../images/check.svg" alt="check" sx={{ mr: 2 }} />
                                                        )}
                                                    </Flex>
                                                </a>
                                            </li>
                                        </ul>
                                    </Flex>
                                </Flex>
                                <Heading variant="Raleway18" sx={{ color: "black2", mb: 15 }}>{appTranslations?.HEADER_FACILITIES}</Heading>
                                <div style={{ overflowY: 'scroll', maxHeight: 475 }} className="facilities-list-tab">
                                    {Object.keys(healthFacility).map((data, i) => {
                                        return (
                                            <Flex key={"healthFacility-list-" + i} style={{ marginBottom: 16, }} >
                                                <Label sx={{ alignItems: 'center', textAlign: "left" }}>
                                                    <Checkbox
                                                        onChange={() => filter(data)}
                                                        checked={checkBox.find(e => e === data) ? true : false}
                                                    />
                                                    <Text variant="Nunito18title" sx={{ color: "black2", }}>{healthFacility[data]}</Text>
                                                </Label>
                                            </Flex>
                                        );
                                    })}
                                </div>
                                <div sx={{ mt: 5 }}>
                                    <Heading variant="Raleway18" sx={{ color: "black2", mb: 15 }}>{appTranslations?.HEADER_LOCATION}</Heading>
                                    <Box sx={{ textAlign: "center", mb: "12px" }}>
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
                                            onChange={async (event) => {
                                                history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${event?.target?.value}&&districtID=${0}&&blockID=${0}&&sort=${sortBy}`)
                                            }}
                                            name="selectedState"
                                            value={stateID}
                                            sx={{ px: 12, py: "5px", fontSize: 3, fontWeight: 500, backgroundColor: "white", color: "Grey_3" }}>
                                            <option key={"State-list-0-1"} value={-1}>{appTranslations?.DROPDOWN_SELECT_STATE}</option>
                                            {State?.map((item) => {
                                                return (
                                                    <option key={"State-list-" + item.id} value={item.id} > {item.title}</option>
                                                )
                                            })}
                                        </Select>
                                    </Box>
                                    <Box sx={{ textAlign: "center", mb: "12px" }}>
                                        <Select
                                            disabled={stateID == -1 ? true : false}
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
                                            onChange={async (event) => {

                                                history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${stateID}&&districtID=${event?.target?.value}&&blockID=${0}&&sort=${sortBy}`)
                                            }} name="selectedDistrict" value={districtID} sx={{ px: 12, py: "5px", fontSize: 3, fontWeight: 500, backgroundColor: "white", color: "Grey_3" }}>
                                            <option key={"allDistricts-list-0-1"} value={-1}>{appTranslations?.DROPDOWN_SELECT_DISTRICT}</option>
                                            {allDistricts?.map((item) => {
                                                return (
                                                    <option key={"allDistricts-list" + item.id} value={item.id}>{item.title}</option>
                                                )
                                            })}
                                        </Select>

                                    </Box>
                                    <Box sx={{ textAlign: "center", mb: "12px" }}>
                                        <Select
                                            disabled={districtID == -1 ? true : false}
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
                                            onChange={async (event) => {
                                                history.replace(`/ReferralHealthFacility?page=1&&HF=${facility}&&ST=${searchTerm}&&stateID=${stateID}&&districtID=${districtID}&&blockID=${event?.target?.value}&&sort=${sortBy}`)
                                            }}
                                            name="selectedBlock"
                                            value={blockID}
                                            sx={{ px: 12, py: "5px", fontSize: 3, fontWeight: 500, backgroundColor: "white", color: "Grey_3" }}>
                                            <option key={"allBlocks-list-0-1"} value={-1}>{appTranslations?.DROPDOWN_SELECT_TU}</option>
                                            {allBlocks?.map((item) => {
                                                return (
                                                    <option key={"allBlocks-list-" + item.id} value={item.id}>{item.title}</option>
                                                )
                                            })}
                                        </Select>

                                    </Box>
                                </div>
                            </Box>
                        </div>
                    </div>
                </Container >
            </section >
        </>
    );
}
export default withRouter(ReferralHealthFacility);