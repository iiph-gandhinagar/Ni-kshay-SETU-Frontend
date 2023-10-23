/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading } from 'theme-ui';
const ResultCard = ({ Marks, attempted, skipped, right_answers, wrong_answers }) => {
  return (
    <Box variant="AssessmentResultCard">
      <Box variant="AssessmentResultCardHeader" className="">
        <Heading variant="Raleway18" sx={{ color: "white" }} className="">Result</Heading>
      </Box>
      <Box variant="AssessmentResultCardBody" className="">
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }} className="mb-4">
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >Attempted</Heading>
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >{attempted}</Heading>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }} className="pt-2 mb-4">
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >Skipped</Heading>
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >{skipped}</Heading>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }} className="pt-2 mb-4">
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >Right Answer</Heading>
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >{right_answers}</Heading>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }} className="pt-2">
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >Wrong Answer</Heading>
          <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} >{wrong_answers}</Heading>
        </Flex>
      </Box>
      <Box variant="AssessmentResultCardFooter" className="text-center">
        <Heading variant="Raleway18" sx={{ color: "Blue_Theme" }} className="mb-1">Points</Heading>
        <Box variant="AssessmentResultCardPoints" className="">
          <Heading variant="Nunito26Title" sx={{ color: "brightYellow" }} className="">{Marks}</Heading>
        </Box>
      </Box>
    </Box>

  );
}
export default ResultCard;