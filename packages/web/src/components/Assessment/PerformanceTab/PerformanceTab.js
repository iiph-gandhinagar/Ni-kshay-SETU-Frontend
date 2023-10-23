/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Link, Text } from 'theme-ui';
import AccuracyCard from './AccuracyCard';
import CompletionRateCard from './CompletionRateCard';
const PerformanceTab = (props) => {
  return (
    <div className="performance-tab" sx={{ mt: [60, 100, 150] }} >
      <div className="row mx-0 justify-content-center pb-xl-5 pb-3">
        <CompletionRateCard />
        <AccuracyCard />
      </div>
      <div className="row mx-0 justify-content-center mt-xl-5 mt-0">
        <div className="col-xl-3">
          <Link href="/Certificates" className="navbar-brand">
            <Box variant="CertificatesBox" className="mb-3 p-2" backgroundColor="Blue_2">
              <Flex sx={{ alignItems: 'center' }}>
                <img style={{}} src="../../../images/certi.png" alt="Picture" sx={{ width: 25 }} className="me-3" />
                <Text variant="Heading4" sx={{ color: "white" }}>View Certificate</Text>
              </Flex>
            </Box>
          </Link>
        </div>
      </div>
    </div>

  );
}
export default PerformanceTab;