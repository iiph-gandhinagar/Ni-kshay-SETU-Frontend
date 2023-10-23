import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import { Button } from '../Button';
import { FormInput } from '../input';
import { QuestionOption } from '../Questionlist';
interface SurveyOuestionCardsProps {
    questionText: string;
    onPress: () => void;
    type: string;
    onselectAnswer: (value: string) => void;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
}
export const SurveyQuestionCard: React.FC<SurveyOuestionCardsProps> = ({
    questionText = '',
    onPress = () => null,
    type = 'options',
    onselectAnswer = () => null,
    answer = '',
    option1 = '',
    option2 = '',
    option3 = '',
    option4 = '',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.subConatiner, { backgroundColor: colors.Light_blue }]}>
            <Text
                style={[FontStyle.Nunito18Title, { color: colors.Blue_Theme, marginBottom: RFValue(40) }]}>
                {questionText}
            </Text>
            {
                type === 'options' ?
                    <React.Fragment>
                        {option1 && <QuestionOption
                            answer={answer}
                            optionKey={'option1'}
                            onclick={() => onselectAnswer('option1')}
                            // correct_answer={question?.correct_answer}
                            HeaderTitle={option1}
                            HeaderID={'A'} />}
                        {option2 && <QuestionOption
                            answer={answer}
                            optionKey={'option2'}
                            onclick={() => onselectAnswer('option2')}
                            // correct_answer={question?.correct_answer}
                            HeaderTitle={option2}
                            HeaderID={'B'} />}
                        {option3 && <QuestionOption
                            answer={answer}
                            optionKey={'option3'}
                            onclick={() => onselectAnswer('option3')}
                            // correct_answer={question?.correct_answer}
                            HeaderTitle={option3}
                            HeaderID={'C'} />}
                        {option4 && <QuestionOption
                            answer={answer}
                            optionKey={'option4'}
                            onclick={() => onselectAnswer('option4')}
                            // correct_answer={question?.correct_answer}
                            HeaderTitle={option4}
                            HeaderID={'D'} />}
                    </React.Fragment> :
                    (
                        <FormInput
                            placeholder={'suggestion'}
                            numberOfLines={8}
                            header={'Write your suggestion'}
                            value={answer}
                            onChangeText={text => onselectAnswer(text)}
                        />
                    )
            }

            <Button
                disabled={answer ? false : true}
                style={styles.btn2}
                onPress={onPress}
                buttonText={'Submit'}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    subConatiner: { padding: RFValue(20), margin: RFValue(25), borderRadius: RFValue(5) },

    btn2: { alignSelf: 'center', marginVertical: RFValue(10) },
});
