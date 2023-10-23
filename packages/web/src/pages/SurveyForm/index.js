/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Paragraph } from 'theme-ui';
import TitleTag from '../../components/TitleTag';

const Survey = (props) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <>
            <TitleTag title="Survey" />

            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 38 }}>{appTranslations?.HEADER_SURVEY_FORM}</Heading>
                    <div className="text-center">
                        <img src="images/SurveyForm.png" alt="SurveyForm" sx={{ width: 200, mb: 50 }} />
                    </div>

                    <Flex sx={{ justifyContent: 'center', marginBottom: 6, }}>
                        <Box sx={{ width: "576px" }}>
                            <Paragraph variant="Nunito18title" sx={{ textAlign: "center", mb: 50, color: 'black' }}>{appTranslations.SURVEY_FORM_DESCRIPTION_TOP}
                            </Paragraph>
                            <Paragraph variant="Nunito18title" sx={{ textAlign: "center", color: 'black' }}>{appTranslations.SURVEY_FORM_DESCRIPTION_BOTTOM}
                            </Paragraph>
                        </Box>
                    </Flex>

                    <Flex sx={{ justifyContent: 'center', marginTop: 8 }}>
                        <NavLink to={{
                            pathname: "/SurveyFormList",
                        }} >
                            <Button style={{ width: 193 }} py={12} backgroundColor="Blue_2" color="white" ><Heading variant="Raleway18" >{appTranslations?.BTN_START}</Heading></Button>
                        </NavLink>
                    </Flex>
                </Container>
            </section>
        </>
    );
}
export default withRouter(Survey);