/** @jsxImportSource theme-ui */
import { ClearAllQuestions, getAllQuestion, storeSurveyQuestion } from '@tb-frontend/shared/Store/action/SurveyActions';
import Lottie from "lottie-react";
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Stepper } from 'react-form-stepper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Flex, Heading, Paragraph } from 'theme-ui';
import DRbackground from "../../assets/Animations/DRbackground.json";
import CustomModal from '../../components/Modals/CustomModal';
import SurveyQuestionCard from '../../components/SurveyQuestionCard';
import TitleTag from '../../components/TitleTag';

const SurveyQuestions = () => {
    const [model, setModal] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [answer, setanswer] = useState([]);
    const aswerObj = Object.assign([], answer);
    const { QuestionList, loader } = useSelector(state => state?.survey);
    const history = useHistory()
    const dispatch = useDispatch();
    const queryObj = queryString?.parse(history.location.search)
    useEffect(() => {
        dispatch(getAllQuestion((queryObj?.id)));
    }, []);
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );

    const pushToArray = (arr: any[], survey_id: number, id: number, val: string) => {
        const index = arr?.findIndex(e => e?.survey_question_id == id);
        if (index === -1) {
            arr.push({
                'survey_id': survey_id,
                'survey_question_id': id,
                'answer': val,
            });
        } else {
            arr[index] = {
                'survey_id': survey_id,
                'survey_question_id': id,
                'answer': val,
            };
        }
        return arr;
    };
    return (
        <>
            <TitleTag title="Survey Questions" />

            <section sx={{ variant: 'layout.Home' }} className="survey-questions-stepper">
                <Container>
                    <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 53 }}>{appTranslations?.HEADER_SURVEY_FORM}</Heading>
                    <Flex sx={{ justifyContent: 'center', }}>
                        <Box sx={{ width: 400, mb: 21 }}>
                            <Stepper
                                steps={
                                    QuestionList?.map((item, i) => {
                                        return ({ label: "" });
                                    })
                                }
                                activeStep={activeStep}
                                styleConfig={{ activeBgColor: "#5584AC", inactiveBgColor: "#ECF6FF", inactiveTextColor: "#808080", circleFontSize: 18, labelFontSize: 16, completedBgColor: "#5584AC", size: 30 }}
                                connectorStyleConfig={{ activeColor: "#ECF6FF", completedColor: "#22577E" }}>
                            </Stepper>
                        </Box>
                    </Flex>
                    {QuestionList?.length > 0 ?
                        <SurveyQuestionCard
                            questionText={QuestionList?.[activeStep]?.question}
                            type={QuestionList?.[activeStep]?.type}
                            onClick={() => {
                                if (activeStep + 1 === QuestionList.length) {
                                    dispatch(storeSurveyQuestion(answer, (res) => {
                                        if (res?.code == 200) {
                                            setModal(true);
                                        }

                                    }));
                                } else {
                                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                                }
                            }}
                            onselectAnswer={(value) => {
                                let updatedAnswers = pushToArray(aswerObj, QuestionList?.[activeStep]?.survey_master_id, QuestionList?.[activeStep]?.id, value);
                                setanswer(updatedAnswers);
                            }}
                            activeStep={activeStep}
                            answer={answer?.[activeStep]?.answer || ''}
                            option1={QuestionList?.[activeStep]?.option1}
                            option2={QuestionList?.[activeStep]?.option2}
                            option3={QuestionList?.[activeStep]?.option3}
                            option4={QuestionList?.[activeStep]?.option4}
                        /> :
                        loader ? null :
                            <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mb: 25 }} className="text-center">
                                {appTranslations?.NO_DATA_SURVEY}
                            </Heading>
                    }
                </Container>
            </section>
            <CustomModal
                styles={{ modal: { maxWidth: 570, borderRadius: 6 } }}
                isOpen={model}
                closeModal={() => {
                    setModal(false);
                    dispatch(ClearAllQuestions());
                    history.push('/SurveyFormList')
                }} >
                <div className="rules-of-assessments">
                    <Lottie animationData={DRbackground} loop={true} style={{ width: 132, height: 132, marginBottom: 25 }} className="mx-auto" />
                    <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mb: 25 }} className="text-center">Thank you for taking the time to complete this survey</Heading>
                    <Paragraph variant="Nunito18title" sx={{ textAlign: "center", mb: 25, color: 'black' }}>We are very appreciative of the time you have taken to assist in our analysis, and commit to utilizing the information gained to contemplate and implementworthwhile improvements.</Paragraph>
                    <Box className="text-center">
                        <Button style={{ width: 95 }} mr="12px" backgroundColor="tealGreen" color="white" className="p-2"
                            onClick={() => { setModal(false); dispatch(ClearAllQuestions()); }}><Heading variant="Raleway18">Ok</Heading></Button>
                        <Button style={{ width: 108 }} variant="white" className="p-2" onClick={() => { setModal(false); dispatch(ClearAllQuestions()); }}>Cancel</Button>
                    </Box>
                </div>
            </CustomModal>
        </>
    );
}
export default SurveyQuestions;