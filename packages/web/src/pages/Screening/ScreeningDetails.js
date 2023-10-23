/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  getAllSymptoms,
  storeUserScreening
} from '@tb-frontend/shared/Store/action/screeningAction';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Checkbox, Container, Flex, Grid, Heading, Label, Slider, Text } from 'theme-ui';
import TitleTag from '../../components/TitleTag';
const ScreeningDetails = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [ageValue, setAgeValue] = useState(10);
  const [weightValue, setWeightValue] = useState(10);
  const [heightValue, setHeightValue] = useState(10);
  const [checkBox, setCheckBox] = useState([]);
  const CheckBoxUpdate = Object.assign([], checkBox);
  const dispatch = useDispatch();
  const history = useHistory();
  const filter = name => {
    console.log('filter', name);
    const index = CheckBoxUpdate.findIndex(e => e === name);
    if (index == -1) {
      CheckBoxUpdate.push(name);
    } else {
      CheckBoxUpdate.splice(index, 1);
    }
    setCheckBox(CheckBoxUpdate);
  };
  const symptoms = useSelector(state => state?.screening?.symptomsList);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const queryObj = queryString?.parse(props.location?.search)
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      console.log("appTranslations?.TITLE_GUIDANCE_ON_CASE_FINDINGS", appTranslations?.TITLE_GUIDANCE_ON_CASE_FINDINGS);
      if (isMounted && ageValue) {
        dispatch(getAllSymptoms());
      }
      else if (isMounted) {
        props.history.push('/')
      }
    };

    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
      console.log('cleanup');
      // dispatch(clearAlgorithmsMasterNode());
      unsubscribe();
    };
  }, []);
  const callBack = res => {
    console.log('callBcak res--', res);
    if (res?.code === 200 && res?.status) {
      // navigation.navigate('Result', res?.data);
      history.push(`/ScreeningDetailsResult?section=${queryObj.section}&&name=${appTranslations?.SCREENING_RESULT}&&sid=${queryObj.sid}&&link=${queryObj.link}`, {
        name: props.location.state?.name,
        data: res?.data
      })
    }
  };
  const submitResult = () => {
    const submitObj = {
      age: ageValue,
      weight: weightValue,
      height: heightValue,
      symptoms_selected: checkBox.join(),
    };

    dispatch(storeUserScreening(submitObj, callBack));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <TitleTag title={"Screening Details"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations?.TITLE_SCREENING}</Heading>
          <Flex sx={{ justifyContent: 'center', }}>
            <Box sx={{ width: 540 }}>
              <Stepper activeStep={activeStep} styleConfig={{ activeBgColor: "#5584AC", inactiveBgColor: "#ECF6FF", inactiveTextColor: "#808080", circleFontSize: 18, labelFontSize: 18, completedBgColor: "#5584AC" }} connectorStyleConfig={{ activeColor: "#ECF6FF", completedColor: "#22577E" }}>
                <Step label="Basic Info." />
                <Step label="Symptoms" />
              </Stepper>
            </Box>
          </Flex>
          {/* <BreadCrumbs queryObj={queryObj} /> */}
          {activeStep === 0 ?
            <>
              <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mt: 11, mb: 35 }}>Select age,weight and height</Heading>
              <Box variant="ScreeningToolBox" sx={{ px: 15, py: 30, maxWidth: 420 }} className="mx-auto">
                <Flex sx={{ justifyContent: 'center', }}>
                  <Box sx={{ width: "376px" }}>
                    <Flex sx={{ alignItems: 'center', }}>
                      <Flex sx={{ flexDirection: 'column', }} className="w-100">
                        <Heading variant="Nunito18title" sx={{ color: "Blue_2", textAlign: "left" }}>{appTranslations?.TEXT_SCREENING_AGE}</Heading>
                        <Slider defaultValue={ageValue} onChange={(e) => setAgeValue(e.target.value)}
                          max={100}
                          min={1} sx={{ backgroundColor: "lightBlue3" }} />
                      </Flex>
                      <Text variant="sliderValue">{ageValue}</Text>
                    </Flex>
                  </Box>
                </Flex>

                <Flex sx={{ justifyContent: 'center', marginTop: 55, }}>
                  <Box sx={{ width: "376px" }}>
                    <Flex sx={{ alignItems: 'center', }}>
                      <Flex sx={{ flexDirection: 'column', }} className="w-100">
                        <Heading variant="Nunito18title" sx={{ color: "Blue_2", textAlign: "left" }}>{appTranslations?.TEXT_SCREENING_WEIGHT}</Heading>
                        <Slider defaultValue={weightValue} onChange={(e) => setWeightValue(e.target.value)} max={200} min={1} sx={{ backgroundColor: "lightBlue3" }} />
                      </Flex>
                      <Text variant="sliderValue">{weightValue}</Text>
                    </Flex>
                  </Box>
                </Flex>

                <Flex sx={{ justifyContent: 'center', marginTop: 55, }}>
                  <Box sx={{ width: "376px" }}>
                    <Flex sx={{ alignItems: 'center', }}>
                      <Flex sx={{ flexDirection: 'column', }} className="w-100">
                        <Heading variant="Nunito18title" sx={{ color: "Blue_2", textAlign: "left" }}>{appTranslations?.TEXT_SCREENING_HEIGHT}</Heading>
                        <Slider defaultValue={heightValue} onChange={(e) => setHeightValue(e.target.value)} max={245} min={10} sx={{ backgroundColor: "lightBlue3" }} />
                      </Flex>
                      <Text variant="sliderValue">{heightValue}</Text>
                    </Flex>
                  </Box>
                </Flex>

                <Flex sx={{ justifyContent: 'center', marginTop: 55 }}>
                  <Button style={{ width: 193 }} backgroundColor="Blue_2" color="white" onClick={handleNext}><Heading variant="Raleway18" >Next</Heading></Button>
                </Flex>
              </Box>
            </> : <>
              <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mt: 11, mb: 57 }}>{appTranslations?.SYMPTM_QUESTION}</Heading>

              <Grid gap={6} columns={[1, null, 2, 3]}>

                {symptoms?.length == 0 ? <>
                  {/* <SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /><SymptomsLoader /> */}
                </> :
                  symptoms?.map((data, i) => {
                    return (
                      <Box variant="CheckboxContainer" key={i}>
                        <Flex sx={{ alignItems: 'center', }}>
                          <Flex sx={{ alignItems: 'center', }} className="w-100">
                            {data?.media?.[0]?.id &&
                              <img src={BASE_MEDIA_URL +
                                data?.media?.[0]?.id +
                                '/' +
                                data?.media?.[0]?.file_name} alt="image" sx={{ textAlign: "center", height: 45, width: 45 }} />}
                            <Text variant="Nunito18title" sx={{ color: "Grey_3", mx: 2 }}>{data.symptoms_title}</Text>
                          </Flex>
                          <Label sx={{ alignItems: 'center', textAlign: "left", width: "auto" }} className="pointer">
                            <Checkbox
                              value={checkBox.find(e => e === data.id) ? true : false}
                              onChange={() => filter(data.id)} />

                          </Label>

                        </Flex>
                      </Box>

                    )
                  })}
              </Grid>
              <Flex sx={{ justifyContent: 'center', marginTop: 75 }}>

                <Button style={{ width: 193 }} backgroundColor="Blue_2" color="white" disabled={checkBox.length == 0 ? true : false} onClick={() => {
                  submitResult();
                }} sx={{}}><Heading variant="Raleway18" >{appTranslations?.BTN_C_ASMENT_SUBMIT}</Heading></Button>

              </Flex>
            </>
          }
        </Container>
      </section>
    </>
  );
}
export default withRouter(ScreeningDetails);