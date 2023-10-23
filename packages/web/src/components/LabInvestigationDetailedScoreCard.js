/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading, Text } from 'theme-ui';
const LabInvestigationDetailedScoreCard = (props) => {
  return (
    <>
      <Box key={props.item.key} sx={{}} variant={"DetailedScoreCard"}>
        <Flex sx={{ alignItems: "center" }}>
          <div className="flex-fill text-center">
            <Heading variant="Raleway18" sx={{ color: "tealGreen", mb: 15, }}>{props.item.title}</Heading>
            <Flex sx={{ mb: 18 }}>
              <Heading variant="Nunito16" sx={{ color: "Grey_3", fontWeight: 500 }}>{props.item.subtitle}:</Heading>
              <Text variant="Nunito16"
                sx={{ color: props?.Ans?.score === '' || props?.Ans?.score === undefined ? "error" : "Blue_2", ml: "7px", fontWeight: 500 }}>
                {props?.Ans?.score === '' || props?.Ans?.score === undefined
                  ? props?.appTranslations?.NO_DATA
                  : props?.Ans?.score}
              </Text>
            </Flex>
            <Flex sx={{ mb: 18 }}>
              <Heading variant="Nunito16" sx={{ color: "Grey_3", fontWeight: 500 }}>Value :</Heading>
              <Text variant="Nunito16"
                sx={{ color: props?.Ans?.value === '' || props?.Ans?.value === undefined ? 'error' : "Blue_2", ml: "7px", fontWeight: 500 }}>
                {props?.Ans?.value === '' || props?.Ans?.value === undefined
                  ? props?.appTranslations?.NO_DATA
                  : props?.Ans?.value}
              </Text>
            </Flex>
          </div>
        </Flex>
      </Box>
    </>
  )
}

export default LabInvestigationDetailedScoreCard;