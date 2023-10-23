/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading } from 'theme-ui';


export const Question = ({ question, onselectAnswer, answer, isSubmited }) => {

    const QuestionOption = ({ isSubmited, answer, optionKey = 'option1', onclick, correct_answer, HeaderTitle, HeaderID = 'A' }) => {
        return (
            <Flex variant="AnswerContainer" className="p-2 pointer" sx={{
                mb: 40,
                borderColor: "Blue_2",
                backgroundColor: isSubmited
                    ? answer === optionKey
                        ? answer === correct_answer
                            ? "CorrectGreen"
                            : "Notification_red"
                        : correct_answer === optionKey
                            ? "CorrectGreen"
                            : "white"
                    : answer === optionKey
                        ? "HOVER_ORANGE"
                        : "white",
            }} disabled={isSubmited} onClick={onclick}>
                <Box variant="subContainer" sx={{ backgroundColor: "cyanBlue" }}>
                    <Heading variant="Raleway18Bold" sx={{ color: "Card_Gradian", }}>{HeaderID}</Heading>

                </Box>
                <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }}>{HeaderTitle}</Heading>
            </Flex>

        );
    }
    return (
        <div >
            <Heading variant="Raleway18" sx={{ color: "Blue_Theme", mb: 4, mt: 34 }}>{question?.question}</Heading>
            <div className="row justify-content-between mx-lg-4 mx-0">
                <div className="col-lg-5">
                    <QuestionOption
                        isSubmited={isSubmited}
                        answer={answer}
                        optionKey={'option1'}
                        onclick={() => onselectAnswer(question?.id, 'option1')}
                        correct_answer={question?.correct_answer}
                        HeaderTitle={question?.option1}
                        HeaderID={'A'} />
                    <QuestionOption
                        isSubmited={isSubmited}
                        answer={answer}
                        optionKey={'option2'}
                        onclick={() => onselectAnswer(question?.id, 'option2')}
                        correct_answer={question?.correct_answer}
                        HeaderTitle={question?.option2}
                        HeaderID={'B'} />
                </div>
                <div className="col-lg-5">
                    <QuestionOption
                        isSubmited={isSubmited}
                        answer={answer}
                        optionKey={'option3'}
                        onclick={() => onselectAnswer(question?.id, 'option3')}
                        correct_answer={question?.correct_answer}
                        HeaderTitle={question?.option3}
                        HeaderID={'C'} />
                    <QuestionOption
                        isSubmited={isSubmited}
                        answer={answer}
                        optionKey={'option4'}
                        onclick={() => onselectAnswer(question?.id, 'option4')}
                        correct_answer={question?.correct_answer}
                        HeaderTitle={question?.option4}
                        HeaderID={'D'} />

                </div>
            </div>
        </div>

    );
}
export default Question;
