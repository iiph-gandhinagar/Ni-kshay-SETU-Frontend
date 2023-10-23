/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Container, Flex, Grid, Heading } from 'theme-ui';

import { withRouter } from "react-router";
import TitleTag from '../../components/TitleTag';
import { useSelector } from 'react-redux';
// import BreadCrumbs from '../../components/layout/BreadCrumb';
import queryString from 'query-string';
import LabInvestigationCard from '../../components/LabInvestigationCard';

const LaboratoryInvestigation = (props) => {
  const queryObj = queryString?.parse(props.location?.search);
  const history = useHistory();
  const [ans, setAns] = useState([]);
  const updatedAns = Object.assign([], ans)
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const data = [
    {
      id: 'GENERAL_CONDITION',
      image: "../../images/Axilla64x64.png",
      title: appTranslations?.GENERAL_CONDITION,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: 'Conscious & well oriented',
      type: 'dropDown',
      items: 'Conscious and normal,Inability walk but conscious and oriented,Conscious and not oriented,Drowsy/Unconscious/Comatose'
    },
    {
      id: 'TEXT_ICTERUS',
      image: "../../images/009-fever1.png",
      title: appTranslations?.TEXT_ICTERUS,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '--',
      type: 'dropDown',
      items: 'Yes,No'
    },
    {
      id: 'PEDAL_OEDEMA',
      image: "../../images/008-injury1.png",
      title: appTranslations?.PEDAL_OEDEMA,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '--',
      type: 'dropDown',
      items: 'Yes,No'
    },
    {
      id: 'PULSE_RATE',
      image: "../../images/001-heartbeat1.png",
      title: appTranslations?.PULSE_RATE,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '60 - 100/min',
    },
    {
      id: 'TEMPERATURE',
      image: "../../images/002-thermometer1.png",
      title: appTranslations?.TEMPERATURE,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '35 – 38.6 ‘C',
    },
    {
      id: 'BLOOD_PRESSURE',
      image: "../../images/003-blood-pressure1.png",
      title: appTranslations?.BLOOD_PRESSURE,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '90/60 – 120/80',
      // reg: /^([0-9]{1,3})\/([0-9]{1,3})$/,
      type: 'dropDown',
      items: 'Normal (120/80mmHg),Higher Normal (< 140/90mmHg),Hypertension (> 140/90 mmHg),Hypotension (Diastolic < 60 mmHg),Hypertension (>200/100 mm Hg)'
    },
    {
      id: 'RESPIRATORY_RATE',
      image: "../../images/004-breath1.png",
      title: appTranslations?.RESPIRATORY_RATE,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '12 – 18/min',
    },
    {
      id: 'OXYGEN_SATURATION',
      image: "../../images/005-oxygen-saturation1.png",
      title: appTranslations?.OXYGEN_SATURATION,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '95 – 100%',
    },
    {
      id: 'TEXT_BMI',
      image: "../../images/026-weight-scale1.png",
      title: appTranslations?.TEXT_BMI,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '18.5 – 24.9',
    },
    {
      id: 'TEXT_MUAC',
      image: "../../images/007-arm1.png",
      title: appTranslations?.TEXT_MUAC,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '>= 19 cm',
    },


    {
      id: 'TEXT_HEMOGLOBIN',
      image: "../../images/010-hemoglobin1.png",
      title: appTranslations?.TEXT_HEMOGLOBIN,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: 'Female = 9.9 – 14.3 g/dl Male = 12.3 – 17 g/dl',
    },
    {
      id: 'COUNT_WBC',
      image: "../../images/011-white-blood-cell1.png",
      title: appTranslations?.COUNT_WBC,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '4000-11000',
    },
    {
      id: 'TEXT_RBS',
      image: "../../images/012-sugar-blood-level1.png",
      title: appTranslations?.TEXT_RBS,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '79 – 140 mg/dl',
    },
    {
      id: 'TEXT_HIV',
      image: "../../images/013-red-ribbon1.png",
      title: appTranslations?.TEXT_HIV,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '--',
      type: 'dropDown',
      items: '-Ve,+Ve and on ART,+Ve and not on ART'
    },
    {
      id: 'TEXT_XRAY',
      image: "../../images/Chest64x64.png",
      title: appTranslations?.TEXT_XRAY,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: 'No abnormality',
      type: 'dropDown',
      items: 'No abnormality,Consolidation,Hydro Pneumothorax'
    },
    {
      id: 'TEXT_HEMOPTYSIS',
      image: "../../images/CoughingOfBlood64x64.png",
      title: appTranslations?.TEXT_HEMOPTYSIS,
      subtitle: appTranslations?.NORMAL_RANGE,
      range: '--',
      type: 'dropDown',
      items: 'Yes,No'
    },
  ];
  const pushToArray = (value, id, score) => {
    var index = ans.findIndex((e) => e.id == id);
    if (index == -1) {
      updatedAns.push({
        id: id,
        value: value,
        score: score
      })
    } else {
      updatedAns[index] = {
        id: id,
        value: value,
        score: score
      }
    }
    // console.log("updatedAns", ans);
    setAns(updatedAns)
  }
  const calculateScore = (value, id) => {
    console.log('flot', value, parseFloat(value));
    switch (id) {
      case 'PULSE_RATE':
        if (parseFloat(value) < 60 || parseFloat(value) > 100) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value)) {
          pushToArray(value, id, 0);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEMPERATURE':
        if (parseFloat(value) < 35 || parseFloat(value) > 41) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) > 38.6 && parseFloat(value) <= 41) {
          pushToArray(value, id, 1);
        }
        else if (value == '') {
          pushToArray(value, id, '');
        } else if (parseFloat(value)) {
          pushToArray(value, id, 0);
        }
        break;
      case 'BLOOD_PRESSURE':
        if (value === 'Normal (120/80mmHg)') {
          pushToArray(value, id, 0);
        } else if (value === 'Higher Normal (< 140/90mmHg)') {
          pushToArray(value, id, 1);
        } else if (value === 'Hypertension (> 140/90 mmHg)') {
          pushToArray(value, id, 2);
        } else if (value === 'Hypotension (Diastolic < 60 mmHg)') {
          pushToArray(value, id, 3);
        } else if (value === 'Hypertension (>200/100 mm Hg)') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'RESPIRATORY_RATE':
        //12-18 0, <12 2
        if (parseFloat(value) < 12) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 12 && parseFloat(value) <= 18) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) <= 24) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) < 30) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 30) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'OXYGEN_SATURATION':
        //94 < 0
        if (parseFloat(value) >= 94 && parseFloat(value) <= 100) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 90) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 85) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) < 85) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_BMI':
        // lessthen14 3, 14to16=2, 16to25=1,25to30=1,30to 33=2,33up=3
        if (parseFloat(value) < 14) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) >= 14 && parseFloat(value) < 16) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 16 && parseFloat(value) < 18.5) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 18.5 && parseFloat(value) < 25) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 25 && parseFloat(value) < 30) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 30 && parseFloat(value) < 33) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 33) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_MUAC':
        if (parseFloat(value) < 19) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 19) {
          pushToArray(value, id, 0);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'PEDAL_OEDEMA':
        if (value === 'Yes') {
          pushToArray(value, id, 1);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      case 'GENERAL_CONDITION':
        //         Conscious and normal = 0
        //Inability walk but conscious and oriented=1
        // Conscious and not oriented= 2
        // Drowsy, Unconscious, Comatose= 3
        if (value === 'Conscious and normal') {
          pushToArray(value, id, 0);
        } else if (value === 'Inability walk but conscious and oriented') {
          pushToArray(value, id, 1);
        } else if (value === 'Conscious and not oriented') {
          pushToArray(value, id, 2);
        } else if (value === 'Drowsy/Unconscious/Comatose') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_ICTERUS':
        if (value === 'Yes') {
          pushToArray(value, id, 1);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      case 'TEXT_HEMOGLOBIN':
        // <4 ->3  ,4to7 2, 7to10, 1, 10to17 0  ,18 up 2
        if (parseFloat(value) < 4) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) >= 4 && parseFloat(value) < 7) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 7 && parseFloat(value) < 10) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 10 && parseFloat(value) <= 18) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) > 18) {
          pushToArray(value, id, 2);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'COUNT_WBC':
        // 4000to3000 =1,3000to2000=2 ,2000todown 3, 11000-14000=1,14000to16000=2, to up 3
        if (parseFloat(value) <= 2000) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) > 2000 && parseFloat(value) < 3000) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 3000 && parseFloat(value) < 4000) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 4000 && parseFloat(value) < 11000) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) >= 11000 && parseFloat(value) < 14000) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) >= 14000 && parseFloat(value) < 16000) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 16000) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_RBS':
        // 50down 3,70-50=2 ,70-79=1,80-128=0 ,128-140=1,140-250=2,  morethen 250 3 ,
        if (parseFloat(value) < 50) {
          pushToArray(value, id, 3);
        } else if (parseFloat(value) < 70) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) < 80) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) <= 128) {
          pushToArray(value, id, 0);
        } else if (parseFloat(value) <= 140) {
          pushToArray(value, id, 1);
        } else if (parseFloat(value) < 250) {
          pushToArray(value, id, 2);
        } else if (parseFloat(value) >= 250) {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_HIV':
        if (value === '-Ve') {
          pushToArray(value, id, 0);
        } else if (value === '+Ve and on ART') {
          pushToArray(value, id, 1);
        } else if (value === '+Ve and not on ART') {
          pushToArray(value, id, 2);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;
      case 'TEXT_XRAY':
        //No abnormality=0,
        //Consolidation =2
        //Hydro Pneumothorax =3

        if (value === 'No abnormality') {
          pushToArray(value, id, 0);
        } else if (value === 'Consolidation') {
          pushToArray(value, id, 2);
        } else if (value === 'Hydro Pneumothorax') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        }
        break;

      case 'TEXT_HEMOPTYSIS':
        if (value === 'Yes') {
          pushToArray(value, id, 3);
        } else if (value == '') {
          pushToArray(value, id, '');
        } else {
          pushToArray(value, id, 0);
        }
        break;
      default:
        return 0;
    }
  }
  return (
    <>
      <TitleTag title={"Assessment of patients of the TB Patients"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          {/* <BreadCrumbs queryObj={queryObj} /> */}
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', py: 25 }}>
            <Heading variant="Raleway18" sx={{ color: "black2" }}>{appTranslations?.HEADER_LABORATORY_INVESTIGATION}</Heading>

            <Button
              disabled={ans.length > 0
                ? ans.findIndex(e => e.score !== '') != -1
                  ? false
                  : true
                : true
              }
              onClick={() => {
                history.push(`/LaboratoryInvestigation/ScoreResult?section=TITLE_PATIENT_MANAGEMENT_TOOL&&name=RESULT${queryObj.type ? '&&type=' + queryObj.type : ''}&&sid=${queryObj.sid}&&link=${queryObj.link}`, ans)
              }}
              py={12} px={34} backgroundColor="Blue_2" color="white">{appTranslations?.BTN_CALCULATE_SCORE}</Button>
          </Flex>
          <Grid gap={44} columns={[1, null, 2, 3]} sx={{ mb: "64px" }}>

            {data &&
              data.map((item, i) => {
                return (
                  <LabInvestigationCard item={item} key={i} Answer={ans?.find((data) => data.id === item.id)} onChage={(value, id) => {
                    calculateScore(value, id)
                  }} />
                );
              })}
          </Grid>
        </Container>
      </section>
    </>
  );
}
export default withRouter(LaboratoryInvestigation);