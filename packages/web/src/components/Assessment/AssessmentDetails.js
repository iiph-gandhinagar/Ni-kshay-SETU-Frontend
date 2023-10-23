/** @jsxImportSource theme-ui */
import { getUserAssessmentResult } from '@tb-frontend/shared/Store/action/assessmentAction';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Heading, Link, Text } from 'theme-ui';
import ResultCard from './ResultCard';

const AssessmentDetails = ({ assessmentID }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserAssessmentResult(assessmentID));
    }, [assessmentID]);
    const result = useSelector(
        state => state?.assessment?.userAssessmentResult[0],
    );
    return (
        <>
            <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="">Assessment Details</Heading>
            <hr sx={{ variant: "ProfileHr" }} />
            <div className="row align-items-center mx-0">
                <div className="col-lg-6">
                    <Box className="mb-1">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="mb-1">Assessment Name:</Heading>
                        <Heading variant="Raleway18" sx={{ color: "Blue_2" }} className="pt-2">{result?.assessment_title}</Heading>
                    </Box>
                    <Box className="pt-3 mb-1">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="mb-1">Number of Questions:</Heading>
                        <Heading variant="Raleway18" sx={{ color: "Blue_2" }} className="pt-2">{result?.assessment_questions_count}</Heading>
                    </Box>

                    <Box className="pt-3 mb-1">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="mb-1">Time to Complete</Heading>
                        <Heading variant="Raleway18" sx={{ color: "Blue_2" }} className="pt-2">{result?.time_to_complete} min.</Heading>
                    </Box>

                    <Box className="pt-3 mb-1">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3" }} className="mb-1">Completed on:</Heading>
                        <Heading variant="Raleway18" sx={{ color: "Blue_2" }} className="pt-2">{moment(result?.user_assessment_result[0]?.created_at).format(
                            'll',
                        )}</Heading>
                    </Box>
                    <div className="col-xl-7 pt-3">
                        <Link href="/Certificates" >
                            <Box variant="CertificatesBox" className="mb-3 p-2" backgroundColor="Blue_2">
                                <Flex sx={{ alignItems: 'center' }}>
                                    <img style={{}} src="../../../images/certi.png" alt="Picture" sx={{ width: 25 }} className="me-3" />
                                    <Text variant="Heading4" sx={{ color: "white" }}>View Certificate</Text>
                                </Flex>
                            </Box>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <ResultCard
                        Marks={`${result?.user_assessment_result[0]?.obtained_marks}/${result?.user_assessment_result[0]?.total_marks}`}
                        attempted={result?.user_assessment_result[0]?.attempted}
                        skipped={result?.user_assessment_result[0]?.skipped}
                        right_answers={result?.user_assessment_result[0]?.right_answers}
                        wrong_answers={result?.user_assessment_result[0]?.wrong_answers} />
                </div>
            </div>
        </>
    );
}
export default AssessmentDetails;