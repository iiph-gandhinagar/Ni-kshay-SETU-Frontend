/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Flex, Grid, Heading } from 'theme-ui';
// import TitleTag from '../../components/TitleTag';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { AssesTBResult } from '../../components/AssesTBResult';
import LabInvestigationDetailedScoreCard from '../../components/LabInvestigationDetailedScoreCard';
const ScoreResult = (props) => {
  const ResultObj = props.location.state;
  var max = Math.max.apply(Math, ResultObj?.map(o => o?.score));

  if (max === 1) {
    const lookup = ResultObj.reduce((a, e) => {
      a[e.score] = ++a[e.score] || 0;
      return a;
    }, {});
    if (ResultObj.filter(e => lookup[e.score]).length > 2) {
      max = 2
      console.log("ResultObj ----", ResultObj, max);
    }
  }
  const history = useHistory()
  const queryObj = queryString?.parse(props.location?.search)
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const data = [
    {
      id: 'GENERAL_CONDITION',
      image: "../Axilla64x64.png",
      title: appTranslations?.GENERAL_CONDITION,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_ICTERUS',
      image: "../009-fever1.png",
      title: appTranslations?.TEXT_ICTERUS,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'PEDAL_OEDEMA',
      image: "../008-injury1.png",
      title: appTranslations?.PEDAL_OEDEMA,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'PULSE_RATE',
      image: "../001-heartbeat1.png",
      title: appTranslations?.PULSE_RATE,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEMPERATURE',
      image: "../002-thermometer1.png",
      title: appTranslations?.TEMPERATURE,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'BLOOD_PRESSURE',
      image: "../003-blood-pressure1.png",
      title: appTranslations?.BLOOD_PRESSURE,
      subtitle: appTranslations?.TEXT_SCORE,

    },
    {
      id: 'RESPIRATORY_RATE',
      image: "../004-breath1.png",
      title: appTranslations?.RESPIRATORY_RATE,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'OXYGEN_SATURATION',
      image: "../005-oxygen-saturation1.png",
      title: appTranslations?.OXYGEN_SATURATION,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_BMI',
      image: "../026-weight-scale1.png",
      title: appTranslations?.TEXT_BMI,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_MUAC',
      image: "../007-arm1.png",
      title: appTranslations?.TEXT_MUAC,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_HEMOGLOBIN',
      image: "../010-hemoglobin1.png",
      title: appTranslations?.TEXT_HEMOGLOBIN,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'COUNT_WBC',
      image: "../011-white-blood-cell1.png",
      title: appTranslations?.COUNT_WBC,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_RBS',
      image: "../012-sugar-blood-level1.png",
      title: appTranslations?.TEXT_RBS,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_HIV',
      image: "../013-red-ribbon1.png",
      title: appTranslations?.TEXT_HIV,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_XRAY',
      image: "../Chest64x64.png",
      title: appTranslations?.TEXT_XRAY,
      subtitle: appTranslations?.TEXT_SCORE,
    },
    {
      id: 'TEXT_HEMOPTYSIS',
      image: "../CoughingOfBlood64x64.png",
      title: appTranslations?.TEXT_HEMOPTYSIS,
      subtitle: appTranslations?.TEXT_SCORE,
    },
  ];
  useEffect(() => {
    if (props?.location?.state === undefined || props.location.state === null) {
      history.push('/')
    }
  }, [])
  return (
    <>
      {/* <TitleTag title={appTranslations.Differentiated_Care_Result_Title} /> */}
      <section sx={{ variant: 'layout.Home' }}>
        <Container pt={50}>
          {/* <BreadCrumbs queryObj={queryObj} /> */}
          <AssesTBResult max={max} />
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 68, mb: 40 }}>Detailed Score</Heading>
          <Grid gap={44} columns={[1, null, 2, 3]} sx={{ mb: "64px" }}>

            {data &&
              data.map((item, i) => {
                return (
                  <LabInvestigationDetailedScoreCard item={item} appTranslations={appTranslations} key={i} Ans={ResultObj?.find((e) => e?.id == item?.id)} />
                );
              })}
          </Grid>
          <Flex sx={{ justifyContent: 'center', mt: 6 }}>
            <NavLink to={{ pathname: "/" }}>
              <Button px={4} py={3} sx={{}} backgroundColor="Blue_2" color="white" className="">Home</Button>
            </NavLink>
          </Flex>
        </Container>
      </section>
    </>
  );
}
export default withRouter(ScoreResult);