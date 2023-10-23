/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading, Text } from 'theme-ui';
import { VictoryPie } from 'victory';
const CompletionRateCard = (props) => {
  return (
        <div className="col-xxl-4 col-md-6">
          <Box variant="CompletionRateCard" className="mb-3">
            <Box variant="CompletionRateCardHeader" className="text-center">
              <Heading variant="Raleway18ExtraBold" sx={{ color: "white" }} className="">Completion Rate</Heading>
            </Box>
            <div className="position-relative mx-auto chart">
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400} height={400}
                  data={[{ 'key': "", 'y': 60 }, { 'key': "", 'y': (100 - 60) }]}
                  labelComponent={<span />}
                  innerRadius={180}
                  // labelRadius={100}
                  colorScale={["#FFD12D", "#F5F5F5"]}
                />
              </svg>
              <div className="text mx-1 text-center">
                <Heading variant="Heading4" sx={{ color: "Blue_Theme", mb: 14 }} >2 <Text variant="Nunito18title" color="orange">/5</Text></Heading>
                <Heading variant="Nunito16" sx={{ color: "Blue_Theme" }} >Assessment Completed</Heading>
              </div>
            </div>
          </Box>
        </div>

  );
}
export default CompletionRateCard;