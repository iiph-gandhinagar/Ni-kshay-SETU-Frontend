/** @jsxImportSource theme-ui */
import React from 'react';
import { Container, Heading } from 'theme-ui';
import TitleTag from '../components/TitleTag';

import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
const AboutCGCProject = (props) => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const appMasterCms = useSelector(state => state?.app?.appMasterCms);
  const htmlContent = appMasterCms?.filter(e => e.title === 'About CGC')?.[0]
    ?.description;
  console.log("htmlContent", htmlContent);
  return (
    <>
      <TitleTag title={"About CGC Project"} />
      <section sx={{ variant: 'layout.Home' }}>
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 33 }}>About Us</Heading>

          <div className="text-center">
            <img src="images/information.png" alt="information" sx={{ width: 150, mb: 10 }} />
            <Heading variant="Heading4" sx={{ color: "Blue_2", mb: 15 }}>About Us</Heading>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: htmlContent
            }}
            className="about-cgc-content"
            sx={{ textAlign: "justify" }}
          />
        </Container>
      </section>
    </>
  );
}
export default withRouter(AboutCGCProject);