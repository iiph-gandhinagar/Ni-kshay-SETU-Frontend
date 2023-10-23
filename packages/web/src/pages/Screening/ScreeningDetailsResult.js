/** @jsxImportSource theme-ui */
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import { Box, Container, Flex, Heading, Paragraph } from 'theme-ui';
import TitleTag from '../../components/TitleTag';
// import BmiResult from '../../components/BmiResult';
import { useSelector } from 'react-redux';
// import BreadCrumbs from '../../components/layout/BreadCrumb';
import Lottie from "lottie-react";
import RightAnimation from "../../assets/Animations/right.json";
const ScreeningDetailsResult = (props) => {
  console.log("props.location.state", props.location.state);
  const ResultObj = props.location.state?.data;
  const history = useHistory()
  const queryObj = queryString?.parse(props.location?.search)
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    if (props?.location?.state?.data == undefined) {
      history.push('/');
    }
  }, [])
  console.log("ResultObj", queryObj);
  return (
    <>
      <TitleTag title={"Screening Details Result"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations?.TITLE_SCREENING}</Heading>
          {/* <BreadCrumbs queryObj={queryObj} /> */}
          <div className="text-center">
            <Lottie animationData={RightAnimation} loop={true} style={{ width: 170 }} className="mx-auto" />
            <Heading variant="Raleway18" sx={{ color: "Blue_Theme", my: 4, }}>{appTranslations?.THANK_U_FOR_THE_INPUTS}</Heading>
            {/* {ResultObj?.is_tb === 1 ? <img src={"../check-circled.svg"} sx={{ height: 120, width: 120 }} alt="check-circled" /> : <img src={"../Ans-true.svg"} alt="check-circled" sx={{ height: 120, width: 120 }} />} */}
          </div>

          <Flex sx={{ justifyContent: 'center', }}>
            <Box sx={{ width: "582px" }}>
              <Paragraph variant="Nunito18title" sx={{ textAlign: "center", color: "Grey_4", mb: 4 }}>
                {ResultObj?.is_tb === 0 ?

                  appTranslations?.RESULT_NOTTB_TEXT
                  :
                  appTranslations?.RESULT_TB_TEXT
                }

              </Paragraph>
              {ResultObj?.is_tb == 1 && ResultObj?.tbId !== 0 ?
                < NavLink sx={{ textDecorationLine: 'none' }} to={{
                  pathname: `/AlgorithmList/AlgorithmDetails`,
                  search: `?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_DIAGNOSIS_ALGORITHM&&type=Diagnosis Algorithm&&id=${ResultObj?.tbId}&&pageTitle=${ResultObj?.detected_tb}&&sid=${queryObj.sid}&&link=${queryObj.link}`,
                }}>
                  <Heading variant="Nunito18title" sx={{ color: "tealGreen", mb: 40, textAlign: "center" }}>{ResultObj?.detected_tb}</Heading>
                </NavLink>
                : ResultObj?.is_tb == 1 && ResultObj?.tbId == 0 &&
                <Heading variant="Nunito18title" sx={{ color: "tealGreen", mb: 40, textAlign: "center" }}>{ResultObj?.detected_tb}</Heading>
              }
            </Box>
          </Flex>


          <Flex sx={{ justifyContent: 'center' }}>
            <NavLink to={{ pathname: "/NutritionOutcome", search: `section=${queryObj.section}&&name=${appTranslations?.NUTRITION_OUTCOME}`, state: { data: ResultObj, name: props.location.state?.name } }} sx={{ textDecorationLine: 'none' }} >
              <Flex sx={{ pt: 22, px: 12, pb: 16, backgroundColor: "LightBlue", borderRadius: 5, textAlign: "center", width: 175, height: 175, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', mr: 38 }}>
                <img src="images/blocks-group-solid-1.png" alt="blocks" sx={{ width: 55, mb: 11 }} />
                <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }}>{appTranslations?.NUTRITION_OUTCOME}</Heading>
              </Flex>
            </NavLink>
            {ResultObj?.is_tb === 1 &&
              <NavLink to={{ pathname: "/NutritionOutcomeDetails", search: `section=${queryObj.section}&&name=${appTranslations?.HEADER_NUTRITION_OUTCOME_DETAILS}&&pageTitle=${ResultObj?.detected_tb}&&type=${ResultObj?.nutritionTitle}`, state: ResultObj }} sx={{ textDecorationLine: 'none' }} >
                <Flex sx={{ pt: 22, px: 12, pb: 16, backgroundColor: "LightBlue", borderRadius: 5, textAlign: "center", width: 175, height: 175, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                  <img src="images/blocks-group-solid-2.png" alt="blocks" sx={{ width: 55, mb: 11 }} />
                  <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }}>{appTranslations?.NUTRITION_OUTCOME_DETAILS}</Heading>
                </Flex>
              </NavLink>
            }
          </Flex>
        </Container>
      </section>
    </>
  );
}
export default withRouter(ScreeningDetailsResult);