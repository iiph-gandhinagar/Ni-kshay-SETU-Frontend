/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Heading } from 'theme-ui';
const CertificateCard = ({ title, onClick, backgroundColor, textColor }) => {
  return (
    <div className="col-12" >
      <Box variant="CertificateCard" sx={{ mb: 40, backgroundColor: backgroundColor }} onClick={onClick} className="pointer">
        <Box variant="CertificateCardHeader" className="position-relative" sx={{ px: 10, py: 18, backgroundColor: "LightBlue" }}>
          <Heading variant="RalewayTitle" sx={{ color: "Blue_Theme" }} className="">Completion Certificate</Heading>
          <img style={{}} src="../../../images/ribbon.png" alt="ribbon" sx={{ width: 75, position: "absolute", top: -20, right: 0 }} />
        </Box>
        <Box variant="CertificateCardBody" className="text-center" sx={{ px: 15, py: 30 }}>
          <Heading variant="Raleway18" sx={{ color: textColor }} className="">{title}</Heading>
        </Box>
      </Box>
    </div>

  );
}
export default CertificateCard;