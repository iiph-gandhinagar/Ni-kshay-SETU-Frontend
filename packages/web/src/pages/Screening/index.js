/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Paragraph, Slider, Themed, Text } from 'theme-ui';
import TitleTag from '../../components/TitleTag';
import queryString from 'query-string';
import { withRouter } from "react-router";
import { useSelector } from 'react-redux';
// import BreadCrumbs from '../../components/layout/BreadCrumb';

const Screening = (props) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const queryObj = queryString?.parse(props.location?.search)
    return (
        <>
            <TitleTag title={appTranslations?.TITLE_SCREENING} />

            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations?.TITLE_SCREENING}</Heading>
                    {/* <BreadCrumbs queryObj={queryObj} /> */}

                    <div className="text-center">
                        <img src="images/screening.png" alt="chevron-right" sx={{ width: 200, mb: 65 }}  />
                    </div>

                    <Flex sx={{ justifyContent: 'center', marginBottom: 6, }}>
                        <Box sx={{ width: 505 }}>
                            <Paragraph variant="Heading4" sx={{ textAlign: "center" , mb: 50, color:'black'  }}>
                                {appTranslations?.SUBTITLE_SCREENING}
                            </Paragraph>
                            <Paragraph variant="Nunito18title" sx={{ textAlign: "center", color:'black'  }}>
                                {appTranslations?.SUBTITLE_SCREENING_TWO}
                            </Paragraph>
                        </Box>
                    </Flex>

                    <Flex sx={{ justifyContent: 'center', marginTop: 8 }}>
                        <NavLink to={{
                            pathname: "/ScreeningDetails", 
                            name: queryObj?.name,
                        }} >
                            <Button style={{ width: 193 }} py={12} backgroundColor="Blue_2" color="white" ><Heading variant="Raleway18" >{appTranslations?.BTN_START}</Heading></Button>
                        </NavLink>
                    </Flex>
                </Container>
            </section>
        </>
    );
}
export default withRouter(Screening);