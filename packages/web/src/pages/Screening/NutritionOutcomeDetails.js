/** @jsxImportSource theme-ui */
import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Container, Flex } from 'theme-ui';

import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
import TitleTag from '../../components/TitleTag';
// import BreadCrumbs from '../../components/layout/BreadCrumb';
import queryString from 'query-string';
const NutritionOutcomeDetails = (props) => {
    const queryObj = queryString?.parse(props.location?.search)
    const ResultObj = props.location.state;
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const appMasterCms = useSelector(state => state?.app?.appMasterCms);
    const htmlContent = appMasterCms?.filter(
        e => e.title === queryObj.type,
    )?.[0]?.description;
    return (
        <>
            <TitleTag title={"Nutrition Outcome Details"} />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    {/* <BreadCrumbs queryObj={queryObj} /> */}
                    {/* <Themed.h5 sx={{ fontSize: [2, 3], color: "colorDark1", mt: 5, mb: 4, lineHeight: "27px", }}>{appTranslations?.HEADER_NUTRITION_OUTCOME_DETAILS}</Themed.h5> */}
                    <Flex sx={{ mb: 5 }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: htmlContent
                            }}
                            className="mt-3"
                        />
                    </Flex>
                    {ResultObj?.tbId !== 0 &&
                        <Flex>
                            <NavLink to={{
                                pathname: `/AlgorithmList/AlgorithmDetails`,
                                search: `?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_DIAGNOSIS_ALGORITHM&&type=Diagnosis Algorithm&&id=${ResultObj?.tbId}&&pageTitle=${ResultObj?.detected_tb}&&sid=${queryObj.sid}&&link=${queryObj.link}`,
                            }} >
                                <Button style={{  }} py={12} backgroundColor="Blue_2" color="white" className="w-100" >{appTranslations?.BTN_ALGORITHM_LINK}</Button>
                            </NavLink>
                        </Flex>
                    }
                </Container>
            </section>
        </>
    );
}
export default withRouter(NutritionOutcomeDetails);