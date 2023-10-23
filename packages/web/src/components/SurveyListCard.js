/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading } from 'theme-ui';
const SurveyListCard = ({ title, onClick, dis }) => {
  return (
    <Box sx={{ mb: 20, maxWidth: 500 }} className="p-1 mx-auto pointer" onClick={onClick}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <img src="images/contactform.png" alt="contactform" sx={{ width: 30 }} className="me-2" />
          <Heading variant="Nunito18title" sx={{ color: "Blue_2" }}>{title}</Heading>
        </Flex>
        <Heading variant="Nunito12" sx={{ color: "green" }}>{dis ? 'Done' : 'Start'}</Heading>
      </Flex>
    </Box>

  );
}
export default SurveyListCard;