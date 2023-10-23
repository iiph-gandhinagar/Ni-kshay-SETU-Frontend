/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading } from 'theme-ui';
const AccountListItem = ({ title, onClick }) => {
  return (
    <Box className="mx-lg-2 mx-0 pointer" variant="AccountListItem" onClick={onClick}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', }}>
        <Heading variant="Nunito18title" sx={{ color: "Blue_Theme" }}>{title}</Heading>
        <img style={{}} src="../../../images/RightArrow.svg" alt="RightArrow" sx={{ width: 20 }} />
      </Flex>

    </Box>
  );
}
export default AccountListItem;