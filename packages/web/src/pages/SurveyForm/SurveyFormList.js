/** @jsxImportSource theme-ui */
import { getAllSurvey } from '@tb-frontend/shared/Store/action/SurveyActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Heading } from 'theme-ui';
import SurveyListCard from '../../components/SurveyListCard';
import TitleTag from '../../components/TitleTag';

const SurveyFormList = (props) => {
    const history = useHistory()
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const { SurveyList } = useSelector(state => state?.survey);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSurvey());
    }, []);
    return (
        <>
            <TitleTag title="Survey Form List" />

            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 53 }}>{appTranslations?.HEADER_SURVEY_FORM}</Heading>
                    {SurveyList?.survey_list?.map((item, i) => {
                        return (
                            <SurveyListCard
                                title={item?.title}
                                onClick={() => history.push("/SurveyQuestions?id=" + item?.id)}
                                key={"survey_list" + i} />
                        );
                    })}
                    {SurveyList?.dont_survey_list?.map((item, i) => {
                        return (
                            <SurveyListCard title={item?.title} dis={true} key={"dont_survey_list" + i} />
                        );
                    })}
                </Container>
            </section>
        </>
    );
}
export default SurveyFormList;