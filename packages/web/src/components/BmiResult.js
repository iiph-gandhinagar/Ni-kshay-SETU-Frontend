/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Text } from 'theme-ui';

const BmiResult = (props) => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const bmi = [
    {
      name: appTranslations.OBESE,
      color: '#BA0707',
      type: 'Obese',
    },
    {
      name: appTranslations.OVERWEIGHT,
      color: '#FFE401',
      type: 'Overweight',
    },
    {
      name: appTranslations.NORMAL,
      color: '#018138',
      type: 'Normal',
    },
    {
      name: appTranslations.MILD_UNDERWEIGHT,
      color: '#02A9F4',
      type: 'Mild Underweight',
    },
    {
      name: appTranslations.MODERATE_UNDERWEIGHT,
      color: '#F87700',
      type: 'Moderately Underweight',
    },
    {
      name: appTranslations.SEVERE_UNDERWEIGHT,
      color: '#B47C49',
      type: 'Severely Underweight',
    },
    {
      name: appTranslations.EXTREME_UNDERWEIGHT,
      color: '#FF6B6B',
      type: 'Extremely Underweight',
    },
  ];
  console.log("BmiResult props => ", props);
  return (
    <>
      <div className="row justify-content-center" sx={{ mb: 37 }}>
        <div className="col-xl-5">
          <Box variant="AssesTBResultCard" className="p-2 mx-auto" sx={{ backgroundColor: "purple_light", borderColor: "Card_Gradian", maxWidth: 400 }}>
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', }}>
              <Flex sx={{ justifyContent: 'center', flexDirection: 'column-reverse' }}>
                {bmi.map((data, i) => {

                  return (
                    <Flex sx={{ alignItems: 'center' }}>
                      <Flex
                        style={{
                          borderTopLeftRadius: i == 6 ? 5 : 0,
                          borderTopRightRadius: i == 6 ? 5 : 0,
                          borderBottomLeftRadius: i == 0 ? 5 : 0,
                          borderBottomRightRadius: i == 0 ? 5 : 0,
                        }}
                        sx={{
                          py: "6px",
                          width: 181,
                          backgroundColor: data.color,
                          justifyContent: 'flex-end',
                        }}
                        className="px-1">
                        <Text variant="RalewayTitle" sx={{ color: "white", }} className="text-break text-end">{data.name}</Text>
                      </Flex>
                      {props?.type === data.type && (
                        <img src="images/triangle.png" sx={{ height: 20, width: 20 }} className="ms-1" alt="triangle" />
                      )}
                    </Flex>

                  );
                })}
              </Flex>
              <Box>
                <Heading variant="Heading4" sx={{ color: "Blue_Theme", textAlign: "center" }} className="mb-1">BMI </Heading>
                <Heading variant="Nunito18title" sx={{ color: "black2" }} className="mb-1">(Body Mass Index)</Heading>
                <Heading variant="Nunito16" sx={{ textAlign: "center", color: "Card_Gradian" }}>{parseFloat(props?.user_bmi).toPrecision(4)} kg/m2</Heading>
              </Box>
            </Flex>
          </Box>
        </div>
      </div>
    </>
  )
}

export default BmiResult;