import { useTheme } from '@react-navigation/native';
import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
interface QuestionOptionProps {
  isSubmited: boolean;
  answer: string;
  optionKey: string;
  onclick: (e: GestureResponderEvent) => void;
  correct_answer: string;
  HeaderTitle: string;
  HeaderID: string;
}
export const QuestionOption: React.FC<QuestionOptionProps> = ({
  isSubmited = false,
  answer = '',
  optionKey = 'option1',
  onclick = () => null,
  correct_answer = '',
  HeaderTitle = '',
  HeaderID = 'A',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable
      disabled={isSubmited}
      onPress={onclick}
      style={{
        ...styles.AnswerContainer, borderColor: colors.Blue_2,
        backgroundColor: isSubmited
          ? answer === optionKey
            ? answer === correct_answer
              ? colors.CorrectGreen
              : colors.Notification_red
            : correct_answer === optionKey
              ? colors.CorrectGreen
              : colors.white
          : answer === optionKey
            ? colors.HOVER_ORANGE
            : colors.white,
      }}>
      <View style={[styles.subContainer, { backgroundColor: colors.cyanBlue }]}>
        <Text
          style={[FontStyle.Raleway18Bold, styles.Option, {
            color: colors.Card_Gradian,
          }]}>
          {HeaderID}
        </Text>
      </View>
      <Text
        style={[FontStyle.Nunito16, {
          ...styles.Answertext,
          color: colors.Blue_Theme,
        }]}>
        {HeaderTitle}
      </Text>
    </Pressable>
  );
};
interface QuestonProps {
  question: any;
  onselectAnswer: (id: number | string, data: any) => void;
  answer: string;
  isSubmited: boolean;
}
export const Queston: React.FC<QuestonProps> = ({
  onselectAnswer = () => null,
  isSubmited = false,
  answer = '',
  question = {},
}) => {
  const { colors } = useTheme() as unknown as themeProps;

  return (
    <View>
      <Text
        style={[FontStyle.Nunito18Title, styles.Heading, { color: colors.Blue_Theme, marginTop: RFValue(30) }]}>
        {question.question}</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    marginBottom: RFValue(24),
  },
  AnswerContainer: {
    borderRadius: RFValue(40),
    flexDirection: 'row',
    borderWidth: RFValue(1),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
    marginBottom: RFValue(20),
    paddingRight: RFValue(30),
  },
  Option: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  Answertext: {
    flex: 1,
    marginVertical: RFValue(5),
  },
  subContainer:
  {
    borderRadius: RFValue(40),
    height: RFValue(35),
    width: RFValue(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(10),
  },
});
