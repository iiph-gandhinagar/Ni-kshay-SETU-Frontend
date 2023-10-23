/** @jsxImportSource theme-ui */
import React from 'react';
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Flex, Grid, Heading } from 'theme-ui';

import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
import BmiResult from '../../components/BmiResult';
import TitleTag from '../../components/TitleTag';
// import BreadCrumbs from '../../components/layout/BreadCrumb';
import queryString from 'query-string';

const NutritionOutcome = (props) => {
  const OutcomeObj = props.location.state?.data;
  const queryObj = queryString?.parse(props.location?.search)
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const data = [
    {
      image: "../weight-scale.png",
      cardTitle: appTranslations?.DESIRABLE_WEIGHT,
      cardSubTitle: `${parseFloat(OutcomeObj?.desirableWeight).toFixed(2)} kg`
    },
    {
      image: "../weight-scale2.png",
      cardTitle: appTranslations?.DESIRABLE_WEIGHT_GAIN,
      cardSubTitle: `${parseFloat(OutcomeObj?.desirableWeightGain).toFixed(2)} kg`
    },
    {
      image: "../weight-scale4.png",
      cardTitle: appTranslations?.DESIRABLE_DAILY_CALORIC_INTAKE,
      cardSubTitle: `${parseFloat(
        OutcomeObj?.desirableDailyCaloricIntake,
      ).toFixed(2)} Kcal`
    },
    {
      image: "../weight-scale1.png",
      cardTitle: appTranslations?.MINIMUM_ACCEPTABLE_WEIGHT,
      cardSubTitle: `${parseFloat(OutcomeObj?.minimumAcceptableWeight).toFixed(
        2,
      )} kg`
    },
    {
      image: "../weight-scale3.png",
      cardTitle: appTranslations?.MINIMUM_WEIGHT_GAIN_REQUIRED,
      cardSubTitle: `${parseFloat(
        OutcomeObj?.minimumWeightGainRequired,
      ).toFixed(2)} kg`
    },
    {
      image: "../weight-scale5.png",
      cardTitle: appTranslations?.DESIRABLE_DAILY_PROTEIN_INTAKE_RANGE,
      cardSubTitle: `${parseFloat(
        OutcomeObj?.desirableDailyProteinIntake,
      ).toFixed(2)} g`
    },
  ];
  console.log("OutcomeObj", OutcomeObj);
  return (
    <>
      <TitleTag title={"Nutrition Outcome"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          {/* <BreadCrumbs queryObj={queryObj} /> */}
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 53 }}>{appTranslations?.NUTRITION_OUTCOME}</Heading>
          <BmiResult user_bmi={OutcomeObj?.user_bmi} type={OutcomeObj?.BMI} />
          <div className="row justify-content-center">
            <Box sx={{ maxWidth: 465 }}>
              <Grid gap={3} columns={[ 2, 3]} sx={{ mb: 35 }}>

                {data &&
                  data.map((item, i) => {
                    return (
                      <Box key={i} sx={{}} variant="NutritionOutcomeCard" className="text-center">
                        <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', }} className="h-100">
                          <Heading variant="Raleway18" sx={{ color: "Card_Gradian", mb: 15 }}>{item.cardTitle}</Heading>
                          <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }}>{item.cardSubTitle}</Heading>
                        </Flex>
                      </Box>
                    );
                  })}
              </Grid>
              <Flex sx={{ flexDirection: ['column', 'row'] }}>
                {OutcomeObj?.is_tb === 1 && <NavLink className="w-100" sx={{ mb: [26, 0]  }} to={{ pathname: "/NutritionOutcomeDetails", search: `section=${queryObj.section}&&name=${appTranslations?.HEADER_NUTRITION_OUTCOME_DETAILS}&&pageTitle=${OutcomeObj?.detected_tb}&&type=${OutcomeObj?.nutritionTitle}`, state: OutcomeObj }} >
                  <Button p={10} variant="white" sx={{width: ["100%", 200]}}><Heading variant="Raleway18" sx={{ color: "Blue_2" }}>{appTranslations?.BTN_C_ASMENT_NEXT}</Heading></Button>
                </NavLink>}
                <NavLink className="w-100"
                  to={{
                    pathname: `/AlgorithmList/AlgorithmDetails`,
                    search: `?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=TITLE_TREATMENT_ALGORITHM&&type=Treatment Algorithm&&id=${2}&&bmiID=${OutcomeObj?.Treatment_id}&&sid=${queryObj.sid}&&link=${queryObj.link}`,
                  }} >
                  <Button p={10} sx={{}} variant="white" className="w-100"><Heading variant="Raleway18" sx={{ color: "Blue_2" }}>{appTranslations?.BTN_Nutrition_Management}</Heading></Button>
                </NavLink>
              </Flex>
            </Box>
          </div>
        </Container>
      </section>
    </>
  );
}
export default withRouter(NutritionOutcome);