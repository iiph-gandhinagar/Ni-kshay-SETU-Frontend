/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { Box, Button, Container, Flex, Heading, Text } from 'theme-ui';

import { getAssessmentWithQuestions, getUserAssessmentDetails, storeAssessmentresult } from '@tb-frontend/shared/Store/action/assessmentAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import Question from '../../../../components/Assessment/Question';
// import BreadCrumbs from '../../../../../components/layout/BreadCrumb';
import Cookies from 'js-cookie';
import Lottie from "lottie-react";
import queryString from 'query-string';
import Submit from "../../../../assets/Animations/submit.json";
import ProgressLine from '../../../../components/Leaderboard/ProgressLine';
import AlertModal from '../../../../components/Modals/AlertModal';
import CustomModal from '../../../../components/Modals/CustomModal';
import TitleTag from '../../../../components/TitleTag';
function padLeadingZeros(num, size) {
    var s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}

const AssessmentQuestions = (props) => {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(props?.location?.state?.answerList);
    const answerToUpdate = Object.assign([], answers);
    const queryObj = queryString?.parse(props.location?.search)
    const assessmentID = props?.match?.params?.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [model, setModal] = useState(false);
    const [noCancle, setNoCancle] = useState(false);
    const [noOk, setNoOk] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [submitModalVisible, setSubmitModalVisible] = useState(false);
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const Assessment = useSelector(
        state => state?.assessment?.assessmentQuestions,
    );
    const [time, setTime] = useState(
        new Date().setSeconds(
            new Date().getSeconds() + parseInt(props?.location?.state?.time),
        ),
    );
    useEffect(() => {
        if (props?.location?.state?.answerList && Cookies.get('AssessmentID') === assessmentID) {
            dispatch(getAssessmentWithQuestions(assessmentID));
        } else {
            history.push('/')
        }
    }, [assessmentID]);

    const QuestionList = Assessment?.[0]
    const current = QuestionList?.assessment_questions[index];
    const MyTimer = ({ expiryTimestamp }) => {
        const {
            seconds,
            minutes,
            hours,
        } = useTimer({
            expiryTimestamp,
            onExpire: () => {
                history.push(`Assessment?tab=PastAssessments&&id=${assessmentID}${props.location?.search}`)
            }
        });
        return (
            <div className="text-end" >
                <Text variant="Heading4" sx={{
                    color: minutes == '00' && hours == '00'
                        ? '#FF6B6B'
                        : "tealGreen",
                }}>{padLeadingZeros(hours, 2)}:{padLeadingZeros(minutes, 2)}:
                    {padLeadingZeros(seconds, 2)}</Text>
            </div>
        );
    }
    const pushToArray = (arr, questionId, answer) => {
        const index = arr?.findIndex(e => e?.question_id == questionId);
        if (index === -1) {
            answerToUpdate.push({
                question_id: questionId,
                answer: answer,
            });
        } else {
            answerToUpdate[index] = {
                question_id: questionId,
                answer: answer,
            };
        }
        return arr;
    };
    const onAnswer = (questionId, answer) => {
        let updatedAnswers = pushToArray(answerToUpdate, questionId, answer);

        setAnswers(updatedAnswers);
    };
    const CallBack = response => {
        console.log('CallBack response', response);
        //   if (response.code == 200) {
        //     Alert.alert('Auccess', response.data, [
        //       {
        //         text: 'OK',
        //         onPress: () => {
        //           navigation.navigate('AssessmentResult', {
        //             id: QuestionList?.assessment_questions[0]?.assessment_id,
        //           });
        //         },
        //       },
        //     ]);
        //   }
    };
    const SubmitAnswer = (arr, questionId) => {
        const index = arr?.findIndex(e => e?.question_id == questionId);
        console.log('answerToUpdate[index]', answerToUpdate[index]);
        if (index === -1) {
        } else {
            answerToUpdate[index] = {
                question_id: questionId,
                answer: answerToUpdate[index]?.answer,
                is_submit: 1,
            };
        }
        return arr;
    };
    const submitAnswerTOServer = async (currentAnswer) => {
        const submitObj = {
            assessment_id: QuestionList?.id,
            answers: [currentAnswer],
        };
        console.log('submitObj', submitObj);

        dispatch(storeAssessmentresult(submitObj, CallBack));
    };
    const onAnswerSubmit = questionId => {
        let updatedAnswers = SubmitAnswer(answerToUpdate, questionId);
        const CurrentObj = updatedAnswers.find(c => c.question_id === current?.id);
        if (CurrentObj.is_submit === 1) {
            console.log('CurrentObj', CurrentObj);

            submitAnswerTOServer(CurrentObj);
        }
        setAnswers(updatedAnswers);
    };
    const ReloadCallBack = response => {
        console.log('response', response);
        if (response.code == 200) {
            if (response?.data?.is_assessment_expired === 0) {
                setTime(new Date().setSeconds(new Date().getSeconds() + parseInt(response?.data?.remaining_time)))
                setAnswers(response?.data?.answers)
            } else {
                console.log("else⌛ Time Up!");
                setTitle('⌛ Time Up!');
                setMessage("Your Assessment Time is over!")
                setNoCancle(true);
                setNoOk(false);
                setModal(true)
            }
        } else {
            setTitle('Error !');
            setMessage(response?.response?.data?.data)
            setNoCancle(false);
            setNoOk(true);
            setModal(true)
        }
    };
    useEffect(() => {
        const Focus = window.addEventListener('popstate', (e) => {

            dispatch(getUserAssessmentDetails({ assessment_id: assessmentID }, ReloadCallBack));
        })
        return Focus;
    });

    useEffect(() => {
        const Focus = window.onload = (event) => {
            console.log("window onload",);
            dispatch(getUserAssessmentDetails({ assessment_id: assessmentID }, ReloadCallBack));
        };
        return Focus
    }, [])
    return (
        <>
      <TitleTag title="Assessment Questions" />
            <section sx={{ variant: 'layout.Home' }}>
                <Container>
                    {/* <BreadCrumbs queryObj={queryObj} pageTitle={Assessment[0]?.assessment_title} /> */}
                    {Assessment.length > 0 &&
                        <div >
                            <Box >
                                <Heading variant="Heading4" sx={{ color: "Blue_Theme", mt: 50, mb: 4 }} className="text-center">{Assessment[0]?.assessment_title}</Heading>
                                <Flex sx={{ justifyContent: 'space-between' }}>
                                    <div>
                                        <Heading variant="Raleway18" sx={{ color: "Grey_4", mb: 25, }}>{appTranslations?.TITLE_KNOWLEDGEASSESSMENT_QUESTION}</Heading>
                                        <Text variant="Heading4" sx={{ color: "tealGreen", }}>{index + 1}/{QuestionList?.assessment_questions?.length}</Text>
                                    </div>
                                    <div>
                                        <Heading variant="Raleway18" sx={{ color: "Grey_4", mb: 25, }}>{appTranslations?.TITLE_KNOWLEDGEASSESSMENT_REMAINING_TIME}</Heading>

                                        <Box sx={{ alignItems: 'center', mb: "14px" }}>
                                            {time &&
                                                <MyTimer expiryTimestamp={time} />}
                                        </Box>
                                    </div>
                                </Flex>
                                <ProgressLine
                                    visualParts={[
                                        {
                                            percentage: 16,
                                            color: "#FFD12D"
                                        }
                                    ]}
                                    customClass="mb-0"
                                    boxShadow="0px 1px 2px rgba(0, 0, 0, 0.25)"
                                    customPercentage={<div />}
                                />
                                <Question
                                    onselectAnswer={(questionId, answer) => {
                                        onAnswer(questionId, answer);
                                    }}
                                    question={current}
                                    answer={answers?.find(i => i?.question_id === current?.id)?.answer}
                                    isSubmited={
                                        answers?.find(i => i?.question_id === current?.id)?.is_submit ===
                                            1
                                            ? true
                                            : false || false
                                    }
                                />

                                <div className="text-center">
                                    <Button px={4} py={14} backgroundColor="tealGreen" color="white" className="" sx={{ boxShadow: "0px 2px 6px rgba(13, 148, 136, 0.4)", mt: 7 }}
                                        disabled={answers?.find(i => i?.question_id === current?.id)
                                            ?.is_submit === 1
                                            ? false
                                            : answers?.find(i => i?.question_id === current?.id)?.answer
                                                ? false
                                                : true}
                                        onClick={() => {
                                            if (
                                                answers?.find(i => i?.question_id === current?.id)
                                                    ?.is_submit === 1
                                            ) {
                                                if (
                                                    QuestionList?.assessment_questions?.length !==
                                                    index + 1
                                                ) {
                                                    setIndex(index + 1);
                                                } else {
                                                    setSubmitModalVisible(true);
                                                }
                                            } else {
                                                if (
                                                    QuestionList?.assessment_questions?.length ===
                                                    index + 1 &&
                                                    answers?.find(i => i?.question_id === current?.id)
                                                        ?.answer === 'null'
                                                ) {
                                                    setSubmitModalVisible(true);
                                                } else {
                                                    onAnswerSubmit(current?.id);
                                                }
                                            }
                                        }}><Heading variant="Raleway18ExtraBold">{
                                            answers?.find(i => i?.question_id === current?.id)
                                                ?.is_submit === 1
                                                ? QuestionList?.assessment_questions?.length !== index + 1
                                                    ? appTranslations?.BTN_C_ASMENT_NEXT
                                                    : appTranslations?.BTN_C_ASMENT_SUBMIT
                                                : QuestionList?.assessment_questions?.length ===
                                                    index + 1 &&
                                                    answers?.find(i => i?.question_id === current?.id)
                                                        ?.answer === 'null'
                                                    ? appTranslations?.BTN_C_ASMENT_SUBMIT
                                                    : answers?.find(i => i?.question_id === current?.id)
                                                        ?.answer === 'null'
                                                        ? appTranslations?.BTN_C_ASMENT_S_AND_S_ANS
                                                        : appTranslations?.BTN_C_ASMENT_SAVE
                                        }</Heading></Button>
                                </div>
                                <Flex sx={{ alignItems: 'center', justifyContent: 'space-around', mt: 80 }}>
                                    <Button sx={{ width: 108, bg: index == 0 ? "Grey_1" : "white" }} variant="white" className="px-1 py-2" disabled={index == 0 ? true : false}
                                        onClick={() => {
                                            setIndex(index - 1);
                                        }}>
                                        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <img style={{}} src="../../images/arrow-up.png" alt="left-arrow" sx={{ width: 18 }} className="me-1" />
                                            <Heading variant="Raleway18" sx={{ color: "Grey_3" }}>{appTranslations?.BTN_C_ASMENT_PREVIOUS}
                                            </Heading>
                                        </Flex>
                                    </Button>
                                    <Button sx={{
                                        width: 108, bg: answers?.find(i => i?.question_id === current?.id)
                                            ?.is_submit === 1
                                            ? "Grey_1"
                                            : QuestionList?.assessment_questions?.length === index + 1
                                                ? answers?.find(i => i?.question_id === current?.id)
                                                    ?.answer === 'null'
                                                    ? "Grey_1"
                                                    : "white"
                                                : "white"
                                    }} variant="white" className="px-1 py-2"

                                        disabled={answers?.find(i => i?.question_id === current?.id)
                                            ?.is_submit === 1
                                            ? true
                                            : QuestionList?.assessment_questions?.length === index + 1
                                                ? answers?.find(i => i?.question_id === current?.id)
                                                    ?.answer === 'null'
                                                    ? true
                                                    : false
                                                : false}

                                        onClick={() => {
                                            onAnswer(current?.id, 'null');
                                            if (
                                                QuestionList?.assessment_questions?.length !==
                                                index + 1
                                            ) {
                                                setIndex(index + 1);
                                            }
                                        }}>
                                        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Heading variant="Raleway18" sx={{ color: "Grey_3" }}>{appTranslations?.BTN_C_ASMENT_SKIP}</Heading>
                                            <img style={{}} src="../../images/arrow-up-alt2.png" alt="right-arrow" sx={{ width: 18 }} className="ms-1" />
                                        </Flex>
                                    </Button>
                                </Flex>
                            </Box>
                        </div>
                    }</Container>
                <AlertModal
                    isOpen={model}
                    Title={title}
                    message={message}
                    noCancle={noCancle}
                    noOK={noOk}
                    closeModal={() => {
                        setModal(false);
                        setMessage('');
                        setTitle('')
                    }}
                    onCancle={() => {
                        setModal(false);
                        setMessage('');
                        setTitle('')
                    }}
                    onOk={() => {
                        setModal(false);
                        setMessage('');
                        setTitle('');
                        history.push(`Assessment?tab=PastAssessments&&id=${assessmentID}${props.location?.search}`)
                    }} />
                <CustomModal
                    styles={{ modal: { maxWidth: 570 } }}
                    isOpen={submitModalVisible}
                    closeModal={() => {
                        setSubmitModalVisible(false);
                    }} >
                    <div className="">
                        <Lottie animationData={Submit} loop={true} style={{ width: 132 }} className="mx-auto" />
                        <Heading variant="RalewayTitle" sx={{ color: "Blue_Theme", mb: 25 }} className="mt-3 text-center">Confirm Submit</Heading>
                        <Box className="submit-model-card">
                            <Flex sx={{ justifyContent: 'space-between', mb: 12 }}>
                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="">{appTranslations.ATTEMPTED}</Heading>
                                <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="">{
                                    answers.filter(a => a.is_submit === 1)?.length
                                } Question(s)</Heading>

                            </Flex>
                            <Flex sx={{ justifyContent: 'space-between', mb: 12 }}>
                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="">{appTranslations.SKIPPED}</Heading>
                                <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="">{
                                    answers.filter(a => a.answer === 'null')?.length
                                } Question(s)</Heading>

                            </Flex>
                            <Flex sx={{ justifyContent: 'space-between', mb: 12 }}>
                                <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="">{appTranslations.OUT_OF_TOTAL}</Heading>
                                <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="">{
                                    QuestionList?.assessment_questions?.length
                                } Question(s)</Heading>

                            </Flex>
                        </Box>
                        <Box className="text-end pt-3">
                            <Button style={{ width: 95 }} mr="12px" backgroundColor="tealGreen" color="white" className="p-2" onClick={() => history.push(`Assessment?tab=PastAssessments&&id=${assessmentID}`)}><Heading variant="RalewayTitle" >Submit</Heading></Button>
                            <Button style={{ width: 108 }} variant="white" className="p-2"
                                onClick={() => {
                                    setSubmitModalVisible(false);
                                }} ><Heading variant="RalewayTitle" >Cancel</Heading></Button>
                        </Box>
                    </div>
                </CustomModal>
            </section>
        </>
    );
}
export default withRouter(AssessmentQuestions);