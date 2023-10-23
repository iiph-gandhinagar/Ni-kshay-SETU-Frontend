/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Grid, Heading } from 'theme-ui';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
const SimilarApplications = (props) => {
    const { allSimilarApps } = useSelector(state => state?.app);
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
      );
    return (
        <div className="home-page-section" >
            <hr sx={{ variant: "hr" }} />
            <div className="section-title">
                <Heading sx={{ mb: 4, fontSize: [2, 3], color: "colorDark1" }} variant="Raleway18">{appTranslations?.SIMILAR_APPLI}</Heading>
            </div>

            <Grid gap={4} columns={[2, 3, null, 5, 6, 7]}>
                {allSimilarApps?.map((item, i) => {
                    return (
                        <Box key={"SimilarApplications" + i} variant="TopModules" onClick={() => window.open(item?.href_web, "_blank")} >
                            <Flex sx={{ alignItems: 'center', flexDirection: 'column', }}>
                                <img src={
                                    item?.media?.[0]
                                        ? BASE_MEDIA_URL +
                                        item?.media?.[0]?.id +
                                        '/' +
                                        item?.media?.[0]?.file_name
                                        : "../../images/TBsathiLogo.svg"
                                } alt="logo" sx={{ textAlign: "center", marginBottom: 3, width: 45 }} />
                                <Heading as='h6' variant="Nunito16" sx={{ color: "black2" }}>{item.title}</Heading>
                            </Flex>
                        </Box>
                    );
                })}
            </Grid>
        </div>

    );
}
export default SimilarApplications;