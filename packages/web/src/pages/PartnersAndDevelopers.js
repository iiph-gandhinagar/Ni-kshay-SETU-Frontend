/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Container, Grid, Heading } from 'theme-ui';
import TitleTag from '../components/TitleTag';

const PartnersAndDevelopers = (props) => {
  return (
    <>
      <TitleTag title={"Partners And Developers"} />
      <section sx={{ variant: 'layout.Home' }} className="our-partners">
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 60}}>Our Partners</Heading>
          <Grid gap={6} columns={[1, 2, null, 4]} sx={{}} className="">
            <Box>
              <a href="https://tbcindia.gov.in/" target="_blank" sx={{ width: ["100%", null, null, 190] }} className="single-services-box our-partners-box text-center bg-white h-100 d-flex align-items-center justify-content-center mx-auto">
                  <img src="/images/NTEPlogo.png" alt="ntep" className="our-partners-img mx-auto" sx={{ width: 155.17 }} />
              </a>
            </Box>
            <Box>
              <a href="https://www.usaid.gov/" target="_blank" sx={{ width: ["100%", null, null, 190] }} className="single-services-box our-partners-box text-center bg-white h-100 d-flex align-items-center justify-content-center mx-auto">
                  <img src="/images/USAIDLogo.png" alt="USAID" className="our-partners-img mx-auto" sx={{ width: 155.17 }} />
              </a>
            </Box>
            <Box>
              <a href="https://worldhealthpartners.org/" target="_blank" sx={{ width: ["100%", null, null, 190] }} className="single-services-box our-partners-box text-center bg-white h-100 d-flex align-items-center justify-content-center mx-auto">
                  <img src="/images/WHPLogo.png" alt="World-Health-Partners" className="our-partners-img mx-auto" style={{ width: 133 }} />
              </a>
            </Box>
            <Box>
              <a href="https://iiphg.edu.in/" target="_blank" sx={{ width: ["100%", null, null, 190] }} className="single-services-box our-partners-box text-center bg-white h-100 d-flex align-items-center justify-content-center mx-auto">
                  <img src="/images/IIPHGLogo.png" alt="IIPHG" className="our-partners-img mx-auto" sx={{ width: 155.17 }} />
              </a>
            </Box>
          </Grid>
        </Container>
      </section>
    </>
  );
}
export default PartnersAndDevelopers;