/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Radio, Heading, Label } from 'theme-ui';
const LangComponent = ({ title, subTitle, onClick, source, isSelected }) => {
  return (
    <Box backgroundColor="purple_light" sx={{}} className="p-1 pointer rounded text-center" onClick={onClick}>
      <Label sx={{ justifyContent: 'flex-end' }} className="pointer" >
        <Radio sx={{ width: 20, height: 20 }}
          checked={isSelected}
          onChange={onClick} />
      </Label>
      <img src={source} alt="language" sx={{ width: 33, backgroundColor: 'white' }} className="my-2" />
      <Heading variant="RalewayTitle" sx={{ color: "black", mt: 10 }}>{title}</Heading>
      <Heading variant="RalewayTitle" sx={{ color: "Grey_4", my: 10 }}>{subTitle}</Heading>
    </Box>

  );
}
export default LangComponent;