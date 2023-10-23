/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Text } from 'theme-ui';

export const ColorResult = ({ color, type, DataType, name, style = {} }) => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <Flex sx={{ alignItems: 'center' }}>
      <Flex style={{ ...style }}
        sx={{
          py: 11,
          width: 158,
          backgroundColor: color,
          justifyContent: 'flex-end',
        }}
        className="px-1">
        <Text variant="RalewayText12" sx={{ color: "black2", }} className="text-break text-end">{appTranslations[name] || name}</Text>
      </Flex>
      {type === DataType && (
        <img src="../../../images/triangle.png" sx={{ height: 20, width: 20 }} className="ms-1" alt="triangle" />
      )}
    </Flex>

  );
}

export const AssesTBResult = ({ max = 0 }) => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const Result = [
    {
      name: 'Differentiated_Care_Normal_Risk',
      color: '#51F16B',
      type: 0,
    },
    {
      name: 'Differentiated_Care_Low_Risk',
      color: '#F8E74F',
      type: 1,
    },
    {
      name: 'Differentiated_Care_Moderate_Risk',
      color: '#FFC56D',
      type: 2,
    },
    {
      name: 'Differentiated_Care_High_Risk',
      color: '#FF5F5F',
      type: 3,
    },
  ];
  return (
    <div className="row justify-content-center">
      <div className="col-xl-5">
        <Box variant="AssesTBResultCard" className="p-2 mx-auto" sx={{ backgroundColor: "purple_light", borderColor: "Card_Gradian", maxWidth: 450 }}>
          <div className="text-center">
            <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mb: 15, }}> {appTranslations.Differentiated_Care_Result_Thanks_Message}</Heading>
            {/* <img src={"../check-circled.svg"} sx={{ height: 120, width: 120 }} alt="check-circled" /> */}
          </div>
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', px: [3, 6, 8] }}>
            <Flex sx={{ justifyContent: 'center', flexDirection: 'column', }}>
              {Result.map((data, i) => {
                return (
                  <ColorResult
                    key={data?.type}
                    style={{
                      borderTopLeftRadius: i == 0 ? 5 : 0,
                      borderTopRightRadius: i == 0 ? 5 : 0,
                      borderBottomLeftRadius: i == 3 ? 5 : 0,
                      borderBottomRightRadius: i == 3 ? 5 : 0,
                    }}
                    DataType={data?.type} color={data?.color} type={max} name={data?.name} />
                );
              })}
            </Flex>
            <Heading variant="Raleway18ExtraBold" sx={{ color: "green", textAlign: "center" }}>
              {/* {appTranslations[Result.find(e => e.type == max)?.name]} */}{
                max >= 3 ?
                  appTranslations.Differentiated_Care_High_Risk :
                  max == 2 ? appTranslations?.Differentiated_Care_Moderate_Risk :
                    appTranslations.Differentiated_Care_Low_Risk}
            </Heading>
          </Flex>
          <Heading variant="Nunito16" sx={{ textAlign: "center", color: "Blue_Theme", mt: 5 }}>
            {
              max >= 3 ?
                appTranslations?.Differentiated_Care_Result_3 :
                max == 2 ? appTranslations?.Differentiated_Care_Result_2 :
                  appTranslations?.Differentiated_Care_Result_1
            }
          </Heading>
        </Box>
      </div>
    </div>

  );
}
