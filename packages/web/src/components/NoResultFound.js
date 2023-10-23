/** @jsxImportSource theme-ui */
import React from 'react';
import { Heading } from 'theme-ui';
const NoResultFound = ({ }) => {
  return (
    <div className="text-center">
      <img src="images/noData.png" alt="noData" sx={{ width: 100, mb: 3 }} className="" />
      <Heading variant="Nunito18title" sx={{ color: 'black' }}>No Result Found</Heading>
    </div>

  );
}
export default NoResultFound;