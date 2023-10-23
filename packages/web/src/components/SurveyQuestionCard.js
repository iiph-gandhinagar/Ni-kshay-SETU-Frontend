/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Flex, Heading, Label, Radio, Textarea } from 'theme-ui';
const SurveyQuestionCard = ({ onClick, questionText, answer, option1, option2, option3, option4, type, onselectAnswer }) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <Box variant="ScreeningToolBox" sx={{ px: 10, pt: 20, pb: 25, maxWidth: 378 }} className="mx-auto">
            <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", mb: 25 }} className="px-2">{questionText}</Heading>
            {type === 'options' ? <>
                <Box sx={{ mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }} className="">Option 1</Heading>
                    <Label sx={{ justifyContent: 'space-between' }} variant="StepperOption">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3", }} >{option1}</Heading>
                        <Radio sx={{ width: 20, height: 20, }}
                            checked={answer === 'option1' ? true : false}
                            onClick={() => onselectAnswer('option1')}
                        />
                    </Label>

                </Box>
                <Box sx={{ mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }} className="">Option 2</Heading>
                    <Label sx={{ justifyContent: 'space-between' }} variant="StepperOption">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3", }} >{option2}</Heading>
                        <Radio sx={{ width: 20, height: 20, }}
                            checked={answer === 'option2' ? true : false}
                            onClick={() => onselectAnswer('option2')}
                        />
                    </Label>

                </Box>
                <Box sx={{ mb: 25 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }} className="">Option 3</Heading>
                    <Label sx={{ justifyContent: 'space-between' }} variant="StepperOption">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3", }} >{option3}</Heading>
                        <Radio sx={{ width: 20, height: 20, }}
                            checked={answer === 'option3' ? true : false}
                            onClick={() => onselectAnswer('option3')}
                        />
                    </Label>

                </Box>
                <Box sx={{ mb: 35 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_Theme", }} className="">Option 4</Heading>
                    <Label sx={{ justifyContent: 'space-between' }} variant="StepperOption">
                        <Heading variant="Nunito18title" sx={{ color: "Grey_3", }} >{option4}</Heading>
                        <Radio sx={{ width: 20, height: 20, }}
                            checked={answer === 'option4' ? true : false}
                            onClick={() => onselectAnswer('option4')}
                        />
                    </Label>

                </Box></> :
                <Box sx={{ mb: 35 }}>
                    <Heading variant="Nunito18title" sx={{ color: "Blue_2" }} className="">Write your suggestion</Heading>
                    <Textarea
                        onChange={(e) => {
                            onselectAnswer(e.target.value);
                        }}
                        rows={5} />
                </Box>}
            <Flex sx={{ justifyContent: 'center', }}>
                <Button style={{ width: 193 }} backgroundColor="Blue_2" color="white" sx={{}} onClick={onClick} className="btn" disabled={answer ? false : true}><Heading variant="RalewayTitle">{appTranslations?.BTN_C_ASMENT_SUBMIT}</Heading></Button>
            </Flex>
        </Box>
    );
}
export default SurveyQuestionCard;